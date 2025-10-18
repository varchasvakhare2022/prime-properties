# Stage 1: Build the application
# This stage copies the backend source code and builds the JAR file.
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Stage 2: Create the final, runnable image
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy the JAR file from build stage
COPY --from=build /app/target/*.jar app.jar

# Railway provides PORT environment variable dynamically
# Spring Boot will read server.port=${PORT:8080} from application.properties
# Note: The actual port is determined at runtime by Railway

ENTRYPOINT ["java", "-jar", "app.jar"]