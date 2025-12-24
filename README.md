# 🤖 AgentFlow Horizon

A powerful AI-driven multi-agent research platform with advanced NLP capabilities, RAG (Retrieval-Augmented Generation), web scraping, and document analysis features.

## 🌟 Features

### NLP Tools
- **📝 Text Summarization** - Generate concise summaries using Gemini 2.5 Flash Lite
- **🏷️ Entity Extraction** - Extract organizations, people, locations, and key concepts
- **😊 Sentiment Analysis** - Analyze sentiment with confidence scores
- **❓ Question Answering** - Context-based Q&A with AI

### AgentFlow Tools
- **🔬 Multi-Agent Research** - Comprehensive AI-powered research on any topic
- **📚 RAG Query** - Query documents with ChromaDB vector database
- **🌐 Web Scraper** - Scrape and summarize web content automatically
- **📄 ChatPDF** - Upload and chat with PDF documents

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- Gemini API Key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Option 1: Quick Start with Docker (Recommended)

The easiest way to run both backend and frontend together!

```bash
# 1. Clone the repository
git clone <repository-url>
cd AgentFlow-Horizon

# 2. Create .env file from example
copy .env.example .env  # Windows
# cp .env.example .env  # Linux/Mac

# 3. Edit .env and add your Gemini API key
notepad .env

# 4. Start everything with Docker
docker-compose up -d
```

**Access your app:**
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Option 2: Manual Setup

**1. Clone the repository**
```bash
git clone <repository-url>
cd AgentFlow-Horizon
```

**2. Backend Setup**
```bash
cd agentflow_horizon_backend
pip install -r requirements.txt
```

Create `.env` file:
```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash-lite
CHROMA_PATH=./data/memory
APP_NAME=AgentFlow Horizon
APP_VERSION=1.0.0
```

**3. Frontend Setup**
```bash
cd agentflow_horizon_frontend
npm install
```

Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:8000
```

### Running the Application

**Start Backend:**
```bash
cd agentflow_horizon_backend
python server.py
```
Backend will run on `http://localhost:8000`

**Start Frontend:**
```bash
cd agentflow_horizon_frontend
npm start
```
Frontend will run on `http://localhost:3000`

## 🌐 Deployment

Ready to deploy your app to production? Check out the comprehensive deployment guide:

**📘 [DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete guide covering:
- 🐳 Docker deployment
- ☁️ Render.com deployment
- ⚡ Vercel + Render
- 🚂 Railway deployment
- 🖥️ Manual VPS deployment (DigitalOcean, AWS, etc.)

Quick deploy options:
- **Docker**: `docker-compose up -d` (easiest!)
- **Render**: Free hosting for both frontend and backend
- **Vercel**: Best for frontend performance
- **Railway**: Modern and developer-friendly

## 📖 API Documentation

Once the backend is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- Health Check: `http://localhost:8000/api/health`

### Available Endpoints

**NLP Endpoints:**
- `POST /api/nlp/summarize` - Text summarization
- `POST /api/nlp/entities` - Entity extraction
- `POST /api/nlp/sentiment` - Sentiment analysis
- `POST /api/nlp/qna` - Question answering

**AgentFlow Endpoints:**
- `POST /api/agentflow/research` - Multi-agent research
- `POST /api/agentflow/rag-query` - RAG query system
- `POST /api/agentflow/web-scrape` - Web scraping

**Document Endpoints:**
- `POST /api/documents/upload` - Upload documents
- `POST /api/documents/query` - Query uploaded documents

## 🛠️ Technology Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Uvicorn** - ASGI server
- **Google Generative AI** - Gemini 2.5 Flash Lite model
- **ChromaDB** - Vector database for RAG
- **SQLAlchemy** - Database ORM
- **BeautifulSoup4** - Web scraping
- **PyPDF2** - PDF processing

### Frontend
- **React 18** - UI framework
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Radix UI** - Component library
- **Axios** - HTTP client
- **Lucide React** - Icons

## 📁 Project Structure

```
AgentFlow-Horizon/
├── agentflow_horizon_backend/
│   ├── server.py              # FastAPI application
│   ├── requirements.txt       # Python dependencies
│   ├── .env                   # Environment variables
│   ├── agents/                # Agent modules
│   ├── database/              # Database utilities
│   ├── utils/                 # Helper functions
│   └── data/                  # SQLite & ChromaDB storage
│
└── agentflow_horizon_frontend/
    ├── src/
    │   ├── App.js            # Main application
    │   ├── pages/            # Page components
    │   │   ├── nlp/          # NLP tool pages
    │   │   └── agentflow/    # AgentFlow tool pages
    │   └── components/       # Reusable components
    ├── public/               # Static files
    └── package.json          # Node dependencies
```

## ⚙️ Configuration

### Backend Environment Variables
- `GEMINI_API_KEY` - Your Google Gemini API key (required)
- `CHROMA_PATH` - Path for ChromaDB storage (default: ./data/memory)
- `APP_NAME` - Application name
- `APP_VERSION` - Application version
- `DEBUG` - Debug mode (True/False)

### Frontend Environment Variables
- `REACT_APP_BACKEND_URL` - Backend API URL (default: http://localhost:8000)
- `BROWSER` - Auto-open browser (none/default)

## 🧪 Testing

Run comprehensive API tests:
```bash
cd agentflow_horizon_backend
python comprehensive_test.py
```

## 🔧 Troubleshooting

### Backend Issues
- **Port 8000 in use**: Kill the process or change the port in `server.py`
- **ChromaDB errors**: Delete `./data/memory` folder and restart
- **Gemini API errors**: Verify your API key is valid

### Frontend Issues
- **Port 3000 in use**: React will prompt to use another port
- **CORS errors**: Ensure backend is running on port 8000
- **Module not found**: Run `npm install` again

## 📝 Performance Optimizations

- Reduced API call tokens for faster responses
- Optimized RAG queries (limited to 3 documents)
- Efficient web scraping (first 2000 chars)
- Single API call for multi-agent research
- Configurable max_tokens for different endpoints

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source.

## 🙏 Acknowledgments

- Google Gemini AI for powerful language models
- ChromaDB for vector storage
- FastAPI for excellent async framework
- React community for amazing tools

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ using AI and modern web technologies**

** Thank you **
