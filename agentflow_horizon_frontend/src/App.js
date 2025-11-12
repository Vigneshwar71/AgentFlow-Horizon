import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import MultiAgentResearch from "@/pages/agentflow/MultiAgentResearch";
import RAGQuery from "@/pages/agentflow/RAGQuery";
import WebScraper from "@/pages/agentflow/WebScraper";
import FileUpload from "@/pages/agentflow/FileUpload";
import Summarization from "@/pages/nlp/Summarization";
import EntityExtraction from "@/pages/nlp/EntityExtraction";
import SentimentAnalysis from "@/pages/nlp/SentimentAnalysis";
import QuestionAnswering from "@/pages/nlp/QuestionAnswering";
import SystemHealth from "@/pages/SystemHealth";

function App() {
  return (
    <div className="App min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agentflow/research" element={<MultiAgentResearch />} />
          <Route path="/agentflow/rag-query" element={<RAGQuery />} />
          <Route path="/agentflow/web-scraper" element={<WebScraper />} />
          <Route path="/agentflow/file-upload" element={<FileUpload />} />
          <Route path="/nlp/summarization" element={<Summarization />} />
          <Route path="/nlp/entities" element={<EntityExtraction />} />
          <Route path="/nlp/sentiment" element={<SentimentAnalysis />} />
          <Route path="/nlp/qna" element={<QuestionAnswering />} />
          <Route path="/health" element={<SystemHealth />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
