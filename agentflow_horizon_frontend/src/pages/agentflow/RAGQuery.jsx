import React, { useState } from 'react';
import axios from 'axios';
import { Database, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const RAGQuery = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleQuery = async () => {
    if (!query.trim()) {
      toast.error('Please enter a query');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API}/agentflow/rag-query`, { query });
      setResult(response.data);
      if (response.data.success) {
        toast.success('Query completed successfully');
      } else {
        toast.warning(response.data.message || 'No documents found');
      }
    } catch (error) {
      toast.error('Query failed: ' + (error.response?.data?.detail || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2" data-testid="rag-title">RAG Query</h1>
        <p className="text-gray-600">Retrieve relevant documents from vector database</p>
      </div>

      <Card className="glass mb-6">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Textarea
              placeholder="Enter your query..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={4}
              className="resize-none"
              data-testid="rag-query-input"
            />
            <Button
              onClick={handleQuery}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              data-testid="rag-submit-btn"
            >
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Querying...</>
              ) : (
                <><Database className="mr-2 h-4 w-4" /> Query Database</>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && result.success && (
        <div className="space-y-6 fade-in" data-testid="rag-results">
          {result.answer && (
            <Card className="glass">
              <CardHeader>
                <CardTitle>Answer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap">{result.answer}</p>
              </CardContent>
            </Card>
          )}

          {result.documents && result.documents.length > 0 && (
            <Card className="glass">
              <CardHeader>
                <CardTitle>Retrieved Documents ({result.documents.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {result.documents.map((doc, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700 mb-2">{doc.text}</p>
                      {doc.metadata && (
                        <div className="text-xs text-gray-500">
                          {doc.metadata.filename && <span>File: {doc.metadata.filename}</span>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default RAGQuery;
