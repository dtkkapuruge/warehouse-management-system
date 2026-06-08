'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Package, Lock } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        router.push('/');
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch {
      setError('Server connection failed. Is the website backend running?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
        <div className="mx-auto h-20 w-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 mb-6">
          <Package className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-center text-4xl font-extrabold text-slate-900 tracking-tight">Admin Login</h2>
        <p className="mt-2 text-slate-500 text-sm">Sign in to manage warehouse operations</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-10 px-8 shadow-2xl sm:rounded-3xl border border-slate-100">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Username</label>
              <input 
                type="text" required 
                value={username} onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-3 text-slate-900 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-slate-50 focus:bg-white" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <input 
                type="password" required 
                value={password} onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 text-slate-900 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-slate-50 focus:bg-white" 
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center font-medium border border-red-100">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full flex justify-center items-center py-4 px-4 rounded-xl shadow-lg hover:shadow-blue-500/40 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all disabled:opacity-70 mt-4"
            >
              {isLoading ? 'Signing in...' : <><Lock className="w-4 h-4 mr-2" /> Secure Sign In</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
