# 🚀 Quick Deployment Reference Card

## 🐳 Docker Deployment (5 Minutes)

```bash
# 1. Setup environment
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY

# 2. Start everything
docker-compose up -d

# 3. Check status
docker-compose ps

# 4. View logs
docker-compose logs -f

# URLs
# Frontend: http://localhost:3000
# Backend:  http://localhost:8000
# API Docs: http://localhost:8000/docs
```

## ☁️ Render.com (Free Hosting)

### Backend:
1. Go to https://dashboard.render.com
2. New → Web Service
3. Connect GitHub repo → Select `agentflow_horizon_backend`
4. Settings:
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn server:app --host 0.0.0.0 --port $PORT`
5. Add env var: `GEMINI_API_KEY`
6. Deploy!

### Frontend:
1. New → Static Site
2. Connect GitHub repo → Select `agentflow_horizon_frontend`
3. Settings:
   - Build: `npm install && npm run build`
   - Publish: `build`
4. Add env var: `REACT_APP_API_URL` = your_backend_url
5. Deploy!

## ⚡ Vercel (Frontend Only)

```bash
cd agentflow_horizon_frontend
npm i -g vercel
vercel login
vercel
# Add env var when prompted:
# REACT_APP_API_URL = your_backend_url
vercel --prod
```

## 🚂 Railway (Full Stack)

```bash
npm i -g @railway/cli
railway login
railway init

# Backend
cd agentflow_horizon_backend
railway up
railway variables set GEMINI_API_KEY=your_key

# Frontend
cd ../agentflow_horizon_frontend
railway up
railway variables set REACT_APP_API_URL=backend_url
```

## 📋 Environment Variables Quick Reference

### Backend (.env)
```env
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-2.5-flash-lite
HOST=0.0.0.0
PORT=8000
CORS_ORIGINS=https://your-frontend.com
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend.com
```

## 🔍 Health Checks

```bash
# Backend health
curl http://localhost:8000/api/health

# Frontend health
curl http://localhost:3000

# Test API
curl -X POST http://localhost:8000/api/nlp/summarize \
  -H "Content-Type: application/json" \
  -d '{"text":"Test message"}'
```

## 🐛 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Port already in use | `docker-compose down` or kill process |
| CORS errors | Update `CORS_ORIGINS` in backend |
| API not responding | Check `GEMINI_API_KEY` is set |
| Frontend can't connect | Verify `REACT_APP_API_URL` |
| Docker build fails | Run `docker system prune -f` |

## 📚 Full Documentation

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Pre-deployment checklist
- **[README.md](./README.md)** - Main documentation
- **API Docs** - http://localhost:8000/docs

## 🎯 Recommended Deployment Path

1. **Local Testing**: Docker Compose
2. **Production Backend**: Render.com (Free)
3. **Production Frontend**: Vercel (Free)
4. **Full Stack Simple**: Railway (Paid but easy)

## ⚠️ Don't Forget!

- ✅ Add `.env` to `.gitignore`
- ✅ Never commit API keys
- ✅ Set up HTTPS in production
- ✅ Update CORS_ORIGINS with real domain
- ✅ Test all 8 endpoints before go-live

---

**Need help?** Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions!
