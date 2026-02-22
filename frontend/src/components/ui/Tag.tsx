import React from 'react';

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  color?: 'cyan' | 'purple' | 'blue';
}

export function Tag({ children, color = 'cyan', className = '', ...props }: TagProps) {
  const colors = {
    cyan: "text-cyan-400/80 border-cyan-500/10 hover:border-cyan-500/30 hover:text-cyan-400",
    purple: "text-purple-400/80 border-purple-500/10 hover:border-purple-500/30 hover:text-purple-400",
    blue: "text-blue-400/80 border-blue-500/10 hover:border-blue-500/30 hover:text-blue-400"
  };

  return (
    <span 
      className={`px-2.5 py-1 bg-[#1a1a1a] text-xs rounded-md font-medium border cursor-pointer transition-colors ${colors[color]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
