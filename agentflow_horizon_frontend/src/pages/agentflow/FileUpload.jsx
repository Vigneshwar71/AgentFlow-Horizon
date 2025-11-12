import React, { useState } from 'react';
import axios from 'axios';
import { Upload, Loader2, CheckCircle, FileText, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [documentUploaded, setDocumentUploaded] = useState(false);
  const [query, setQuery] = useState('');
  const [queryLoading, setQueryLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileSize = selectedFile.size;
      const maxSize = 10 * 1024 * 1024; // 10MB

      if (fileSize > maxSize) {
        toast.error('File size exceeds 10MB limit');
        return;
      }

      const fileType = selectedFile.name.toLowerCase();
      if (!fileType.endsWith('.pdf') && !fileType.endsWith('.txt')) {
        toast.error('Only PDF and TXT files are supported');
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${API}/documents/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setResult(response.data);
      if (response.data.success) {
        toast.success('File uploaded and indexed successfully');
        setDocumentUploaded(true);
      }
    } catch (error) {
      toast.error('Upload failed: ' + (error.response?.data?.detail || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleQuery = async () => {
    if (!query.trim()) {
      toast.error('Please enter a question');
      return;
    }

    if (!documentUploaded) {
      toast.error('Please upload a document first');
      return;
    }

    setQueryLoading(true);
    try {
      const response = await axios.post(`${API}/documents/query`, { query });
      
      // Add to chat history
      setChatHistory(prev => [...prev, {
        type: 'question',
        content: query
      }, {
        type: 'answer',
        content: response.data.answer,
        confidence: response.data.confidence_score
      }]);
      
      setQuery('');
      
      if (response.data.success) {
        toast.success('Question answered successfully');
      } else {
        toast.warning(response.data.message || 'Could not answer question');
      }
    } catch (error) {
      toast.error('Query failed: ' + (error.response?.data?.detail || error.message));
    } finally {
      setQueryLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2" data-testid="upload-title">Chat with Documents (ChatPDF-like)</h1>
        <p className="text-gray-600">Upload PDF or TXT files and ask questions about them using Google ADK</p>
      </div>

      <Card className="glass mb-6">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
              <input
                type="file"
                accept=".pdf,.txt"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                data-testid="file-input"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">
                  {file ? file.name : 'Click to upload or drag and drop'}
                </p>
                <p className="text-sm text-gray-500">PDF or TXT (max 10MB)</p>
              </label>
            </div>

            {file && (
              <div className="flex items-center space-x-2 p-4 bg-blue-50 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-blue-900">{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
              </div>
            )}

            <Button
              onClick={handleUpload}
              disabled={loading || !file}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
              data-testid="upload-submit-btn"
            >
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...</>
              ) : (
                <><Upload className="mr-2 h-4 w-4" /> Upload & Index</>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && result.success && (
        <Card className="glass fade-in mb-6" data-testid="upload-results">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Upload Successful</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm"><span className="font-medium">Document ID:</span> {result.document_id}</p>
              <p className="text-sm"><span className="font-medium">Filename:</span> {result.filename}</p>
              <p className="text-sm"><span className="font-medium">Characters:</span> {result.char_count.toLocaleString()}</p>
              <p className="text-sm text-green-600">{result.message}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Chat Interface - Only show after document is uploaded */}
      {documentUploaded && (
        <div className="space-y-6 fade-in">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Ask Questions About Your Document</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Chat History */}
              {chatHistory.length > 0 && (
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto" data-testid="chat-history">
                  {chatHistory.map((item, idx) => (
                    <div key={idx} className={item.type === 'question' ? 'text-right' : 'text-left'}>
                      {item.type === 'question' ? (
                        <div className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg max-w-2xl">
                          <p className="text-sm">{item.content}</p>
                        </div>
                      ) : (
                        <div className="inline-block bg-gray-100 px-4 py-2 rounded-lg max-w-2xl">
                          <p className="text-sm text-gray-800 whitespace-pre-wrap">{item.content}</p>
                          {item.confidence && (
                            <p className="text-xs text-gray-500 mt-2">Confidence: {(item.confidence * 100).toFixed(0)}%</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Query Input */}
              <div className="flex space-x-2">
                <Input
                  placeholder="Ask a question about your document..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleQuery()}
                  disabled={queryLoading}
                  data-testid="document-query-input"
                />
                <Button
                  onClick={handleQuery}
                  disabled={queryLoading}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  data-testid="document-query-btn"
                >
                  {queryLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </Button>
              </div>

              {chatHistory.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                  <p>Start asking questions about your document!</p>
                  <p className="text-sm mt-2">Powered by Google ADK + ChromaDB RAG</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
