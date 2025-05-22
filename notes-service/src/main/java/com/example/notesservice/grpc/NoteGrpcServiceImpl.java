package com.example.notesservice.grpc;

import com.example.notesservice.grpc.generated.*; // Assuming this package for generated classes
import com.example.notesservice.model.Note;
import com.example.notesservice.model.Comment;
import com.example.notesservice.repository.NoteRepository;
import com.example.notesservice.repository.CommentRepository;
import com.google.protobuf.Timestamp;
import io.grpc.stub.StreamObserver;
import org.lognet.springboot.grpc.GRpcService; // From lognet library
import org.springframework.beans.factory.annotation.Autowired;

import java.time.ZoneOffset;
import java.util.stream.Collectors;
import java.util.List;

@GRpcService // Annotation from lognet library to expose this as a gRPC service
public class NoteGrpcServiceImpl extends NoteGrpcServiceGrpc.NoteGrpcServiceImplBase {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private CommentRepository commentRepository;

    // Helper to convert Note entity to NoteMessage
    private NoteMessage convertToNoteMessage(Note note) {
        NoteMessage.Builder builder = NoteMessage.newBuilder()
                .setId(note.getId())
                .setTitle(note.getTitle())
                .setContent(note.getContent())
                .setCreatedAt(Timestamp.newBuilder()
                        .setSeconds(note.getCreatedAt().toEpochSecond(ZoneOffset.UTC))
                        .setNanos(note.getCreatedAt().getNano()).build())
                .setUpdatedAt(Timestamp.newBuilder()
                        .setSeconds(note.getUpdatedAt().toEpochSecond(ZoneOffset.UTC))
                        .setNanos(note.getUpdatedAt().getNano()).build());

        if (note.getComments() != null && !note.getComments().isEmpty()) {
            // Assuming comments are fetched if needed (e.g., EAGER or within a transaction)
            note.getComments().forEach(comment -> builder.addComments(convertToCommentMessage(comment)));
        }
        return builder.build();
    }

    // Helper to convert Comment entity to CommentMessage
    private CommentMessage convertToCommentMessage(Comment comment) {
        return CommentMessage.newBuilder()
                .setId(comment.getId())
                .setText(comment.getText())
                .setNoteId(comment.getNote().getId())
                .setCreatedAt(Timestamp.newBuilder()
                        .setSeconds(comment.getCreatedAt().toEpochSecond(ZoneOffset.UTC))
                        .setNanos(comment.getCreatedAt().getNano()).build())
                .setUpdatedAt(Timestamp.newBuilder()
                        .setSeconds(comment.getUpdatedAt().toEpochSecond(ZoneOffset.UTC))
                        .setNanos(comment.getUpdatedAt().getNano()).build())
                .build();
    }

    @Override
    public void getNoteById(GetNoteRequest request, StreamObserver<GetNoteResponse> responseObserver) {
        noteRepository.findById(request.getNoteId()).ifPresentOrElse(
            note -> {
                NoteMessage noteMessage = convertToNoteMessage(note);
                GetNoteResponse response = GetNoteResponse.newBuilder().setNote(noteMessage).build();
                responseObserver.onNext(response);
                responseObserver.onCompleted();
            },
            () -> {
                // Handle not found case
                responseObserver.onError(io.grpc.Status.NOT_FOUND
                                        .withDescription("Note not found with ID: " + request.getNoteId())
                                        .asRuntimeException());
            }
        );
    }

    @Override
    public void getCommentsForNote(GetCommentsForNoteRequest request, StreamObserver<GetCommentsForNoteResponse> responseObserver) {
        if (!noteRepository.existsById(request.getNoteId())) {
             responseObserver.onError(io.grpc.Status.NOT_FOUND
                                        .withDescription("Note not found with ID: " + request.getNoteId())
                                        .asRuntimeException());
            return;
        }

        // This is the inefficient way specified in the REST controller, replicated here for consistency with subtask description.
        // A more efficient query would be findByNoteId(request.getNoteId()) in CommentRepository.
        // Or, if Note.comments is EAGER or fetched, use that.
        // For this subtask, following the pattern from the REST controller:
        List<Comment> comments = commentRepository.findAll().stream()
            .filter(comment -> comment.getNote() != null && comment.getNote().getId().equals(request.getNoteId()))
            .collect(Collectors.toList());

        List<CommentMessage> commentMessages = comments.stream()
            .map(this::convertToCommentMessage)
            .collect(Collectors.toList());

        GetCommentsForNoteResponse response = GetCommentsForNoteResponse.newBuilder()
            .addAllComments(commentMessages)
            .build();
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}
