import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Database, Globe, Upload, FileText, Tag, Smile, MessageSquare } from 'lucide-react';

const Home = () => {
  const agentflowTools = [
    {
      title: 'Multi-Agent Research',
      description: 'Coordinate agents for search, summarization, and synthesis',
      icon: Brain,
      path: '/agentflow/research',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'RAG Query',
      description: 'Retrieve relevant chunks from vector DB and respond contextually',
      icon: Database,
      path: '/agentflow/rag-query',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Web Content Scraper',
      description: 'Extract and summarize online sources',
      icon: Globe,
      path: '/agentflow/web-scraper',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Chat with Documents',
      description: 'ChatPDF-like interface - Upload and query documents using Google ADK',
      icon: Upload,
      path: '/agentflow/file-upload',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const nlpTools = [
    {
      title: 'Summarization',
      description: 'Extractive/abstractive summaries of given text',
      icon: FileText,
      path: '/nlp/summarization',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      title: 'Entity Extraction',
      description: 'Detect and categorize named entities (Person, Org, Date, etc.)',
      icon: Tag,
      path: '/nlp/entities',
      color: 'from-pink-500 to-rose-500'
    },
    {
      title: 'Sentiment Analysis',
      description: 'Classify polarity (Positive, Neutral, Negative)',
      icon: Smile,
      path: '/nlp/sentiment',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Question Answering',
      description: 'Answer questions based on input context',
      icon: MessageSquare,
      path: '/nlp/qna',
      color: 'from-teal-500 to-cyan-500'
    }
  ];

  const ToolCard = ({ tool }) => {
    const IconComponent = tool.icon;
    return (
      <Link to={tool.path} data-testid={`home-card-${tool.path.replace(/\//g, '-')}`}>
        <div className="glass rounded-xl p-6 card-hover h-full">
          <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${tool.color} mb-4`}>
            <IconComponent className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.title}</h3>
          <p className="text-sm text-gray-600">{tool.description}</p>
        </div>
      </Link>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16 fade-in">
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4" data-testid="home-title">
          Welcome to <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">AgentFlow</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Intelligent multi-agent research platform with RAG retrieval, web scraping, and advanced NLP tools
        </p>
      </div>

      {/* AgentFlow Suite */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6" data-testid="agentflow-section">
          AgentFlow Suite
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {agentflowTools.map((tool, index) => (
            <ToolCard key={index} tool={tool} />
          ))}
        </div>
      </div>

      {/* NLP Tools Suite */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6" data-testid="nlp-section">
          NLP Tools Suite
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {nlpTools.map((tool, index) => (
            <ToolCard key={index} tool={tool} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
