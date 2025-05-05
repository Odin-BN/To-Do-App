# Use Eclipse Temurin 17 as the base image
FROM maven:3.9.6-eclipse-temurin-17 AS builder

# Install Maven and certificates
# RUN apt-get update && apt-get install -y maven ca-certificates && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy the Maven build file
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline

# Copy the rest of the application code
COPY . .

# Build the application
RUN mvn clean package -DskipTests
#RUN ./mvnw clean package 

# Use Eclipse Temurin 17 as the runtime image
FROM eclipse-temurin:17-jdk AS runtime
#FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=builder /app/target/*.jar app.jar

# Expose port 9090
EXPOSE 9090

# Run the application
CMD ["java", "-jar", "app.jar"]
