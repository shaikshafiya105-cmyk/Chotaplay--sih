'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function TeacherEntryPage() {
  return (
    <main className="min-h-screen bg-[#EAF6FC] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      
      {/* Teacher Entry Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 max-w-lg w-full shadow-chota-lg border border-[#2D9CDB]/30 flex flex-col items-center text-center space-y-6 animate-in zoom-in-95 duration-300">
        
        {/* Plain ChotaPlay Logo (No background box) */}
        <div className="h-16 flex items-center justify-center">
          <Image
            src="/assets/logo.png"
            alt="ChotaPlay Logo"
            width={180}
            height={60}
            className="h-14 w-auto object-contain"
            priority
          />
        </div>

        <div>
          <h1 className="font-fredoka text-3xl sm:text-4xl font-bold text-[#1E4FA3]">
            Welcome to ChotaPlay
          </h1>
        </div>

        {/* Teacher Illustration */}
        <div className="relative w-48 h-48 rounded-3xl overflow-hidden bg-[#FFE8D6] border-2 border-[#FF7A30]/30 flex items-center justify-center p-2 shadow-inner">
          <Image
            src="/assets/teacher.png"
            alt="Teacher Portal"
            fill
            className="object-contain p-2"
          />
        </div>

        {/* Single Teacher Entry Action -> Advances to Teacher Login (No Bypass) */}
        <div className="w-full pt-2">
          <Link
            href="/login"
            className="w-full py-4 px-8 rounded-full bg-[#FF7A30] hover:bg-[#E85D04] text-white font-fredoka text-xl font-bold shadow-chota-hover transition-all active:scale-95 flex items-center justify-center gap-3 group border-2 border-white"
          >
            <span>Proceed to Login</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </main>
  );
}
