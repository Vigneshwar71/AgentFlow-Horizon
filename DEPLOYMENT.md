# 🚀 AgentFlow-Horizon Deployment Guide

This guide covers multiple deployment options for your AgentFlow-Horizon application.

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Deployment Options](#deployment-options)
  - [1. Docker Deployment (Recommended)](#1-docker-deployment-recommended)
  - [2. Render.com Deployment](#2-rendercom-deployment)
  - [3. Vercel + Render](#3-vercel--render)
  - [4. Railway Deployment](#4-railway-deployment)
  - [5. Manual VPS Deployment](#5-manual-vps-deployment)

---

## Prerequisites

- **Gemini API Key**: Get one from [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Git**: For version control
- **Docker** (for Docker deployment)
- Accounts on your chosen platform (Render, Vercel, Railway, etc.)

---

## Environment Variables

### Backend Environment Variables

```env
GEMINI_API_KEY=your_actual_api_key_here
GEMINI_MODEL=gemini-2.5-flash-lite
HOST=0.0.0.0
PORT=8000
CORS_ORIGINS=https://your-frontend-domain.com
```

### Frontend Environment Variables

```env
REACT_APP_API_URL=https://your-backend-domain.com
```

---

## Deployment Options

### 1. Docker Deployment (Recommended)

**Easiest way to deploy both services together!**

#### Step 1: Install Docker
- Download from [docker.com](https://www.docker.com/products/docker-desktop/)

#### Step 2: Configure Environment
```bash
# Create .env file in root directory
cp .env.example .env

# Edit .env and add your Gemini API key
notepad .env
```

#### Step 3: Build and Run
```bash
# Build and start both services
docker-compose up -d

# Check logs
docker-compose logs -f

# Stop services
docker-compose down
```

**Access Your App:**
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

#### Deploy to Production (Docker)

1. **Push to Docker Hub:**
```bash
# Build images
docker-compose build

# Tag images
docker tag agentflow-horizon_backend yourusername/agentflow-backend:latest
docker tag agentflow-horizon_frontend yourusername/agentflow-frontend:latest

# Push to Docker Hub
docker push yourusername/agentflow-backend:latest
docker push yourusername/agentflow-frontend:latest
```

2. **Deploy to any Docker-compatible platform** (DigitalOcean, AWS ECS, Google Cloud Run, etc.)

---

### 2. Render.com Deployment

**Great free tier option!**

#### Backend Deployment on Render

1. **Create a New Web Service:**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select `agentflow_horizon_backend` folder

2. **Configure Service:**
   - **Name**: `agentflow-horizon-backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn server:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free

3. **Add Environment Variables:**
   - `GEMINI_API_KEY` = your_api_key
   - `GEMINI_MODEL` = gemini-2.5-flash-lite
   - `PYTHON_VERSION` = 3.13.0

4. **Deploy!**
   - Your backend will be available at: `https://agentflow-horizon-backend.onrender.com`

#### Frontend Deployment on Render

1. **Create a Static Site:**
   - Click "New" → "Static Site"
   - Connect your GitHub repository
   - Select `agentflow_horizon_frontend` folder

2. **Configure:**
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`

3. **Add Environment Variable:**
   - `REACT_APP_API_URL` = `https://agentflow-horizon-backend.onrender.com`

4. **Deploy!**

---

### 3. Vercel + Render

**Best for Frontend Performance + Free Backend**

#### Backend: Deploy to Render
Follow [Render Backend Instructions](#backend-deployment-on-render) above.

#### Frontend: Deploy to Vercel

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
cd agentflow_horizon_frontend

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variable during setup:
# REACT_APP_API_URL = https://your-backend.onrender.com

# Deploy to production
vercel --prod
```

**Or use Vercel Dashboard:**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Import GitHub repository
3. Select `agentflow_horizon_frontend` folder
4. Add environment variable: `REACT_APP_API_URL`
5. Deploy!

---

### 4. Railway Deployment

**Modern, simple, and fast!**

#### Deploy Both Services

1. **Install Railway CLI:**
```bash
npm i -g @railway/cli
```

2. **Login:**
```bash
railway login
```

3. **Create New Project:**
```bash
railway init
```

4. **Deploy Backend:**
```bash
cd agentflow_horizon_backend
railway up

# Add environment variables via Railway Dashboard
railway variables set GEMINI_API_KEY=your_key
railway variables set GEMINI_MODEL=gemini-2.5-flash-lite
```

5. **Deploy Frontend:**
```bash
cd ../agentflow_horizon_frontend
railway up

# Add environment variable
railway variables set REACT_APP_API_URL=https://your-backend.railway.app
```

---

### 5. Manual VPS Deployment

**For Ubuntu/Debian servers (DigitalOcean, Linode, AWS EC2, etc.)**

#### Prerequisites on Server
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Python 3.13
sudo apt install python3.13 python3.13-venv python3-pip -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs -y

# Install Nginx
sudo apt install nginx -y
```

#### Deploy Backend

```bash
# Clone repository
git clone https://github.com/yourusername/AgentFlow-Horizon.git
cd AgentFlow-Horizon/agentflow_horizon_backend

# Create virtual environment
python3.13 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
nano .env
# Add your environment variables

# Install PM2 for process management
sudo npm install -g pm2

# Start backend with PM2
pm2 start "uvicorn server:app --host 0.0.0.0 --port 8000" --name agentflow-backend
pm2 save
pm2 startup
```

#### Deploy Frontend

```bash
cd ../agentflow_horizon_frontend

# Install dependencies
npm install

# Create .env file
nano .env
# Add REACT_APP_API_URL=https://your-domain.com

# Build for production
npm run build

# Copy build to Nginx
sudo cp -r build /var/www/agentflow-frontend
```

#### Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/agentflow
```

Add this configuration:

```nginx
# Backend
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

# Frontend
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/agentflow-frontend;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable site and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/agentflow /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Setup SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com
```

---

## 🔒 Security Checklist

- [ ] Never commit `.env` files with real API keys
- [ ] Use environment variables for all sensitive data
- [ ] Enable HTTPS/SSL in production
- [ ] Configure CORS properly (only allow your frontend domain)
- [ ] Set up rate limiting (already implemented in backend)
- [ ] Keep dependencies updated regularly
- [ ] Use strong passwords for databases
- [ ] Enable firewall on VPS deployments

---

## 📊 Monitoring & Maintenance

### Check Application Health

**Backend Health:**
```bash
curl https://your-backend-domain.com/api/health
```

**Frontend Health:**
```bash
curl https://your-frontend-domain.com
```

### View Logs

**Docker:**
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

**PM2 (VPS):**
```bash
pm2 logs agentflow-backend
```

**Render/Railway:** Check logs in their respective dashboards

---

## 🆘 Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Ensure `CORS_ORIGINS` includes your frontend URL
   - Check both HTTP and HTTPS versions

2. **API Connection Failed:**
   - Verify `REACT_APP_API_URL` is correct
   - Check if backend is running: `/api/health`

3. **Gemini API Errors:**
   - Verify API key is correct
   - Check model name: `gemini-2.5-flash-lite`
   - Ensure you're not hitting rate limits

4. **Build Fails:**
   - Clear cache: `npm cache clean --force`
   - Delete `node_modules` and reinstall
   - Check Node.js version (need 18+)

5. **Database Issues:**
   - Ensure `data/` directory exists and has write permissions
   - Delete `data/memory` folder to reset ChromaDB

---

## 🎉 Success!

Once deployed, your application will be live at:
- **Frontend**: Your chosen domain
- **Backend API**: Your backend domain
- **API Documentation**: `https://your-backend-domain.com/docs`

Share your deployed app and enjoy! 🚀

---

## 📞 Need Help?

- Check the main [README.md](./README.md)
- Review [Backend Documentation](./agentflow_horizon_backend/README_BACKEND.md)
- Review [Frontend Documentation](./agentflow_horizon_frontend/README_FRONTEND.md)

---

**Built with ❤️ using FastAPI, React, and Gemini AI**
