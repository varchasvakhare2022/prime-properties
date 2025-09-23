#!/bin/bash

echo "🏗️  Starting Prime Properties Application..."
echo "=============================================="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose and try again."
    exit 1
fi

echo "🐳 Building and starting services with Docker Compose..."
docker-compose up --build

echo "✅ Application started successfully!"
echo ""
echo "🌐 Access the application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8080"
echo "   PostgreSQL: localhost:5432"
echo ""
echo "🔐 Default database credentials:"
echo "   Database: prime_properties"
echo "   Username: postgres"
echo "   Password: password"
echo ""
echo "📝 To stop the application, press Ctrl+C or run: docker-compose down"
