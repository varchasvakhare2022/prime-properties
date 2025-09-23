@echo off
echo 🏗️  Prime Properties - Complete Setup Script
echo ==============================================

REM Check if we're in the project root
if not exist "README.md" (
    echo ❌ Please run this script from the project root directory
    pause
    exit /b 1
)

echo 📋 Prerequisites Check:
echo ======================

REM Check Node.js
node --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo ✅ Node.js: %NODE_VERSION%
) else (
    echo ❌ Node.js not found. Please install Node.js 18+
    pause
    exit /b 1
)

REM Check Java
java -version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Java: Available
) else (
    echo ❌ Java not found. Please install Java 17+
    pause
    exit /b 1
)

REM Check Maven
mvn --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Maven: Available
) else (
    echo ❌ Maven not found. Please install Maven 3.6+
    pause
    exit /b 1
)

echo.
echo 🗄️  Database Setup:
echo ==================
echo ⚠️  Please ensure PostgreSQL is running and create database 'prime_properties'
echo    You can do this by running:
echo    createdb prime_properties
echo    or
echo    psql -U postgres -c "CREATE DATABASE prime_properties;"

echo.
echo 🔧 Backend Setup:
echo =================

cd backend

REM Check if Maven wrapper exists
if exist "mvnw.cmd" (
    echo ✅ Maven wrapper found
) else (
    echo ❌ Maven wrapper not found. Please ensure you're in the correct directory.
    pause
    exit /b 1
)

REM Install dependencies
echo 📦 Installing backend dependencies...
call mvnw.cmd clean install -DskipTests

if %errorlevel% equ 0 (
    echo ✅ Backend dependencies installed
) else (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)

cd ..

echo.
echo 🎨 Frontend Setup:
echo ==================

cd frontend

REM Check if package.json exists
if exist "package.json" (
    echo ✅ package.json found
) else (
    echo ❌ package.json not found. Please ensure you're in the correct directory.
    pause
    exit /b 1
)

REM Install dependencies
echo 📦 Installing frontend dependencies...
call npm install

if %errorlevel% equ 0 (
    echo ✅ Frontend dependencies installed
) else (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)

cd ..

echo.
echo 🎉 Setup Complete!
echo ==================
echo.
echo 🚀 To start the application:
echo.
echo 1. Start the backend:
echo    cd backend
echo    mvnw.cmd spring-boot:run
echo.
echo 2. In a new terminal, start the frontend:
echo    cd frontend
echo    npm start
echo.
echo 3. Access the application:
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:8080
echo.
echo 🔐 Test Credentials:
echo    Developer: developer@prime.com / DevPass123
echo    Customer:  customer@prime.com / CustPass123
echo.
echo 📚 For detailed setup instructions, see README.md
echo.
echo Happy coding! 🏠✨
pause
