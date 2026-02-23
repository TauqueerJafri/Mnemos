import { Share2, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShareModal({ isOpen, onClose }: ShareModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-md">
      <div className="bg-[#111111] border border-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 to-blue-700" />
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none" />
        
        <div className="flex justify-between items-center mb-6 relative z-10">
          <h2 className="text-2xl font-bold text-white">Share Your Brain</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-gray-400 mb-8 leading-relaxed relative z-10">
          Share your entire collection of notes, documents, tweets, and videos with others. They'll be able to import your content into their own Second Brain.
        </p>
        
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 mb-8 relative z-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Public Link</span>
            <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded">Anyone with link</span>
          </div>
          <div className="flex gap-2">
            <input type="text" readOnly value="https://mnemos.app/share/b8x9..." className="flex-1 bg-[#111111] border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none" />
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-colors border border-gray-800">Copy</button>
          </div>
        </div>

        <Button variant="primary" className="w-full py-3.5 text-base font-bold relative z-10">
          <Share2 className="w-5 h-5" />
          Publish to Web
        </Button>
      </div>
    </div>
  );
}
