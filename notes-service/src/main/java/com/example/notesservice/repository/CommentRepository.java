package com.example.notesservice.repository;

import com.example.notesservice.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    // Example of a custom query method (optional, can be added later)
    // List<Comment> findByNoteId(Long noteId);
}
