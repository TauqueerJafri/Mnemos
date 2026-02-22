import React from 'react';
import { Brain, Twitter, Youtube, FileText, Link as LinkIcon, Search, Settings } from 'lucide-react';
import { Input } from '../ui/Input';

export function Sidebar() {
  return (
    <aside className="hidden md:flex w-72 bg-[#111111] border-r border-gray-800/50 flex-col relative overflow-hidden shrink-0">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none" />
      
      <div className="p-8 flex items-center gap-4 relative z-10">
        <div className="p-2 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
          <Brain className="w-6 h-6 text-cyan-400" />
        </div>
        <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Mnemos</span>
      </div>
      
      <div className="px-6 mb-6">
        <Input 
          icon={<Search className="w-4 h-4" />} 
          placeholder="Search your brain..." 
        />
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2 mt-4">Sources</div>
        {[
          { icon: Twitter, label: 'Tweets', count: 24 },
          { icon: Youtube, label: 'Videos', count: 12 },
          { icon: FileText, label: 'Documents', count: 89 },
          { icon: LinkIcon, label: 'Links', count: 156 },
        ].map((item, i) => (
          <a key={i} href="#" className="flex items-center justify-between px-4 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all group">
            <div className="flex items-center gap-3">
              <item.icon className="w-4 h-4 group-hover:text-cyan-400 transition-colors" />
              <span className="font-medium">{item.label}</span>
            </div>
            <span className="text-xs bg-[#1a1a1a] px-2 py-1 rounded-md text-gray-500 group-hover:text-gray-300">{item.count}</span>
          </a>
        ))}

        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2 mt-8">Tags</div>
        <div className="px-4 flex flex-wrap gap-2">
          {['#productivity', '#ideas', '#learning', '#design', '#code'].map(tag => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-[#1a1a1a] border border-gray-800 text-gray-400 hover:border-cyan-500/30 hover:text-cyan-400 cursor-pointer transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-800/50">
        <div className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 p-[2px]">
            <div className="w-full h-full bg-[#111111] rounded-full border-2 border-transparent" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">User Account</p>
            <p className="text-xs text-gray-500 truncate">Pro Plan</p>
          </div>
          <Settings className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </aside>
  );
}
