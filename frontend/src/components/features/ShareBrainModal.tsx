import { useState } from 'react';
import { Share2, Copy, Check, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { api, BACKEND_URL } from '../../config';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemCount: number;
}

export function ShareModal({ isOpen, onClose, itemCount }: ShareModalProps) {
  const [hash, setHash] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const shareUrl = hash ? `${window.location.origin}/share/${hash}` : '';

  async function handleShare() {
    setError('');
    setLoading(true);
    try {
      const res = await api.post(`${BACKEND_URL}/api/v1/brain/share`, { share: true });
      setHash(res.data.hash);
    } catch {
      setError('Failed to generate share link. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleClose() {
    setHash(null);
    setError('');
    setCopied(false);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Share Your Brain">
      <p className="text-gray-400 mb-6 leading-relaxed">
        Generate a public link to share your entire collection of notes, documents, tweets, and videos.
      </p>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {hash ? (
        <>
          {/* Generated link display */}
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 mb-6">
            <div className="bg-[#111111] border border-gray-800 rounded-lg px-3 py-2.5 flex items-center justify-between gap-2">
              <span className="text-sm text-gray-300 truncate select-all">{shareUrl}</span>
              <button
                onClick={handleCopy}
                className="shrink-0 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white rounded-md text-xs font-medium transition-colors border border-gray-800"
              >
                {copied ? (
                  <span className="flex items-center gap-1.5"><Check className="w-3 h-3" /> Copied</span>
                ) : (
                  <span className="flex items-center gap-1.5"><Copy className="w-3 h-3" /> Copy</span>
                )}
              </button>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} will be shared
          </p>
        </>
      ) : (
        <>
          <Button
            variant="primary"
            className="w-full py-3.5 text-base font-bold"
            onClick={handleShare}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Share2 className="w-5 h-5" />
            )}
            {loading ? 'Generating link...' : 'Share Brain'}
          </Button>

          <p className="text-center text-sm text-gray-500 mt-4">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} will be shared
          </p>
        </>
      )}
    </Modal>
  );
}
