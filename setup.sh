#!/bin/bash

echo "🏗️  Prime Properties - Complete Setup Script"
echo "=============================================="

# Check if we're in the project root
if [ ! -f "README.md" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

echo "📋 Prerequisites Check:"
echo "======================"

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js: $NODE_VERSION"
else
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi

# Check Java
if command -v java &> /dev/null; then
    JAVA_VERSION=$(java -version 2>&1 | head -n 1)
    echo "✅ Java: $JAVA_VERSION"
else
    echo "❌ Java not found. Please install Java 17+"
    exit 1
fi

# Check Maven
if command -v mvn &> /dev/null; then
    MVN_VERSION=$(mvn --version | head -n 1)
    echo "✅ Maven: $MVN_VERSION"
else
    echo "❌ Maven not found. Please install Maven 3.6+"
    exit 1
fi

# Check PostgreSQL
if command -v psql &> /dev/null; then
    echo "✅ PostgreSQL: Available"
else
    echo "❌ PostgreSQL not found. Please install PostgreSQL 12+"
    exit 1
fi

echo ""
echo "🗄️  Database Setup:"
echo "=================="

# Check if PostgreSQL is running
if pg_isready -q; then
    echo "✅ PostgreSQL is running"
else
    echo "⚠️  PostgreSQL is not running. Please start PostgreSQL:"
    echo "   sudo service postgresql start"
    echo "   or"
    echo "   brew services start postgresql"
    exit 1
fi

# Create database if it doesn't exist
if psql -lqt | cut -d \| -f 1 | grep -qw prime_properties; then
    echo "✅ Database 'prime_properties' already exists"
else
    echo "📝 Creating database 'prime_properties'..."
    createdb prime_properties
    if [ $? -eq 0 ]; then
        echo "✅ Database created successfully"
    else
        echo "❌ Failed to create database. Please check PostgreSQL setup."
        exit 1
    fi
fi

echo ""
echo "🔧 Backend Setup:"
echo "================="

cd backend

# Check if Maven wrapper exists
if [ -f "mvnw" ]; then
    echo "✅ Maven wrapper found"
else
    echo "❌ Maven wrapper not found. Please ensure you're in the correct directory."
    exit 1
fi

# Install dependencies
echo "📦 Installing backend dependencies..."
./mvnw clean install -DskipTests

if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

cd ..

echo ""
echo "🎨 Frontend Setup:"
echo "=================="

cd frontend

# Check if package.json exists
if [ -f "package.json" ]; then
    echo "✅ package.json found"
else
    echo "❌ package.json not found. Please ensure you're in the correct directory."
    exit 1
fi

# Install dependencies
echo "📦 Installing frontend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

cd ..

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "🚀 To start the application:"
echo ""
echo "1. Start the backend:"
echo "   cd backend"
echo "   ./mvnw spring-boot:run"
echo ""
echo "2. In a new terminal, start the frontend:"
echo "   cd frontend"
echo "   npm start"
echo ""
echo "3. Access the application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:8080"
echo ""
echo "🔐 Test Credentials:"
echo "   Developer: developer@prime.com / DevPass123"
echo "   Customer:  customer@prime.com / CustPass123"
echo ""
echo "📚 For detailed setup instructions, see README.md"
echo ""
echo "Happy coding! 🏠✨"
