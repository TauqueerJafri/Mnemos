import { Search, Settings, User, LogOut, Construction } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Input } from '../ui/Input';
import { Logo } from '../ui/Logo';
import { typeConfig, type ContentType } from '../../utils/contentConfig';
import { api, BACKEND_URL } from '../../config';

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({ open = false, onClose }: SidebarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(null);
  const navigate = useNavigate();

  const showBetaToast = useCallback(() => {
    if (toast) return;
    setToast(true);
    toastTimer.current = setTimeout(() => setToast(false), 3000);
  }, [toast]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  async function handleLogout() {
    try {
      await api.post(`${BACKEND_URL}/api/v1/logout`);
    } catch {
      // proceed even if the call fails
    }
    navigate('/signin');
  }

  return (
    <>
      {/* Overlay backdrop for mobile/medium */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#111111] border-r border-gray-800/50 flex flex-col overflow-hidden shrink-0
        transform transition-transform duration-200 ease-in-out
        lg:relative lg:translate-x-0 lg:flex
        ${open ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-blue-500/10 to-transparent pointer-events-none" />

      <Logo />
      
      <div className="px-6 mb-6" onClick={showBetaToast}>
        <Input 
          icon={<Search className="w-4 h-4" />} 
          placeholder="Search your brain..."
          readOnly
          className="cursor-pointer"
        />
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2 mt-4">Sources</div>
        {(Object.keys(typeConfig) as ContentType[]).map((key) => {
          const { icon: Icon, label } = typeConfig[key];
          return (
            <a key={key} href="#" onClick={(e) => { e.preventDefault(); showBetaToast(); }} className="flex items-center justify-between px-4 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all group">
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
            <span key={tag} onClick={showBetaToast} className="text-xs px-2.5 py-1 rounded-full bg-[#1a1a1a] border border-gray-800 text-gray-400 hover:border-blue-500/30 hover:text-blue-400 cursor-pointer transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-800/50 relative" ref={menuRef}>
        {menuOpen && (
          <div className="absolute bottom-full right-4 mb-2 w-48 bg-[#1a1a1a] border border-gray-800 rounded-lg shadow-xl overflow-hidden">
            <button className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-400 cursor-default">
              <User className="w-4 h-4" />
              <span>Profile</span>
              <span className="ml-auto text-xs text-gray-600 bg-gray-800 px-2 py-0.5 rounded-full">Soon</span>
            </button>
            <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors">
          <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-500 to-blue-700 p-0.5 cursor-pointer" onClick={showBetaToast}>
            <div className="w-full h-full bg-[#111111] rounded-full border-2 border-transparent" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">User Account</p>
            <p className="text-xs text-gray-500 truncate">Pro Plan</p>
          </div>
          <Settings className={`w-4 h-4 text-gray-500 cursor-pointer hover:text-white transition-all ${menuOpen ? 'rotate-90' : ''}`} onClick={() => setMenuOpen(prev => !prev)} />
        </div>
      </div>
    </aside>

    {toast && createPortal(
      <div className="fixed bottom-6 right-6 z-100 flex items-center gap-3 px-5 py-3 bg-[#1a1a1a] border border-amber-500/30 rounded-lg shadow-lg shadow-amber-500/10 animate-[slideUp_0.3s_ease-out]">
        <Construction className="w-5 h-5 text-amber-400 shrink-0" />
        <p className="text-sm text-amber-300">This feature is currently in development. Stay tuned!</p>
      </div>,
      document.body
    )}
    </>
  );
}
