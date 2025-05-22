package com.example.notesservice.controller;

import com.example.notesservice.dto.CommentDTO;
import com.example.notesservice.dto.CreateNoteRequest;
import com.example.notesservice.dto.NoteDTO;
import com.example.notesservice.kafka.KafkaProducerService; // Added import
import com.example.notesservice.model.Comment;
import com.example.notesservice.model.Note;
import com.example.notesservice.repository.CommentRepository;
import com.example.notesservice.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private CommentRepository commentRepository; // For fetching comments related to a note

    @Autowired
    private KafkaProducerService kafkaProducerService; // Added KafkaProducerService

    // Helper to convert Note entity to NoteDTO
    private NoteDTO convertToNoteDTO(Note note) {
        NoteDTO noteDTO = new NoteDTO(note.getId(), note.getTitle(), note.getContent(), note.getCreatedAt(), note.getUpdatedAt());
        if (note.getComments() != null) {
            // The subtask's version of getCommentsForNote fetches comments separately.
            // This part of convertToNoteDTO might lead to N+1 if not careful,
            // but for individual note GETs, it can be useful if comments are part of the NoteDTO.
            // The subtask asks for List<CommentDTO> in NoteDTO, so this conversion is kept.
            noteDTO.setComments(note.getComments().stream().map(this::convertToCommentDTO).collect(Collectors.toList()));
        }
        return noteDTO;
    }

    // Helper to convert Comment entity to CommentDTO
    private CommentDTO convertToCommentDTO(Comment comment) {
        return new CommentDTO(comment.getId(), comment.getText(), comment.getNote().getId(), comment.getCreatedAt(), comment.getUpdatedAt());
    }

    @PostMapping
    public ResponseEntity<NoteDTO> createNote(@RequestBody CreateNoteRequest createNoteRequest) {
        Note note = new Note(createNoteRequest.getTitle(), createNoteRequest.getContent());
        Note savedNote = noteRepository.save(note);
        kafkaProducerService.sendNoteCreatedEvent(savedNote.getId(), savedNote.getTitle()); // Added Kafka event
        return new ResponseEntity<>(convertToNoteDTO(savedNote), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<NoteDTO>> getAllNotes() {
        List<Note> notes = noteRepository.findAll();
        List<NoteDTO> noteDTOs = notes.stream().map(this::convertToNoteDTO).collect(Collectors.toList());
        return ResponseEntity.ok(noteDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NoteDTO> getNoteById(@PathVariable Long id) {
        return noteRepository.findById(id)
                .map(note -> ResponseEntity.ok(convertToNoteDTO(note)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<NoteDTO> updateNote(@PathVariable Long id, @RequestBody CreateNoteRequest createNoteRequest) {
        return noteRepository.findById(id)
                .map(note -> {
                    note.setTitle(createNoteRequest.getTitle());
                    note.setContent(createNoteRequest.getContent());
                    Note updatedNote = noteRepository.save(note);
                    return ResponseEntity.ok(convertToNoteDTO(updatedNote));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        if (!noteRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        noteRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{noteId}/comments")
    public ResponseEntity<List<CommentDTO>> getCommentsForNote(@PathVariable Long noteId) {
        if (!noteRepository.existsById(noteId)) { // Check if the note exists
            return ResponseEntity.notFound().build();
        }
        // This is a simple way as per subtask. For performance, a dedicated query in CommentRepository might be better.
        List<Comment> comments = commentRepository.findAll().stream()
                                   .filter(comment -> comment.getNote() != null && comment.getNote().getId().equals(noteId))
                                   .collect(Collectors.toList());
        List<CommentDTO> commentDTOs = comments.stream().map(this::convertToCommentDTO).collect(Collectors.toList());
        return ResponseEntity.ok(commentDTOs);
    }
}
