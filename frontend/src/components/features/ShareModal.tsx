import { Share2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShareModal({ isOpen, onClose }: ShareModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Your Brain">
      <p className="text-gray-400 mb-8 leading-relaxed">
        Share your entire collection of notes, documents, tweets, and videos with others. They'll be able to import your content into their own Second Brain.
      </p>
      
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Public Link</span>
          <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded">Anyone with link</span>
        </div>
        <div className="flex gap-2">
          <input type="text" readOnly value="https://mnemos.app/share/b8x9..." className="flex-1 bg-[#111111] border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none" />
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-colors border border-gray-800">Copy</button>
        </div>
      </div>

      <Button variant="primary" className="w-full py-3.5 text-base font-bold">
        <Share2 className="w-5 h-5" />
        Publish to Web
      </Button>
    </Modal>
  );
}
