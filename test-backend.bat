@echo off
echo 🏗️  Prime Properties Backend - PostgreSQL Integration Test
echo ========================================================

REM Check if PostgreSQL is running
echo 🔍 Checking PostgreSQL connection...
psql -h localhost -U postgres -c "SELECT 1;" >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ PostgreSQL is not running or not accessible.
    echo    Please start PostgreSQL and ensure it's running on localhost:5432
    echo    Database: prime_properties
    echo    Username: postgres
    echo    Password: password
    pause
    exit /b 1
)

echo ✅ PostgreSQL is running

REM Check if database exists
echo 🔍 Checking if database exists...
psql -h localhost -U postgres -d prime_properties -c "SELECT 1;" >nul 2>&1
if %errorlevel% neq 0 (
    echo 📝 Creating database...
    createdb -h localhost -U postgres prime_properties
    if %errorlevel% equ 0 (
        echo ✅ Database 'prime_properties' created successfully
    ) else (
        echo ❌ Failed to create database
        pause
        exit /b 1
    )
) else (
    echo ✅ Database 'prime_properties' exists
)

echo.
echo 🚀 Starting Spring Boot application...
echo    This will create tables automatically using JPA
echo    Watch for table creation logs...
echo.

cd backend
mvn spring-boot:run
pause
