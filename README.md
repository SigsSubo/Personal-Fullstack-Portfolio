This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Notes Service (`notes-service`)

The `notes-service` is a Spring Boot microservice that provides a RESTful and gRPC API for managing notes and comments. It uses PostgreSQL as its database and integrates with Apache Kafka for event messaging.

### Prerequisites

*   Java 17 or later
*   Maven 3.6.x or later
*   Docker and Docker Compose (for running with `docker-compose`)
*   Access to a PostgreSQL database instance
*   Access to an Apache Kafka instance

### Modules

*   **`notes-service/`**: Contains the Spring Boot application.

### Configuration

Before running the application, you need to configure the database and Kafka connection details:

1.  **Database**:
    Open `notes-service/src/main/resources/application.properties`.
    Update the following properties with your PostgreSQL details:
    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/notes_db
    spring.datasource.username=your_username
    spring.datasource.password=your_password
    ```
    Replace `localhost:5432/notes_db`, `your_username`, and `your_password` with your actual database connection string, username, and password.

2.  **Kafka**:
    In the same `application.properties` file, update:
    ```properties
    spring.kafka.bootstrap-servers=localhost:9092
    ```
    Replace `localhost:9092` if your Kafka broker is running elsewhere.

### Building the Service

To build the `notes-service` JAR file, navigate to the `notes-service` directory and run:

```bash
mvn clean package
```
This will generate the executable JAR in the `notes-service/target/` directory (e.g., `notes-service-0.0.1-SNAPSHOT.jar`).

### Running the Service

#### Option 1: Using Docker Compose (Recommended for Local Development)

The easiest way to run the service along with PostgreSQL and Kafka is by using Docker Compose.
A `docker-compose.yml` file is provided at the root of the repository.

1.  **Ensure Docker and Docker Compose are running.**
2.  **Update Placeholders (if not using default Docker Compose values):** The `docker-compose.yml` uses default credentials (`your_username`/`your_password`) for PostgreSQL and sets up Kafka. If you have modified these in your `application.properties` for a non-Docker setup, ensure consistency or rely on the environment variables provided in `docker-compose.yml` which override `application.properties`.
3.  **Run from the repository root:**
    ```bash
    docker-compose up --build
    ```
    This will:
    *   Build the Docker image for `notes-app`.
    *   Start containers for `notes-app`, `postgres-db`, `kafka`, and `zookeeper`.
    *   The `notes-app` will be available at `http://localhost:8080`.
    *   The PostgreSQL database will be available at `localhost:5432`.
    *   Kafka will be available at `localhost:9092`.

To stop the services:
```bash
docker-compose down
```

#### Option 2: Running the JAR Directly

1.  **Ensure you have a PostgreSQL database and Kafka instance running and configured** as per the `application.properties` file.
2.  **Build the JAR file** as described above.
3.  **Run the JAR file:**
    ```bash
    java -jar notes-service/target/notes-service-0.0.1-SNAPSHOT.jar
    ```
    The service will start, and you can access it at `http://localhost:8080`.

### API Endpoints

*   **REST API Base URL**: `http://localhost:8080/api`
    *   Notes: `/notes` (GET, POST), `/notes/{id}` (GET, PUT, DELETE)
    *   Comments: `/notes/{noteId}/comments` (POST, GET), `/comments/{id}` (GET, PUT, DELETE)
*   **gRPC API**: Runs on port `6565` by default (as per LogNet gRPC starter). Refer to `notes-service/src/main/proto/note_service.proto` for service definitions.

---
