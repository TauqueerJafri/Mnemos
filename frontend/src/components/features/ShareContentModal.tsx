import { useState } from 'react';
import { Copy, Check, Link as LinkIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { typeConfig, type ContentType } from '../../utils/contentConfig';

interface ShareContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  link: string;
  type: ContentType;
}

export function ShareContentModal({ isOpen, onClose, title, link, type }: ShareContentModalProps) {
  const [copied, setCopied] = useState(false);

  const config = typeConfig[type] || typeConfig.links;
  const Icon = config.icon;

  function handleCopy() {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Modal isOpen={isOpen} onClose={() => { setCopied(false); onClose(); }} title="Share Link">
      {/* Content Preview */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 flex items-center gap-4 mb-6">
        <div className="p-3 bg-[#111111] rounded-xl border border-gray-800 shrink-0">
          <Icon className="w-5 h-5 text-gray-400" />
        </div>
        <div className="min-w-0">
          <h3 className="text-white font-semibold truncate">{title}</h3>
          <p className="text-gray-500 text-sm">{config.label}</p>
        </div>
      </div>

      {/* Link Section */}
      <div className="mb-8">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Link</label>
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 flex items-center gap-3">
          <LinkIcon className="w-4 h-4 text-gray-500 shrink-0" />
          <span className="text-gray-300 text-sm truncate select-all">{link}</span>
        </div>
      </div>

      {/* Action Button */}
      <Button
        variant="primary"
        className="w-full py-3.5 text-base font-bold"
        onClick={handleCopy}
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        {copied ? 'Copied!' : 'Copy Link'}
      </Button>
    </Modal>
  );
}
