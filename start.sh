#!/bin/bash

# AgentFlow-Horizon Quick Start Script
# This script helps you get started quickly with Docker

echo "🚀 AgentFlow-Horizon Quick Start"
echo "================================"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first:"
    echo "   https://www.docker.com/products/docker-desktop/"
    exit 1
fi

# Check if docker-compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found. Creating from .env.example..."
    cp .env.example .env
    echo ""
    echo "📝 Please edit the .env file and add your Gemini API key:"
    echo "   GEMINI_API_KEY=your_actual_api_key_here"
    echo ""
    echo "Then run this script again."
    exit 1
fi

# Check if GEMINI_API_KEY is set
source .env
if [ -z "$GEMINI_API_KEY" ] || [ "$GEMINI_API_KEY" = "your_gemini_api_key_here" ]; then
    echo "❌ Please set your GEMINI_API_KEY in the .env file"
    exit 1
fi

echo "✅ Environment variables configured"
echo ""

# Ask user what to do
echo "What would you like to do?"
echo "1) Start the application"
echo "2) Stop the application"
echo "3) View logs"
echo "4) Rebuild and restart"
echo "5) Clean up everything"
echo ""
read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Starting AgentFlow-Horizon..."
        docker-compose up -d
        echo ""
        echo "✅ Application started!"
        echo ""
        echo "📍 Access your application:"
        echo "   Frontend: http://localhost:3000"
        echo "   Backend:  http://localhost:8000"
        echo "   API Docs: http://localhost:8000/docs"
        echo ""
        echo "📊 View logs: docker-compose logs -f"
        ;;
    2)
        echo ""
        echo "🛑 Stopping AgentFlow-Horizon..."
        docker-compose down
        echo "✅ Application stopped"
        ;;
    3)
        echo ""
        echo "📊 Viewing logs (Press Ctrl+C to exit)..."
        docker-compose logs -f
        ;;
    4)
        echo ""
        echo "🔄 Rebuilding and restarting..."
        docker-compose down
        docker-compose build --no-cache
        docker-compose up -d
        echo "✅ Application rebuilt and restarted!"
        ;;
    5)
        echo ""
        echo "🧹 Cleaning up everything..."
        docker-compose down -v
        docker system prune -f
        echo "✅ Cleanup complete"
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac
