# 🔧 AgentFlow Horizon - Backend

FastAPI-based backend with AI-powered NLP, RAG, and document processing capabilities using Gemini 2.5 Flash Lite.

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
pip install -r requirements.txt
```

### Configuration

Create a `.env` file in the backend directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
CHROMA_PATH=./data/memory
APP_NAME=AgentFlow Horizon
APP_VERSION=1.0.0
DEBUG=True
```

### Running the Server

```bash
python server.py
```

Server will start on `http://localhost:8000`

## 📚 API Documentation

Access interactive API documentation:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🛠️ Tech Stack

- **FastAPI** - Modern async web framework
- **Uvicorn** - ASGI server
- **Google Generative AI** - Gemini 2.5 Flash Lite
- **ChromaDB** - Vector database
- **SQLAlchemy** - SQL ORM
- **BeautifulSoup4** - Web scraping
- **PyPDF2** - PDF processing

## 📋 Dependencies

```
fastapi==0.115.6
uvicorn==0.35.0
chromadb==1.0.20
google-generativeai==0.8.5
google-adk==0.1.0
python-dotenv==1.0.1
beautifulsoup4==4.13.5
requests==2.32.5
pypdf2==3.0.1
python-multipart==0.0.20
sqlalchemy==2.0.43
```

## 🌐 API Endpoints

### Health Check
```http
GET /api/health
```

Returns system health status, ChromaDB document count, and service status.

### NLP Endpoints

#### Summarize Text
```http
POST /api/nlp/summarize
Content-Type: application/json

{
  "text": "Your text to summarize..."
}
```

#### Extract Entities
```http
POST /api/nlp/entities
Content-Type: application/json

{
  "text": "Text containing entities..."
}
```

#### Sentiment Analysis
```http
POST /api/nlp/sentiment
Content-Type: application/json

{
  "text": "Text to analyze sentiment..."
}
```

#### Question Answering
```http
POST /api/nlp/qna
Content-Type: application/json

{
  "context": "Background information...",
  "question": "Your question?"
}
```

### AgentFlow Endpoints

#### Multi-Agent Research
```http
POST /api/agentflow/research
Content-Type: application/json

{
  "query": "Research topic"
}
```

#### RAG Query
```http
POST /api/agentflow/rag-query
Content-Type: application/json

{
  "query": "Your query"
}
```

#### Web Scraping
```http
POST /api/agentflow/web-scrape
Content-Type: application/json

{
  "url": "https://example.com"
}
```

### Document Endpoints

#### Upload Document
```http
POST /api/documents/upload
Content-Type: multipart/form-data

file: [PDF file]
```

#### Query Document
```http
POST /api/documents/query
Content-Type: application/json

{
  "file_id": "document_id",
  "query": "Question about document"
}
```

## 🗄️ Database Structure

### SQLite Database
Location: `./data/agentflow.db`

**ResultRecord Table:**
- `id` - UUID primary key
- `tool_name` - Name of the tool used
- `input_data` - JSON of input parameters
- `output_data` - JSON of results
- `timestamp` - DateTime of operation

### ChromaDB Vector Store
Location: `./data/memory`

Stores document embeddings for RAG functionality.

## ⚡ Performance Optimizations

### Configurable Token Limits
```python
def call_gemini(prompt: str, temperature: float = 0.7, max_tokens: int = 1024)
```

- Default: 1024 tokens (fast responses)
- Research: 1536 tokens (comprehensive)
- Can be adjusted per endpoint

### Optimized Endpoints

1. **Multi-Agent Research**: Single API call with structured prompt
2. **RAG Query**: Limited to 3 documents, 1500 chars each
3. **Web Scraping**: First 2000 characters for summarization

## 🔒 CORS Configuration

Allowed origins:
- http://localhost:3000
- http://localhost:3002
- http://127.0.0.1:3000
- http://127.0.0.1:3002

## 🧪 Testing

### Run Test Suite
```bash
python comprehensive_test.py
```

### Test Single Endpoint
```bash
python test_api.py
```

### Test Gemini Connection
```bash
python test_gemini.py
```

## 🐛 Debugging

### Enable Debug Logging
Set in `.env`:
```env
DEBUG=True
```

### Check Health
```bash
curl http://localhost:8000/api/health
```

### View Logs
Server logs are printed to console with:
- ✅ Success messages (green)
- ⚠️ Warnings (yellow)
- ❌ Errors (red)

## 📁 Project Structure

```
agentflow_horizon_backend/
├── server.py              # Main FastAPI application
├── requirements.txt       # Python dependencies
├── .env                   # Environment configuration
├── Procfile              # Deployment configuration
├── agents/               # Agent modules (optional)
├── database/             # Database utilities
├── utils/                # Helper functions
├── data/                 # Data storage
│   ├── agentflow.db     # SQLite database
│   └── memory/          # ChromaDB storage
└── tests/               # Test scripts
```

## 🔧 Helper Functions

### `call_gemini(prompt, temperature, max_tokens)`
Makes API calls to Gemini with error handling.

### `save_result(tool_name, input_data, output_data)`
Persists results to SQLite database.

### `scrape_website(url)`
Scrapes web content using BeautifulSoup4.

## 🚨 Error Handling

All endpoints include comprehensive error handling:
- Invalid API keys
- Network timeouts
- Database errors
- Malformed requests

Errors return structured JSON:
```json
{
  "detail": "Error message"
}
```

## 🔐 Security Notes

- Store API keys in `.env` file
- Never commit `.env` to version control
- Add `.env` to `.gitignore`
- Use environment variables in production

## 📊 Monitoring

Monitor API usage through:
- Console logs
- SQLite database queries
- ChromaDB document counts
- Health endpoint checks

## 🚀 Deployment

### Production Checklist
- [ ] Set `DEBUG=False` in production
- [ ] Use proper CORS origins
- [ ] Set up database backups
- [ ] Monitor API rate limits
- [ ] Use HTTPS in production
- [ ] Set up logging infrastructure

### Using Procfile
```
web: uvicorn server:app --host=0.0.0.0 --port=${PORT:-8000}
```

## 💡 Tips

1. **Rate Limiting**: Gemini API has rate limits - implement caching for frequent queries
2. **ChromaDB**: Regularly backup the `./data/memory` folder
3. **SQLite**: Use PostgreSQL for production deployments
4. **Async**: FastAPI is async - leverage it for concurrent requests

## 🆘 Troubleshooting

### Issue: ChromaDB Initialization Fails
```bash
# Delete and recreate
rm -rf ./data/memory
# Restart server
```

### Issue: Port Already in Use
```bash
# Windows
Get-Process -Id (Get-NetTCPConnection -LocalPort 8000).OwningProcess | Stop-Process -Force

# Linux/Mac
lsof -ti:8000 | xargs kill -9
```

### Issue: Gemini API Errors
- Check API key validity
- Verify model name: `gemini-2.5-flash-lite`
- Check API quota limits

## 📞 Support

For backend-specific issues:
1. Check server logs
2. Test with `comprehensive_test.py`
3. Verify `.env` configuration
4. Check API documentation

---

**Backend powered by FastAPI and Gemini AI** 🚀