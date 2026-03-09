import { Bell, Share2, Plus, Menu } from 'lucide-react';
import { Button } from '../ui/Button';
import { itemCounter } from '../../utils/counter';

interface HeaderProps {
  onShareClick: () => void;
  onAddClick?: () => void;
  itemCount?: number;
  onMenuClick?: () => void;
}

export function Header({ onShareClick, onAddClick, itemCount = 0, onMenuClick }: HeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between py-6 sm:py-8 relative z-10 gap-4">
      <div className="flex items-center gap-3">
        <button className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors" onClick={onMenuClick}>
          <Menu className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">All Notes</h1>
          <p className="text-gray-500 text-sm">You have {itemCounter(itemCount, 'item')} in your brain.</p>
        </div>
      </div>
      <div className="flex items-center gap-4 self-end sm:self-auto">
        <button className="p-2 text-gray-400 hover:text-white transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#0a0a0a]"></span>
        </button>
        <div className="h-6 w-px bg-gray-800"></div>
        <Button variant="secondary" onClick={onShareClick}>
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Share Brain</span>
        </Button>
        <Button variant="primary" onClick={onAddClick}>
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Content</span>
        </Button>
      </div>
    </header>
  );
}
