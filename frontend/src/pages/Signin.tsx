import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { Logo } from '../components/ui/Logo';
import { useState } from 'react';
import { api, BACKEND_URL } from '../config';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function signin() {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setError(''); // Clear previous errors
    setLoading(true);
    
    try {
      await api.post(`${BACKEND_URL}/api/v1/signin`, {
        email,
        password
      });

      navigate('/dashboard');
    } catch (e: any) {
      setError(e.response?.data?.message || 'Signin failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-64 bg-linear-to-b from-blue-500/10 to-transparent pointer-events-none" />
      
      <div className="w-full max-w-sm flex flex-col items-center relative z-10">
        <div className="w-full mt-4 flex flex-col items-center">
          <div className="flex justify-center w-full -mt-8 mb-2">
            <Link to="/home"><Logo hideText size="lg" /></Link>
          </div>
          <h1 className="text-3xl font-semibold text-white mb-3 tracking-tight text-center">Sign in to your account</h1>
          <Link to="/signup" className="text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2 text-sm mb-10 group">
            Don't have an account? Sign-up <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          {error && (
            <p className="text-red-400 text-sm text-center mb-2">{error}</p>
          )}
          <form className="w-full space-y-5" onSubmit={(e) => { e.preventDefault(); signin(); }}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 block text-left">Email</label>
              <Input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email" 
                placeholder="you@example.com" 
                name="email"
                disabled={loading}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 block text-left">Password</label>
              <Input 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password" 
                placeholder="Password" 
                name="password"
                disabled={loading}
                className="w-full"
              />
            </div>

            <div className="flex justify-end pt-1">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Forgot password?
              </a>
            </div>

            <Button disabled={loading} type="submit" className="w-full mt-2 py-2.5 text-base font-medium">
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
