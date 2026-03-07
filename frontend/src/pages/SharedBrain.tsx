import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Brain, Loader2, ArrowLeft } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Logo } from '../components/ui/Logo';
import { api, BACKEND_URL } from '../config';
import type { ContentType } from '../utils/contentConfig';
import { itemCounter } from '../utils/counter';

interface SharedContent {
  _id: string;
  title: string;
  link: string;
  type: ContentType;
  tags: string[];
}

interface SharedBrainData {
  email: string;
  content: SharedContent[];
}

export default function SharedBrain() {
  const { hash } = useParams<{ hash: string }>();
  const [data, setData] = useState<SharedBrainData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchSharedBrain() {
      try {
        const res = await api.get(`${BACKEND_URL}/api/v1/brain/${hash}`);
        setData(res.data);
      } catch {
        setError('This shared brain was not found or is no longer available.');
      } finally {
        setLoading(false);
      }
    }
    fetchSharedBrain();
  }, [hash]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-400">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading shared brain...</span>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="p-4 bg-[#111111] rounded-2xl border border-gray-800 inline-block mb-6">
            <Brain className="w-10 h-10 text-gray-600" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Brain Not Found</h1>
          <p className="text-gray-400 mb-8">{error}</p>
          <Link
            to="/home"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white rounded-lg font-medium transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans text-gray-100 selection:bg-blue-500/30">
      {/* Background glow */}
      <div className="fixed top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 border-b border-gray-800/50 bg-[#0a0a0a]/80 backdrop-blur-md z-20">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <Link to="/home">
            <Logo size="sm" />
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg transition-all"
          >
            Open Your Brain
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-8 py-8 relative z-10">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">Shared Brain</h1>
          <p className="text-gray-500 text-sm">
            Shared by {data.email} · {itemCounter(data.content.length, 'item')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.content.map((item) => (
            <Card
              key={item._id}
              title={item.title}
              link={item.link}
              type={item.type}
              tags={item.tags}
            />
          ))}
        </div>

        {data.content.length === 0 && (
          <div className="text-center py-20">
            <Brain className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500">This brain is empty.</p>
          </div>
        )}
      </main>
    </div>
  );
}
