
import { X } from 'lucide-react';
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-[#111111] border border-blue-500/30 rounded-2xl p-8 max-w-md w-full shadow-[0_8px_30px_rgba(255,255,255,0.05)] relative overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 to-blue-700" />
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none" />

        {/* Header */}
        <div className="flex justify-between items-center mb-6 relative z-10">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
