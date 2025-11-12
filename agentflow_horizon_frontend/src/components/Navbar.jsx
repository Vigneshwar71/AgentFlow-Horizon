import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, Activity } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="glass border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group" data-testid="navbar-logo">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AgentFlow
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              to="/health"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === '/health'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              data-testid="navbar-health"
            >
              <Activity className="h-4 w-4" />
              <span>System Health</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
