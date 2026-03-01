import { Search, Settings } from 'lucide-react';
import { Input } from '../ui/Input';
import { Logo } from '../ui/Logo';
import { typeConfig, type ContentType } from '../../utils/contentConfig';

export function Sidebar() {
  return (
    <aside className="hidden md:flex w-72 bg-[#111111] border-r border-gray-800/50 flex-col relative overflow-hidden shrink-0">
      <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-blue-500/10 to-transparent pointer-events-none" />
      
      <Logo />
      
      <div className="px-6 mb-6">
        <Input 
          icon={<Search className="w-4 h-4" />} 
          placeholder="Search your brain..." 
        />
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2 mt-4">Sources</div>
        {(Object.keys(typeConfig) as ContentType[]).map((key) => {
          const { icon: Icon, label } = typeConfig[key];
          return (
            <a key={key} href="#" className="flex items-center justify-between px-4 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all group">
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                <span className="font-medium">{label}s</span>
              </div>
            </a>
          );
        })}

        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2 mt-8">Tags</div>
        <div className="px-4 flex flex-wrap gap-2">
          {['#productivity', '#ideas', '#learning', '#design', '#code'].map(tag => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-[#1a1a1a] border border-gray-800 text-gray-400 hover:border-blue-500/30 hover:text-blue-400 cursor-pointer transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-800/50">
        <div className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-500 to-blue-700 p-0.5">
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
