import { Link } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { Logo } from '../components/ui/Logo';

export default function Signup() {
  return (
    <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-64 bg-linear-to-b from-blue-500/10 to-transparent pointer-events-none" />
      <div className="w-full max-w-sm flex flex-col items-center relative z-10">
        <div className="w-full mt-4 flex flex-col items-center">
          <div className="flex justify-center w-full -mt-8 mb-2">
            <Logo hideText size="lg" />
          </div>
          <h1 className="text-3xl font-semibold text-white mb-3 tracking-tight text-center">Create an account</h1>
          <Link to="/signin" className="text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2 text-sm mb-10 group">
            Already have an account? Sign-in <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <form className="w-full space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 block text-left">Email</label>
              <Input 
                type="email" 
                placeholder="you@example.com" 
                name="username"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 block text-left">Password</label>
              <Input 
                type="password" 
                placeholder="Password" 
                name="password"
                className="w-full"
              />
            </div>

            <Button type="submit" className="w-full mt-6 py-2.5 text-base font-medium">
              Sign up
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
