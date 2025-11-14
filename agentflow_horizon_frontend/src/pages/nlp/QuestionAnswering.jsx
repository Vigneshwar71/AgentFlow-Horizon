import React, { useState } from 'react';
import axios from 'axios';
import { MessageSquare, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import MarkdownRenderer from '@/components/MarkdownRenderer';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const QuestionAnswering = () => {
  const [context, setContext] = useState('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnswer = async () => {
    if (!context.trim()) {
      toast.error('Please enter context');
      return;
    }
    if (!question.trim()) {
      toast.error('Please enter a question');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API}/nlp/qna`, { context, question });
      setResult(response.data);
      if (response.data.success) {
        toast.success('Question answered successfully');
      }
    } catch (error) {
      toast.error('QnA failed: ' + (error.response?.data?.detail || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2" data-testid="qna-title">Question Answering</h1>
        <p className="text-gray-600">Answer questions based on provided context</p>
      </div>

      <Card className="glass mb-6">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Context</label>
              <Textarea
                placeholder="Enter the context paragraph..."
                value={context}
                onChange={(e) => setContext(e.target.value)}
                rows={6}
                className="resize-none"
                data-testid="qna-context-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
              <Input
                placeholder="Enter your question..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                data-testid="qna-question-input"
              />
            </div>
            <Button
              onClick={handleAnswer}
              disabled={loading}
              className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
              data-testid="qna-submit-btn"
            >
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Answering...</>
              ) : (
                <><MessageSquare className="mr-2 h-4 w-4" /> Get Answer</>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && result.success && (
        <Card className="glass fade-in" data-testid="qna-results">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>💡</span>
              <span>Answer</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MarkdownRenderer content={result.answer} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuestionAnswering;
