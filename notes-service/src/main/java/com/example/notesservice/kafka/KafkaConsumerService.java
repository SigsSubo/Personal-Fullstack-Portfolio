package com.example.notesservice.kafka;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {

    private static final Logger LOGGER = LoggerFactory.getLogger(KafkaConsumerService.class);
    private static final String TOPIC_NAME = "notes-events"; // Must match producer's topic

    @KafkaListener(topics = TOPIC_NAME, groupId = "${spring.kafka.consumer.group-id}")
    public void consumeNoteEvent(String message) {
        LOGGER.info(String.format("Consumed message -> %s from topic %s", message, TOPIC_NAME));
        // Here you could add logic to process the event, e.g.,
        // deserialize it if it's a JSON object, update another system, etc.
    }
}
