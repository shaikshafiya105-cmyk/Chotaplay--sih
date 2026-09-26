'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Home',
      href: '/home',
      iconSrc: '/assets/Home icon.png',
      isActive: pathname === '/home' || pathname.startsWith('/class')
    },
    {
      name: 'Explore',
      href: '/explore',
      iconSrc: '/assets/Explore icon.jpeg',
      isActive: pathname.startsWith('/explore')
    },
    {
      name: 'Teacher Profile',
      href: '/profile',
      iconSrc: '/assets/Teacher icon.jpeg',
      isActive: pathname.startsWith('/profile')
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#2D9CDB]/20 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left: SUPPLIED CHOTAPLAY LOGO + WORDMARK LOCKUP */}
        <Link href="/home" className="flex items-center gap-2.5 transition-transform hover:scale-105 active:scale-95">
          <Image
            src="/assets/logo.png"
            alt="ChotaPlay Logo"
            width={44}
            height={44}
            className="h-10 sm:h-11 w-auto object-contain"
            priority
          />
          <Image
            src="/assets/word.png"
            alt="ChotaPlay"
            width={120}
            height={36}
            className="h-7 sm:h-8 w-auto object-contain"
            priority
          />
        </Link>

        {/* Right: Primary Navigation with Supplied Icons */}
        <nav className="flex items-center gap-2 sm:gap-3 md:gap-4">
          {navItems.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-2.5 px-3.5 py-2 md:px-5 md:py-2.5 rounded-full font-bold text-xs sm:text-sm md:text-base transition-all duration-200 active:scale-95 ${
                item.isActive
                  ? 'bg-[#FFE8D6] text-[#FF7A30] border-2 border-[#FF7A30] shadow-xs'
                  : 'bg-white text-[#1B5E7A] hover:bg-[#EAF6FC] border-2 border-transparent'
              }`}
            >
              {/* Supplied Icon Asset */}
              <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-lg overflow-hidden shrink-0">
                <Image
                  src={item.iconSrc}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="hidden sm:inline font-fredoka font-semibold tracking-wide">
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
