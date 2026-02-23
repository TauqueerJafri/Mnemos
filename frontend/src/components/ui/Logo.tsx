import { Brain } from 'lucide-react';
import { useState, useRef } from 'react';

export function Logo() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!logoRef.current) return;
    const rect = logoRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div 
      ref={logoRef}
      className="p-8 flex items-center gap-4 relative z-10 cursor-default"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base layer */}
      <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/20 relative z-10">
        <Brain className="w-6 h-6 text-blue-400" />
      </div>
      <span className="text-2xl font-bold tracking-tight bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent relative z-10">Mnemos</span>

      {/* Glow layer */}
      {isHovered && (
        <div 
          className="absolute inset-0 p-8 flex items-center gap-4 pointer-events-none z-20 transition-opacity duration-300"
          style={{
            maskImage: `radial-gradient(circle 120px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle 120px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)`,
          }}
        >
          <div className="p-2 bg-blue-400/20 rounded-xl border border-blue-400/50 shadow-[0_0_15px_rgba(96,165,250,0.5)]">
            <Brain className="w-6 h-6 text-blue-200 drop-shadow-[0_0_8px_rgba(191,219,254,0.8)]" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-gray-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">Mnemos</span>
        </div>
      )}
    </div>
  );
}
