import { useState } from 'react';
import { Plus, Tag } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { CONTENT_TYPES, type ContentType } from '../../utils/contentConfig';
import { api, BACKEND_URL } from '../../config';

interface AddContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContentAdded?: () => void;
}

export function AddContentModal({ isOpen, onClose, onContentAdded }: AddContentModalProps) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [type, setType] = useState<ContentType>('links');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function resetForm() {
    setTitle('');
    setLink('');
    setType('links');
    setTags('');
    setError('');
  }

  async function handleSubmit() {
    if (!title.trim() || !link.trim()) {
      setError('Title and link are required');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await api.post(`${BACKEND_URL}/api/v1/content`, {
        title: title.trim(),
        link: link.trim(),
        type,
      });
      resetForm();
      onContentAdded?.();
      onClose();
    } catch (e: any) {
      setError(e.response?.data?.message || 'Failed to add content. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={() => { resetForm(); onClose(); }} title="Add New Content">
      <div className="space-y-5">
        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}

        {/* Title Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Title</label>
          <Input 
            placeholder="Enter content title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Link Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Link</label>
          <Input 
            type="url"
            placeholder="https://..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Type Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Content Type</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {CONTENT_TYPES.map((t) => {
              const Icon = t.icon;
              const isSelected = type === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setType(t.id)}
                  disabled={loading}
                  className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                    isSelected 
                      ? 'bg-blue-500/10 border-blue-500/50 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
                      : 'bg-[#1a1a1a] border-gray-800 text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tags Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Tags (comma separated)</label>
          <Input 
            placeholder="productivity, tech, ideas" 
            icon={<Tag className="w-4 h-4" />}
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Footer */}
        <div className="pt-2 mt-8">
          <Button 
            type="button" 
            variant="primary" 
            className="w-full py-3.5 text-base font-bold relative z-10"
            onClick={handleSubmit}
            disabled={loading}
          >
            <Plus className="w-5 h-5" />
            {loading ? 'Adding...' : 'Add Content'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
