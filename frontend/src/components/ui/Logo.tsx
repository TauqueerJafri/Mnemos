import { Brain } from 'lucide-react';
import { useState, useRef } from 'react';

interface LogoProps {
  hideText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ hideText = false, size = 'md' }: LogoProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  const iconSizeClass = size === 'lg' ? 'w-8 h-8' : size === 'sm' ? 'w-5 h-5' : 'w-6 h-6';
  const paddingClass = size === 'lg' ? 'p-3' : size === 'sm' ? 'p-1.5' : 'p-2';
  const textSizeClass = size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-base' : 'text-2xl';
  const wrapperPadding = size === 'sm' ? 'py-0 px-0' : 'p-8';
  const roundingClass = size === 'sm' ? 'rounded-lg' : 'rounded-xl';
  const glowRadius = size === 'sm' ? 60 : 120;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!logoRef.current) return;
    const rect = logoRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const maskStyle = {
    maskImage: `radial-gradient(circle ${glowRadius}px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)`,
    WebkitMaskImage: `radial-gradient(circle ${glowRadius}px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)`,
  };

  return (
    <div 
      ref={logoRef}
      className={`${wrapperPadding} flex items-center ${size === 'sm' ? 'gap-2' : 'gap-4'} relative z-10 cursor-default`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base layer */}
      <div className={`${paddingClass} bg-blue-500/10 ${roundingClass} border border-blue-500/20 relative z-10`}>
        <Brain className={`${iconSizeClass} text-blue-400`} />
      </div>
      {!hideText && (
        <span className={`${textSizeClass} font-bold tracking-tight bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent relative z-10`}>Mnemos</span>
      )}

      {/* Glow layer */}
      <div 
        className={`absolute inset-0 ${wrapperPadding} flex items-center ${size === 'sm' ? 'gap-2' : 'gap-4'} pointer-events-none z-20 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        style={maskStyle}
      >
        <div className={`${paddingClass} bg-blue-400/20 ${roundingClass} border border-blue-400/50 shadow-[0_0_15px_rgba(96,165,250,0.5)]`}>
          <Brain className={`${iconSizeClass} text-blue-200 drop-shadow-[0_0_8px_rgba(191,219,254,0.8)]`} />
        </div>
        {!hideText && (
          <span className={`${textSizeClass} font-bold tracking-tight text-gray-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]`}>Mnemos</span>
        )}
      </div>
    </div>
  );
}
