import React, { useState } from 'react';
import axios from 'axios';
import { Tag, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const EntityExtraction = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleExtract = async () => {
    if (!text.trim()) {
      toast.error('Please enter text to analyze');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API}/nlp/entities`, { text });
      setResult(response.data);
      if (response.data.success) {
        toast.success('Entities extracted successfully');
      }
    } catch (error) {
      toast.error('Extraction failed: ' + (error.response?.data?.detail || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2" data-testid="entities-title">Entity Extraction</h1>
        <p className="text-gray-600">Detect and categorize named entities</p>
      </div>

      <Card className="glass mb-6">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Textarea
              placeholder="Enter text to extract entities..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={8}
              className="resize-none"
              data-testid="entities-text-input"
            />
            <Button
              onClick={handleExtract}
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700"
              data-testid="entities-submit-btn"
            >
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Extracting...</>
              ) : (
                <><Tag className="mr-2 h-4 w-4" /> Extract Entities</>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && result.success && (
        <Card className="glass fade-in" data-testid="entities-results">
          <CardHeader>
            <CardTitle>Extracted Entities</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 whitespace-pre-wrap">{result.entities}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EntityExtraction;
