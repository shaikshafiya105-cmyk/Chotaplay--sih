'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Header } from '@/components/Header';
import { AuthGuard } from '@/components/AuthGuard';
import { CLASSES, TOPICS } from '@/data/curriculum';
import { useApp } from '@/context/AppContext';

export default function HomePage() {
  // Classroom levels: Exactly LKG, UKG, 1st Class (Explore card removed from Home)
  const classroomLevels = CLASSES.filter(c => c.id !== 'explore');

  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col bg-[#EAF6FC]">
        <Header />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
          
          {/* EXACT HOME GREETING: "Hello Teacher" */}
          <div className="pb-2">
            <h1 className="font-fredoka text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E4FA3]">
              Hello Teacher
            </h1>
          </div>

          {/* SECTION: CLASSROOM LEVELS (Exactly 3 Class Cards: LKG -> UKG -> 1st Class) */}
          <section className="space-y-6">
            <h2 className="font-fredoka text-2xl font-bold text-[#1B5E7A]">
              Classroom Levels
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {classroomLevels.map(cls => (
                <div
                  key={cls.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-chota hover:shadow-chota-lg border-2 border-[#2D9CDB]/20 hover:border-[#FF7A30]/40 transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
                >
                  {/* Properly Fitted Square Image Container */}
                  <div className="relative aspect-square w-full bg-[#FFFDF8] overflow-hidden flex items-center justify-center p-4 border-b border-[#2D9CDB]/15">
                    <div className="relative w-full h-full rounded-2xl overflow-hidden">
                      <Image
                        src={cls.iconImage}
                        alt={cls.name}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Card Action Area */}
                  <div className="p-6 flex-1 flex flex-col justify-between items-center text-center space-y-4">
                    <h3 className="font-fredoka text-3xl font-bold text-[#1E4FA3]">
                      {cls.name}
                    </h3>

                    {/* Primary Orange Enter Class Button */}
                    <Link
                      href={`/class/${cls.id}`}
                      className="w-full py-3.5 px-6 rounded-full bg-[#FF7A30] hover:bg-[#E85D04] text-white font-fredoka text-lg font-bold shadow-xs hover:shadow transition active:scale-95 flex items-center justify-center gap-2 border-2 border-white group/btn"
                    >
                      <span>Enter Class</span>
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </AuthGuard>
  );
}

