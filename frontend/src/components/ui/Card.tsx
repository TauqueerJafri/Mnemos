import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverColor?: 'blueLight' | 'blue' | 'blueDeep';
}

export function Card({ children, hoverColor = 'blue', className = '', ...props }: CardProps) {
  const hoverColors = {
    blueLight: "hover:border-blue-400/30 from-blue-300 to-blue-500",
    blue: "hover:border-blue-500/30 from-blue-400 to-blue-600",
    blueDeep: "hover:border-blue-600/30 from-blue-500 to-blue-700"
  };

  return (
    <div 
      className={`group bg-[#111111] p-6 rounded-2xl border border-gray-800 transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col ${hoverColors[hoverColor].split(' ')[0]} ${className}`}
      {...props}
    >
      <div className={`absolute top-0 left-0 w-full h-1 bg-linear-to-r ${hoverColors[hoverColor].split(' ').slice(1).join(' ')} opacity-0 group-hover:opacity-100 transition-opacity`} />
      {children}
    </div>
  );
}
