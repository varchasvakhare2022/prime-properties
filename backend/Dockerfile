# Stage 1: Build the application
# This stage copies the backend source code and builds the JAR file.
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Stage 2: Create the final, runnable image
FROM openjdk:17-jdk-slim
WORKDIR /app

# --- THIS IS THE CORRECTED LINE ---
# It now copies from /app/target/ because the build context is the backend folder itself.
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]