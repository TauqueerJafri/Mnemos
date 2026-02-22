import React from 'react';
import { Bell, Share2, Plus, Menu } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeaderProps {
  onShareClick: () => void;
}

export function Header({ onShareClick }: HeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between p-6 sm:p-8 relative z-10 gap-4">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 text-gray-400 hover:text-white transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">All Notes</h1>
          <p className="text-gray-500 text-sm">You have 281 items in your brain.</p>
        </div>
      </div>
      <div className="flex items-center gap-4 self-end sm:self-auto">
        <button className="p-2 text-gray-400 hover:text-white transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-500 rounded-full border-2 border-[#0a0a0a]"></span>
        </button>
        <div className="h-6 w-px bg-gray-800"></div>
        <Button variant="secondary" onClick={onShareClick} className="hidden sm:flex">
          <Share2 className="w-4 h-4" />
          Share Brain
        </Button>
        <Button variant="primary">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Content</span>
        </Button>
      </div>
    </header>
  );
}
