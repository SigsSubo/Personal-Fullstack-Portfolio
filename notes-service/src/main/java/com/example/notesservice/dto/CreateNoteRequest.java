package com.example.notesservice.dto;

// Add validation annotations later if needed (e.g., @NotBlank)
public class CreateNoteRequest {
    private String title;
    private String content;

    // Getters and Setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}
