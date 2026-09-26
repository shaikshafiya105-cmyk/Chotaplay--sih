'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { BackButton } from '@/components/BackButton';
import { AuthGuard } from '@/components/AuthGuard';
import { CLASSES, SECTIONS, ClassType } from '@/data/curriculum';

export default function ClassSectionsPage() {
  const params = useParams();
  const classId = params.classId as ClassType;

  const classInfo = CLASSES.find(c => c.id === classId) || {
    id: classId,
    name: classId?.toUpperCase() || 'Class',
    fullName: classId?.toUpperCase() || 'Class',
    iconImage: '/assets/logo.png',
    color: '#1E4FA3'
  };

  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col bg-[#EAF6FC]">
        <Header />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 space-y-8">
          
          {/* Header with Class Name and Back Button to Home */}
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#2D9CDB]/20">
            <div>
              <h1 className="font-fredoka text-3xl sm:text-4xl font-bold text-[#1E4FA3]">
                {classInfo.name}
              </h1>
            </div>

            <BackButton href="/home" label="Home" />
          </div>

          {/* TWO SECTION CARDS: Little Stars & Bright Minds with Exact Provided Pictures */}
          <section className="space-y-6">
            <h2 className="font-fredoka text-2xl font-bold text-[#1B5E7A]">
              Class Sections
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {SECTIONS.map(sec => {
                return (
                  <div
                    key={sec.id}
                    className="bg-white rounded-3xl overflow-hidden shadow-chota hover:shadow-chota-lg border-2 border-[#2D9CDB]/25 hover:border-[#FF7A30]/50 transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
                  >
                    {/* Visual Container with EXACT PROVIDED PICTURE */}
                    <div className="relative aspect-[16/10] sm:aspect-video w-full bg-[#FFFDF8] overflow-hidden flex items-center justify-center p-3 border-b border-[#2D9CDB]/15">
                      <Image
                        src={sec.icon}
                        alt={sec.name}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                        priority
                      />
                    </div>

                    {/* Content Area */}
                    <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                      <div>
                        <h3 className="font-fredoka text-3xl font-bold text-[#1E4FA3] group-hover:text-[#FF7A30] transition-colors">
                          {sec.name}
                        </h3>
                        <p className="text-sm font-semibold text-[#1B5E7A]/70 uppercase tracking-wider mt-1">
                          {sec.subtitle}
                        </p>
                      </div>

                      <Link
                        href={`/class/${classId}/section/${sec.id}`}
                        className="w-full py-4 px-6 rounded-full bg-[#FF7A30] hover:bg-[#E85D04] text-white font-fredoka text-lg font-bold shadow-xs hover:shadow transition active:scale-95 flex items-center justify-center gap-2 border-2 border-white group/btn"
                      >
                        <span>Enter Section</span>
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </AuthGuard>
  );
}
