package com.example.notesservice.controller;

import com.example.notesservice.dto.CreateNoteRequest;
import com.example.notesservice.model.Note;
import com.example.notesservice.repository.NoteRepository;
import com.example.notesservice.kafka.KafkaProducerService; // For mocking

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean; // To mock specific beans
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.time.LocalDateTime;
import java.util.ArrayList; // Required for Note model

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest // Loads full application context
@AutoConfigureMockMvc // Configures MockMvc
public class NoteControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper; // For converting objects to JSON strings

    @MockBean // Use MockBean to replace the actual bean with a mock
    private NoteRepository noteRepository;

    @MockBean // Mock KafkaProducerService to avoid actual Kafka calls during test
    private KafkaProducerService kafkaProducerService;

    private Note sampleNote;

    @BeforeEach
    void setUp() {
        sampleNote = new Note("Sample Title", "Sample Content");
        sampleNote.setId(1L);
        sampleNote.setCreatedAt(LocalDateTime.now());
        sampleNote.setUpdatedAt(LocalDateTime.now());
        sampleNote.setComments(new ArrayList<>()); // Initialize comments list

        // Mock Kafka interaction
        doNothing().when(kafkaProducerService).sendNoteCreatedEvent(anyLong(), anyString());
    }

    @Test
    void whenPostNote_thenCreateNote_andReturnCreated() throws Exception {
        CreateNoteRequest createNoteRequest = new CreateNoteRequest();
        createNoteRequest.setTitle("Test Integration Title");
        createNoteRequest.setContent("Test Integration Content");

        // Mock the repository save operation
        // When noteRepository.save is called with any Note object,
        // then set its ID and timestamps (simulating DB) and return it.
        when(noteRepository.save(any(Note.class))).thenAnswer(invocation -> {
            Note noteToSave = invocation.getArgument(0);
            noteToSave.setId(2L); // Assign a new ID
            noteToSave.setCreatedAt(LocalDateTime.now());
            noteToSave.setUpdatedAt(LocalDateTime.now());
            noteToSave.setComments(new ArrayList<>());
            return noteToSave;
        });

        mockMvc.perform(post("/api/notes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createNoteRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").exists()) // Check if an ID is assigned
                .andExpect(jsonPath("$.title").value("Test Integration Title"))
                .andExpect(jsonPath("$.content").value("Test Integration Content"));
    }

    @Test
    void givenNoteId_whenGetNoteById_thenReturnNote() throws Exception {
        // Mock the repository findById operation
        when(noteRepository.findById(1L)).thenReturn(java.util.Optional.of(sampleNote));

        mockMvc.perform(get("/api/notes/{id}", 1L)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.title").value("Sample Title"))
                .andExpect(jsonPath("$.content").value("Sample Content"));
    }

    @Test
    void givenNonExistentNoteId_whenGetNoteById_thenReturnNotFound() throws Exception {
        // Mock the repository findById operation for a non-existent ID
        when(noteRepository.findById(99L)).thenReturn(java.util.Optional.empty());

        mockMvc.perform(get("/api/notes/{id}", 99L)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }
}
