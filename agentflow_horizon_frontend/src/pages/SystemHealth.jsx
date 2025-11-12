import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Activity, Database, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const SystemHealth = () => {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchHealth = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/health`);
      setHealth(response.data);
    } catch (error) {
      toast.error('Failed to fetch health status');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2" data-testid="health-title">System Health</h1>
        <p className="text-gray-600">Monitor system status and metrics</p>
      </div>

      <div className="mb-6">
        <Button onClick={fetchHealth} disabled={loading} data-testid="health-refresh-btn">
          {loading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...</>
          ) : (
            <><Activity className="mr-2 h-4 w-4" /> Refresh Status</>
          )}
        </Button>
      </div>

      {health && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 fade-in" data-testid="health-metrics">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span>System Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold capitalize">{health.status}</p>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-indigo-600">
                <Database className="h-5 w-5" />
                <span>ChromaDB Documents</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{health.chromadb_documents}</p>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-purple-600">
                <Clock className="h-5 w-5" />
                <span>Last Check</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{new Date(health.timestamp).toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SystemHealth;
