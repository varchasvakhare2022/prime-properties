@echo off
echo 🏗️  Starting Prime Properties Application...
echo ==============================================

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not running. Please start Docker and try again.
    pause
    exit /b 1
)

REM Check if Docker Compose is available
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose is not installed. Please install Docker Compose and try again.
    pause
    exit /b 1
)

echo 🐳 Building and starting services with Docker Compose...
docker-compose up --build

echo ✅ Application started successfully!
echo.
echo 🌐 Access the application:
echo    Frontend: http://localhost:3000
echo    Backend API: http://localhost:8080
echo    PostgreSQL: localhost:5432
echo.
echo 🔐 Default database credentials:
echo    Database: prime_properties
echo    Username: postgres
echo    Password: password
echo.
echo 📝 To stop the application, press Ctrl+C or run: docker-compose down
pause
