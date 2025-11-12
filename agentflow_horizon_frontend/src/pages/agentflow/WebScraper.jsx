import React, { useState } from 'react';
import axios from 'axios';
import { Globe, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const WebScraper = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleScrape = async () => {
    if (!url.trim()) {
      toast.error('Please enter a URL');
      return;
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      toast.error('Please enter a valid URL starting with http:// or https://');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API}/agentflow/web-scrape`, { url });
      setResult(response.data);
      if (response.data.success) {
        toast.success('Content scraped and summarized successfully');
      } else {
        toast.error(response.data.message || 'Failed to scrape content');
      }
    } catch (error) {
      toast.error('Scraping failed: ' + (error.response?.data?.detail || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2" data-testid="scraper-title">Web Content Scraper</h1>
        <p className="text-gray-600">Extract and summarize content from any webpage</p>
      </div>

      <Card className="glass mb-6">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Input
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              data-testid="scraper-url-input"
            />
            <Button
              onClick={handleScrape}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              data-testid="scraper-submit-btn"
            >
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Scraping...</>
              ) : (
                <><Globe className="mr-2 h-4 w-4" /> Scrape & Summarize</>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && result.success && (
        <div className="space-y-6 fade-in" data-testid="scraper-results">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap">{result.summary}</p>
            </CardContent>
          </Card>

          {result.content && (
            <Card className="glass">
              <CardHeader>
                <CardTitle>Content Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{result.content}</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default WebScraper;
