# Use Amazon Corretto 17 (OpenJDK)
FROM amazoncorretto:17-alpine

# Set working directory
WORKDIR /app

# Copy the JAR file
COPY target/IPL-Dashboard-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8080
EXPOSE 8080

# Set environment variables
ENV JAVA_OPTS="-Xmx512m -Xms256m"

# Run the application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Dserver.port=${PORT:-8080} -jar app.jar"]