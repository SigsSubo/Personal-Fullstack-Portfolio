package com.example.notesservice.dto;

public class CreateCommentRequest {
    private String text;
    // noteId will come from path variable

    // Getters and Setters
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
}
