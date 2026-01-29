'use client';

import React, { useState, useEffect } from 'react';
import { getInvitationRequests } from '../actions/invitation-actions';
import { Eye, EyeOff, LogOut } from 'lucide-react';

interface InvitationRequest {
  email: string;
  full_name: string;
  referral_source: string;
  requested_at: string;
}

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [requests, setRequests] = useState<InvitationRequest[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if already authenticated in session
    const auth = sessionStorage.getItem('admin_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchRequests();
    }
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    const result = await getInvitationRequests();
    if (result.success) {
      setRequests(result.data);
    }
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Simple authentication check
    const response = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      sessionStorage.setItem('admin_authenticated', 'true');
      setIsAuthenticated(true);
      fetchRequests();
    } else {
      setError('Invalid username or password');
      setPassword('');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    setRequests([]);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Admin Access</h1>
              <p className="text-slate-600">Sign in to view invitation requests</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 outline-none transition-all text-slate-900"
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 outline-none transition-all text-slate-900 pr-12"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-md hover:shadow-lg"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Invitation Requests</h1>
            <p className="text-sm text-slate-600 mt-1">Manage and review invitation requests</p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block w-8 h-8 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin"></div>
              <p className="text-slate-600 mt-4">Loading requests...</p>
            </div>
          ) : requests.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-slate-600">No invitation requests yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {requests.map((request) => (
                    <tr key={request.email} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-slate-900 font-medium">
                        {request.full_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {request.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                          {request.referral_source}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(request.requested_at).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Stats */}
        {requests.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <p className="text-sm text-slate-600">Total Requests</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{requests.length}</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <p className="text-sm text-slate-600">Latest Request</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {new Date(requests[0].requested_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <p className="text-sm text-slate-600">Top Source</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {requests.reduce((acc, curr) => {
                  acc[curr.referral_source] = (acc[curr.referral_source] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)[Object.keys(requests.reduce((acc, curr) => {
                  acc[curr.referral_source] = (acc[curr.referral_source] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)).reduce((a, b) => 
                  requests.reduce((acc, curr) => {
                    acc[curr.referral_source] = (acc[curr.referral_source] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)[a] > requests.reduce((acc, curr) => {
                    acc[curr.referral_source] = (acc[curr.referral_source] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)[b] ? a : b
                )] || 0} {Object.keys(requests.reduce((acc, curr) => {
                  acc[curr.referral_source] = (acc[curr.referral_source] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)).reduce((a, b) => 
                  requests.reduce((acc, curr) => {
                    acc[curr.referral_source] = (acc[curr.referral_source] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)[a] > requests.reduce((acc, curr) => {
                    acc[curr.referral_source] = (acc[curr.referral_source] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)[b] ? a : b
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
