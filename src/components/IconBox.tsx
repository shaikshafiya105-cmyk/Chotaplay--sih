'use client';

import React from 'react';

interface IconBoxProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'yellow' | 'blue' | 'orange' | 'white' | 'gold';
  className?: string;
  shadow?: boolean;
}

export function IconBox({
  children,
  size = 'md',
  variant = 'yellow',
  className = '',
  shadow = true
}: IconBoxProps) {
  // Container size: desktop 40-56px, mobile 32-44px
  const sizeClasses = {
    sm: 'w-8 h-8 md:w-9 md:h-9 rounded-xl text-base',
    md: 'w-10 h-10 md:w-12 md:h-12 rounded-2xl text-xl',
    lg: 'w-12 h-12 md:w-14 md:h-14 rounded-2xl text-2xl',
    xl: 'w-14 h-14 md:w-16 md:h-16 rounded-3xl text-3xl'
  };

  const variantClasses = {
    yellow: 'bg-[#FFE9A8] text-[#1E4FA3] border border-[#FFE082]/60',
    blue: 'bg-[#EAF6FC] text-[#1E4FA3] border border-[#2D9CDB]/30',
    orange: 'bg-[#FFE8D6] text-[#FF7A30] border border-[#FF7A30]/30',
    white: 'bg-white text-[#1E4FA3] border border-[#EAF6FC]',
    gold: 'bg-[#FFF6DC] text-[#E8A317] border border-[#E8A317]/30'
  };

  const shadowClass = shadow ? 'shadow-sm' : '';

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 transition-transform duration-200 ${sizeClasses[size]} ${variantClasses[variant]} ${shadowClass} ${className}`}
    >
      <div className="flex items-center justify-center w-[60%] h-[60%]">
        {children}
      </div>
    </div>
  );
}
