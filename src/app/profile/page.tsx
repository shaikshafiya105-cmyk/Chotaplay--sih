'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Award, Compass, LogOut } from 'lucide-react';
import { Header } from '@/components/Header';
import { FeedbackTable } from '@/components/FeedbackTable';
import { AuthGuard } from '@/components/AuthGuard';
import { useApp } from '@/context/AppContext';

export default function TeacherProfilePage() {
  const router = useRouter();
  const { teacher, feedbackList, logout } = useApp();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col bg-[#EAF6FC]">
        <Header />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 space-y-8">
          
          {/* Teacher Info Card */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-chota border border-[#2D9CDB]/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative w-20 h-20 rounded-3xl overflow-hidden bg-[#FFE8D6] border-2 border-[#FF7A30]/30 shadow-xs flex items-center justify-center p-2">
                <Image
                  src="/assets/teacher.png"
                  alt="Teacher Profile"
                  fill
                  className="object-contain p-1"
                />
              </div>

              <div className="space-y-1">
                <h1 className="font-fredoka text-3xl font-bold text-[#1E4FA3]">
                  {teacher.name || 'Teacher'}
                </h1>
                <p className="text-xs font-mono font-bold text-[#1B5E7A]/70">
                  Teacher ID: <span className="text-[#FF7A30] font-bold">{teacher.id || 'TCH-2026'}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-red-50 text-red-600 border border-red-200 font-bold text-sm transition active:scale-95 shadow-xs"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>

          {/* Overall Feedback Table */}
          <FeedbackTable feedbackList={feedbackList} />
        </main>
      </div>
    </AuthGuard>
  );
}
