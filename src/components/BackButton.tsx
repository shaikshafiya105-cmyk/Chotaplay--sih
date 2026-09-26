'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  href: string;
  label?: string;
  className?: string;
}

export function BackButton({ href, label = 'Back', className = '' }: BackButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-white hover:bg-[#EAF6FC] text-[#1E4FA3] font-semibold text-sm md:text-base border-2 border-[#2D9CDB] shadow-sm hover:shadow transition-all duration-200 active:scale-95 ${className}`}
      aria-label={`Back to ${label}`}
    >
      <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-[#1E4FA3] stroke-[2.5]" />
      <span>{label}</span>
    </Link>
  );
}
