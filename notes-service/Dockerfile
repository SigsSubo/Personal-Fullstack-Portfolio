# Use a specific Java version appropriate for Spring Boot 3
FROM eclipse-temurin:17-jre-jammy

# Set a working directory
WORKDIR /app

# Argument for the JAR file name (can be overridden at build time if needed)
ARG JAR_FILE=target/notes-service-0.0.1-SNAPSHOT.jar

# Copy the executable JAR from the build context
# The Docker build context is assumed to be the 'notes-service' directory.
COPY ${JAR_FILE} app.jar

# Expose the port the application runs on
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
