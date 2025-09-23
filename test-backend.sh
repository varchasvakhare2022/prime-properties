#!/bin/bash

echo "🏗️  Prime Properties Backend - PostgreSQL Integration Test"
echo "========================================================"

# Check if PostgreSQL is running
echo "🔍 Checking PostgreSQL connection..."
if ! pg_isready -h localhost -p 5432 -U postgres > /dev/null 2>&1; then
    echo "❌ PostgreSQL is not running or not accessible."
    echo "   Please start PostgreSQL and ensure it's running on localhost:5432"
    echo "   Database: prime_properties"
    echo "   Username: postgres"
    echo "   Password: password"
    exit 1
fi

echo "✅ PostgreSQL is running"

# Check if database exists
echo "🔍 Checking if database exists..."
if ! psql -h localhost -U postgres -d prime_properties -c "SELECT 1;" > /dev/null 2>&1; then
    echo "📝 Creating database..."
    createdb -h localhost -U postgres prime_properties
    if [ $? -eq 0 ]; then
        echo "✅ Database 'prime_properties' created successfully"
    else
        echo "❌ Failed to create database"
        exit 1
    fi
else
    echo "✅ Database 'prime_properties' exists"
fi

echo ""
echo "🚀 Starting Spring Boot application..."
echo "   This will create tables automatically using JPA"
echo "   Watch for table creation logs..."
echo ""

cd backend
mvn spring-boot:run
