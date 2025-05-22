package com.example.notesservice.controller;

import com.example.notesservice.dto.CommentDTO;
import com.example.notesservice.dto.CreateCommentRequest;
import com.example.notesservice.model.Comment;
import com.example.notesservice.model.Note;
import com.example.notesservice.repository.CommentRepository;
import com.example.notesservice.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Removed java.util.List and .stream.Collectors as they are not used here.

@RestController
@RequestMapping("/api") // Base path, specific paths defined in methods
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private NoteRepository noteRepository;
    
    // Helper to convert Comment entity to CommentDTO
    private CommentDTO convertToCommentDTO(Comment comment) {
        return new CommentDTO(comment.getId(), comment.getText(), comment.getNote().getId(), comment.getCreatedAt(), comment.getUpdatedAt());
    }

    @PostMapping("/notes/{noteId}/comments")
    public ResponseEntity<CommentDTO> createComment(@PathVariable Long noteId, @RequestBody CreateCommentRequest createCommentRequest) {
        return noteRepository.findById(noteId)
                .map(note -> {
                    Comment comment = new Comment(createCommentRequest.getText());
                    comment.setNote(note);
                    Comment savedComment = commentRepository.save(comment);
                    return new ResponseEntity<>(convertToCommentDTO(savedComment), HttpStatus.CREATED);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/comments/{id}")
    public ResponseEntity<CommentDTO> getCommentById(@PathVariable Long id) {
        return commentRepository.findById(id)
                .map(comment -> ResponseEntity.ok(convertToCommentDTO(comment)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/comments/{id}")
    public ResponseEntity<CommentDTO> updateComment(@PathVariable Long id, @RequestBody CreateCommentRequest createCommentRequest) {
        return commentRepository.findById(id)
                .map(comment -> {
                    comment.setText(createCommentRequest.getText());
                    Comment updatedComment = commentRepository.save(comment);
                    return ResponseEntity.ok(convertToCommentDTO(updatedComment));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/comments/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        if (!commentRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        commentRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
