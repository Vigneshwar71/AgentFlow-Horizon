import React, { useState } from 'react';
import axios from 'axios';
import { FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Summarization = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSummarize = async () => {
    if (!text.trim()) {
      toast.error('Please enter text to summarize');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API}/nlp/summarize`, { text });
      setResult(response.data);
      if (response.data.success) {
        toast.success('Text summarized successfully');
      }
    } catch (error) {
      toast.error('Summarization failed: ' + (error.response?.data?.detail || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2" data-testid="summarize-title">Text Summarization</h1>
        <p className="text-gray-600">Generate concise summaries of your text</p>
      </div>

      <Card className="glass mb-6">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Textarea
              placeholder="Enter text to summarize..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={8}
              className="resize-none"
              data-testid="summarize-text-input"
            />
            <Button
              onClick={handleSummarize}
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
              data-testid="summarize-submit-btn"
            >
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Summarizing...</>
              ) : (
                <><FileText className="mr-2 h-4 w-4" /> Summarize</>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && result.success && (
        <Card className="glass fade-in" data-testid="summarize-results">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 whitespace-pre-wrap">{result.summary}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Summarization;
