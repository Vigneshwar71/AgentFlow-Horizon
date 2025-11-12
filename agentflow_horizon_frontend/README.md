# 🎨 AgentFlow Horizon - Frontend

Modern React-based frontend for the AgentFlow Horizon AI platform with a beautiful UI built using Tailwind CSS and Radix UI components.

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Configuration

Create a `.env` file:

```env
REACT_APP_BACKEND_URL=http://localhost:8000
BROWSER=none
```

## 📜 Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

## 🎨 Features

### NLP Tools Pages
- **Text Summarization** (`/nlp/summarize`) - Generate concise summaries
- **Entity Extraction** (`/nlp/entities`) - Extract named entities
- **Sentiment Analysis** (`/nlp/sentiment`) - Analyze text sentiment
- **Question Answering** (`/nlp/qna`) - Context-based Q&A

### AgentFlow Tools Pages
- **Multi-Agent Research** (`/agentflow/research`) - AI research system
- **RAG Query** (`/agentflow/rag-query`) - Query knowledge base
- **Web Scraper** (`/agentflow/web-scraper`) - Scrape and analyze websites
- **File Upload** (`/agentflow/file-upload`) - ChatPDF functionality

### System Pages
- **Home** (`/`) - Dashboard overview
- **System Health** (`/system-health`) - Backend status monitoring

## 🛠️ Tech Stack

- **React 18.2.0** - UI library
- **React Router DOM 6.20.0** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Axios 1.13.2** - HTTP client
- **Lucide React** - Icon library
- **Sonner** - Toast notifications
- **CRACO** - Create React App Configuration Override

## 📦 Key Dependencies

```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "axios": "^1.13.2",
  "tailwindcss": "^3.4.17",
  "lucide-react": "^0.469.0",
  "@radix-ui/react-*": "^1.0.0+"
}
```

## 🎨 UI Components

Located in `src/components/ui/`:
- Buttons, Cards, Inputs
- Dialogs, Alerts, Toasts
- Tabs, Accordions, Dropdowns
- Form elements
- Navigation components
- And 30+ more Radix UI components

## 📁 Project Structure

```
src/
├── App.js                 # Main application component
├── App.css               # Global styles
├── index.js              # Entry point
├── index.css             # Tailwind directives
├── components/
│   ├── Navbar.jsx        # Navigation bar
│   └── ui/               # Reusable UI components
├── pages/
│   ├── Home.jsx          # Dashboard
│   ├── SystemHealth.jsx  # Health monitoring
│   ├── nlp/              # NLP tool pages
│   │   ├── Summarization.jsx
│   │   ├── EntityExtraction.jsx
│   │   ├── SentimentAnalysis.jsx
│   │   └── QuestionAnswering.jsx
│   └── agentflow/        # AgentFlow tool pages
│       ├── MultiAgentResearch.jsx
│       ├── RAGQuery.jsx
│       ├── WebScraper.jsx
│       └── FileUpload.jsx
├── hooks/
│   └── use-toast.js      # Toast notification hook
└── lib/
    └── utils.js          # Utility functions
```

## 🎯 Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Home | Dashboard overview |
| `/system-health` | SystemHealth | Backend status |
| `/nlp/summarize` | Summarization | Text summarization |
| `/nlp/entities` | EntityExtraction | Entity extraction |
| `/nlp/sentiment` | SentimentAnalysis | Sentiment analysis |
| `/nlp/qna` | QuestionAnswering | Q&A system |
| `/agentflow/research` | MultiAgentResearch | Research tool |
| `/agentflow/rag-query` | RAGQuery | RAG queries |
| `/agentflow/web-scraper` | WebScraper | Web scraping |
| `/agentflow/file-upload` | FileUpload | Document upload |

## 🔧 Configuration

### Environment Variables

Create `.env` in the root:

```env
# Backend API URL
REACT_APP_BACKEND_URL=http://localhost:8000

# Browser auto-open (none to disable)
BROWSER=none
```

### Tailwind Configuration

Configured in `tailwind.config.js` with:
- Custom colors and themes
- Radix UI integration
- Animation utilities
- Responsive breakpoints

### CRACO Configuration

Custom webpack config in `craco.config.js` for:
- Path aliases
- Build optimizations
- Dev server middleware

## 🎨 Styling

### Tailwind CSS
All components use Tailwind utility classes:
```jsx
<div className="max-w-6xl mx-auto px-4 py-8">
  <Card className="glass mb-6">
    <Button className="bg-gradient-to-r from-indigo-600 to-blue-600">
      Click Me
    </Button>
  </Card>
</div>
```

### Custom Classes
- `.glass` - Glassmorphism effect
- `.fade-in` - Fade-in animation
- Gradient backgrounds
- Shadow effects

## 🔌 API Integration

All API calls use Axios with base URL from environment:

```javascript
const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Example API call
const response = await axios.post(`${API}/nlp/summarize`, { text });
```

### Error Handling
Toast notifications for:
- Success messages
- Error alerts
- Loading states
- Validation errors

## 🧪 Testing

```bash
npm test
```

Launches Jest test runner in watch mode.

## 🏗️ Build for Production

```bash
npm run build
```

Creates optimized production build in `build/` folder.

### Build Output
- Minified JavaScript bundles
- Optimized CSS
- Asset hashing for cache busting
- Service worker for PWA support

## 🚀 Deployment

### Option 1: Static Hosting
Deploy the `build/` folder to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Firebase Hosting

### Option 2: Docker
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables in Production
Update `REACT_APP_BACKEND_URL` to production API URL.

## 🐛 Troubleshooting

### Issue: Module not found
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: CORS errors
- Ensure backend is running
- Check backend CORS configuration
- Verify `REACT_APP_BACKEND_URL` is correct

### Issue: Port 3000 in use
React will prompt to use another port (Y/n).

### Issue: Build fails
- Clear cache: `rm -rf node_modules/.cache`
- Update dependencies: `npm update`
- Check Node version: `node --version` (16+)

## 🎨 Customization

### Change Theme Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
    }
  }
}
```

### Add New Pages
1. Create component in `src/pages/`
2. Add route in `App.js`
3. Add navigation link in `Navbar.jsx`

### Modify Components
All UI components in `src/components/ui/` can be customized.

## 📱 Responsive Design

All pages are fully responsive with breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## ♿ Accessibility

- Radix UI provides accessible primitives
- ARIA labels and roles
- Keyboard navigation
- Screen reader support

## 🔍 Code Quality

### Linting
```bash
npm run lint
```

### Formatting
Uses Prettier (if configured)

## 📊 Performance

- Code splitting by route
- Lazy loading components
- Optimized bundle size
- Tree shaking enabled
- Minification in production

## 💡 Tips

1. **API Calls**: Use React Query or SWR for advanced data fetching
2. **State Management**: Consider Redux or Zustand for complex state
3. **Forms**: Use React Hook Form for form validation
4. **Testing**: Add unit tests for components
5. **Performance**: Use React DevTools Profiler

## 📚 Learn More

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
- [React Router](https://reactrouter.com)

## 🆘 Support

For frontend-specific issues:
1. Check browser console for errors
2. Verify backend connectivity
3. Check environment variables
4. Review component props

---

**Frontend built with React and Tailwind CSS** ⚛️
