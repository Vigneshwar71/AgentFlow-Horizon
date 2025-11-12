@echo off
REM AgentFlow-Horizon Quick Start Script for Windows
REM This script helps you get started quickly with Docker

echo.
echo  AgentFlow-Horizon Quick Start
echo ================================
echo.

REM Check if Docker is installed
where docker >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo  Docker is not installed. Please install Docker first:
    echo    https://www.docker.com/products/docker-desktop/
    exit /b 1
)

REM Check if docker-compose is installed
where docker-compose >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo  Docker Compose is not installed. Please install Docker Compose first.
    exit /b 1
)

echo  Docker and Docker Compose are installed
echo.

REM Check if .env file exists
if not exist ".env" (
    echo   No .env file found. Creating from .env.example...
    copy .env.example .env >nul
    echo.
    echo  Please edit the .env file and add your Gemini API key:
    echo    GEMINI_API_KEY=your_actual_api_key_here
    echo.
    echo Then run this script again.
    pause
    exit /b 1
)

REM Check if GEMINI_API_KEY is set
findstr /C:"GEMINI_API_KEY=your_gemini_api_key_here" .env >nul
if %ERRORLEVEL% EQU 0 (
    echo  Please set your GEMINI_API_KEY in the .env file
    pause
    exit /b 1
)

echo  Environment variables configured
echo.

REM Ask user what to do
echo What would you like to do?
echo 1) Start the application
echo 2) Stop the application
echo 3) View logs
echo 4) Rebuild and restart
echo 5) Clean up everything
echo.
set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" (
    echo.
    echo  Starting AgentFlow-Horizon...
    docker-compose up -d
    echo.
    echo  Application started!
    echo.
    echo  Access your application:
    echo    Frontend: http://localhost:3000
    echo    Backend:  http://localhost:8000
    echo    API Docs: http://localhost:8000/docs
    echo.
    echo  View logs: docker-compose logs -f
    pause
) else if "%choice%"=="2" (
    echo.
    echo  Stopping AgentFlow-Horizon...
    docker-compose down
    echo  Application stopped
    pause
) else if "%choice%"=="3" (
    echo.
    echo  Viewing logs (Press Ctrl+C to exit)...
    docker-compose logs -f
) else if "%choice%"=="4" (
    echo.
    echo  Rebuilding and restarting...
    docker-compose down
    docker-compose build --no-cache
    docker-compose up -d
    echo  Application rebuilt and restarted!
    pause
) else if "%choice%"=="5" (
    echo.
    echo  Cleaning up everything...
    docker-compose down -v
    docker system prune -f
    echo  Cleanup complete
    pause
) else (
    echo  Invalid choice
    pause
    exit /b 1
)
