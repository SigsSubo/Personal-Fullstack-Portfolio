package com.example.notesservice.controller;

import com.example.notesservice.dto.CreateNoteRequest;
import com.example.notesservice.dto.NoteDTO;
import com.example.notesservice.kafka.KafkaProducerService;
import com.example.notesservice.model.Note;
import com.example.notesservice.repository.NoteRepository;
import com.example.notesservice.repository.CommentRepository; // Added for completeness of controller dependencies

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class NoteControllerTest {

    @Mock
    private NoteRepository noteRepository;

    @Mock
    private CommentRepository commentRepository; // Mock this as it's a dependency of NoteController

    @Mock
    private KafkaProducerService kafkaProducerService;

    @InjectMocks
    private NoteController noteController;

    private Note note;
    private CreateNoteRequest createNoteRequest;

    @BeforeEach
    void setUp() {
        // Initialize common test objects
        LocalDateTime now = LocalDateTime.now();
        note = new Note("Test Title", "Test Content");
        note.setId(1L);
        note.setCreatedAt(now);
        note.setUpdatedAt(now);
        note.setComments(Collections.emptyList()); // Initialize with empty list

        createNoteRequest = new CreateNoteRequest();
        createNoteRequest.setTitle("New Note Title");
        createNoteRequest.setContent("New Note Content");
    }

    @Test
    void createNote_shouldReturnCreatedNote_andCallKafka() {
        // Arrange
        when(noteRepository.save(any(Note.class))).thenReturn(note);
        // Kafka producer service is void, so we can use doNothing or just verify invocation
        doNothing().when(kafkaProducerService).sendNoteCreatedEvent(anyLong(), anyString());

        // Act
        ResponseEntity<NoteDTO> response = noteController.createNote(createNoteRequest);

        // Assert
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(note.getId(), response.getBody().getId());
        assertEquals(note.getTitle(), response.getBody().getTitle()); // Should reflect the saved note's title

        verify(noteRepository, times(1)).save(any(Note.class));
        verify(kafkaProducerService, times(1)).sendNoteCreatedEvent(note.getId(), note.getTitle());
    }

    @Test
    void getAllNotes_shouldReturnListOfNotes() {
        // Arrange
        when(noteRepository.findAll()).thenReturn(Collections.singletonList(note));

        // Act
        ResponseEntity<List<NoteDTO>> response = noteController.getAllNotes();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().size());
        assertEquals(note.getTitle(), response.getBody().get(0).getTitle());

        verify(noteRepository, times(1)).findAll();
    }

    @Test
    void getNoteById_whenNoteExists_shouldReturnNote() {
        // Arrange
        when(noteRepository.findById(1L)).thenReturn(Optional.of(note));

        // Act
        ResponseEntity<NoteDTO> response = noteController.getNoteById(1L);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(note.getId(), response.getBody().getId());

        verify(noteRepository, times(1)).findById(1L);
    }

    @Test
    void getNoteById_whenNoteDoesNotExist_shouldReturnNotFound() {
        // Arrange
        when(noteRepository.findById(1L)).thenReturn(Optional.empty());

        // Act
        ResponseEntity<NoteDTO> response = noteController.getNoteById(1L);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());

        verify(noteRepository, times(1)).findById(1L);
    }

    @Test
    void updateNote_whenNoteExists_shouldReturnUpdatedNote() {
        // Arrange
        when(noteRepository.findById(1L)).thenReturn(Optional.of(note));
        when(noteRepository.save(any(Note.class))).thenReturn(note); // Simulate save returning the updated note

        CreateNoteRequest updateRequest = new CreateNoteRequest();
        updateRequest.setTitle("Updated Title");
        updateRequest.setContent("Updated Content");

        // Act
        ResponseEntity<NoteDTO> response = noteController.updateNote(1L, updateRequest);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Updated Title", response.getBody().getTitle()); // Check if title was updated

        verify(noteRepository, times(1)).findById(1L);
        verify(noteRepository, times(1)).save(any(Note.class));
    }
    
    @Test
    void updateNote_whenNoteDoesNotExist_shouldReturnNotFound() {
        // Arrange
        when(noteRepository.findById(1L)).thenReturn(Optional.empty());
        CreateNoteRequest updateRequest = new CreateNoteRequest(); // Content doesn't matter here
        updateRequest.setTitle("NonExistent");
        updateRequest.setContent("NonExistent");

        // Act
        ResponseEntity<NoteDTO> response = noteController.updateNote(1L, updateRequest);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(noteRepository, times(1)).findById(1L);
        verify(noteRepository, never()).save(any(Note.class));
    }


    @Test
    void deleteNote_whenNoteExists_shouldReturnNoContent() {
        // Arrange
        when(noteRepository.existsById(1L)).thenReturn(true);
        doNothing().when(noteRepository).deleteById(1L);

        // Act
        ResponseEntity<Void> response = noteController.deleteNote(1L);

        // Assert
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());

        verify(noteRepository, times(1)).existsById(1L);
        verify(noteRepository, times(1)).deleteById(1L);
    }
    
    @Test
    void deleteNote_whenNoteDoesNotExist_shouldReturnNotFound() {
        // Arrange
        when(noteRepository.existsById(1L)).thenReturn(false);

        // Act
        ResponseEntity<Void> response = noteController.deleteNote(1L);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(noteRepository, times(1)).existsById(1L);
        verify(noteRepository, never()).deleteById(1L);
    }

    // Basic test for getCommentsForNote - more detailed tests could be added
    @Test
    void getCommentsForNote_whenNoteExists_shouldReturnComments() {
        // Arrange
        when(noteRepository.existsById(1L)).thenReturn(true);
        // Assuming the controller's current logic of fetching all comments and filtering
        when(commentRepository.findAll()).thenReturn(Collections.emptyList()); 

        // Act
        ResponseEntity<List<CommentDTO>> response = noteController.getCommentsForNote(1L);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().isEmpty()); // Based on current mock

        verify(noteRepository, times(1)).existsById(1L);
        verify(commentRepository, times(1)).findAll();
    }

    @Test
    void getCommentsForNote_whenNoteDoesNotExist_shouldReturnNotFound() {
        // Arrange
        when(noteRepository.existsById(1L)).thenReturn(false);

        // Act
        ResponseEntity<List<CommentDTO>> response = noteController.getCommentsForNote(1L);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(noteRepository, times(1)).existsById(1L);
        verify(commentRepository, never()).findAll();
    }
}
