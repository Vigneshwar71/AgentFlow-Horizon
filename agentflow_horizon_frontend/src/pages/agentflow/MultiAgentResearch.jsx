import React, { useState } from 'react';
import axios from 'axios';
import { Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const MultiAgentResearch = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleResearch = async () => {
    if (!query.trim()) {
      toast.error('Please enter a research query');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API}/agentflow/research`, { query });
      setResult(response.data);
      if (response.data.success) {
        toast.success('Research completed successfully');
      }
    } catch (error) {
      toast.error('Research failed: ' + (error.response?.data?.detail || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2" data-testid="research-title">Multi-Agent Research</h1>
        <p className="text-gray-600">Coordinate multiple AI agents for comprehensive research</p>
      </div>

      <Card className="glass mb-6">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Textarea
              placeholder="Enter your research query..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={4}
              className="resize-none"
              data-testid="research-query-input"
            />
            <Button
              onClick={handleResearch}
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              data-testid="research-submit-btn"
            >
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Researching...</>
              ) : (
                <><Search className="mr-2 h-4 w-4" /> Start Research</>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && result.success && (
        <div className="space-y-6 fade-in" data-testid="research-results">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Final Answer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap">{result.final_answer}</p>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap">{result.summary}</p>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Entities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap">{result.entities}</p>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Sentiment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap">{result.sentiment}</p>
            </CardContent>
          </Card>

          {result.retrieved_documents && result.retrieved_documents.length > 0 && (
            <Card className="glass">
              <CardHeader>
                <CardTitle>Retrieved Documents ({result.retrieved_documents.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {result.retrieved_documents.map((doc, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{doc.text.substring(0, 200)}...</p>
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

export default MultiAgentResearch;
