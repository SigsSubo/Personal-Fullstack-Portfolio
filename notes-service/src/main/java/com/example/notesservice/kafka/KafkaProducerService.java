package com.example.notesservice.kafka;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {

    private static final Logger LOGGER = LoggerFactory.getLogger(KafkaProducerService.class);
    private static final String TOPIC_NAME = "notes-events"; // Example topic name

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate; // Default is <Object, Object>, specify types

    public void sendNoteCreatedEvent(Long noteId, String title) {
        String message = String.format("NoteCreated: ID=%d, Title='%s'", noteId, title);
        LOGGER.info(String.format("Producing message -> %s to topic %s", message, TOPIC_NAME));
        this.kafkaTemplate.send(TOPIC_NAME, String.valueOf(noteId), message); // Send noteId as key, message as value
    }
}
