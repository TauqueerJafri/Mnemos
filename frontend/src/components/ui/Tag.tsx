import React from 'react';

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  color?: 'blueLight' | 'blue' | 'blueDeep';
}

export function Tag({ children, color = 'blue', className = '', ...props }: TagProps) {
  const colors = {
    blueLight: "text-blue-300/80 border-blue-400/10 hover:border-blue-400/30 hover:text-blue-300",
    blue: "text-blue-400/80 border-blue-500/10 hover:border-blue-500/30 hover:text-blue-400",
    blueDeep: "text-blue-500/80 border-blue-600/10 hover:border-blue-600/30 hover:text-blue-500"
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
