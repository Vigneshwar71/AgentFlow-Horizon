import React, { useState } from 'react';
import axios from 'axios';
import { Smile, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const SentimentAnalysis = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast.error('Please enter text to analyze');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API}/nlp/sentiment`, { text });
      setResult(response.data);
      if (response.data.success) {
        toast.success('Sentiment analyzed successfully');
      }
    } catch (error) {
      toast.error('Analysis failed: ' + (error.response?.data?.detail || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2" data-testid="sentiment-title">Sentiment Analysis</h1>
        <p className="text-gray-600">Classify text polarity and emotion</p>
      </div>

      <Card className="glass mb-6">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Textarea
              placeholder="Enter text to analyze sentiment..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={8}
              className="resize-none"
              data-testid="sentiment-text-input"
            />
            <Button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
              data-testid="sentiment-submit-btn"
            >
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</>
              ) : (
                <><Smile className="mr-2 h-4 w-4" /> Analyze Sentiment</>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && result.success && (
        <Card className="glass fade-in" data-testid="sentiment-results">
          <CardHeader>
            <CardTitle>Sentiment Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 whitespace-pre-wrap">{result.sentiment}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SentimentAnalysis;
