'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { teacher, isLoaded } = useApp();

  useEffect(() => {
    if (isLoaded && !teacher.isLoggedIn) {
      router.replace('/login');
    }
  }, [isLoaded, teacher.isLoggedIn, router]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EAF6FC]">
        <div className="w-12 h-12 rounded-full border-4 border-[#FF7A30] border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!teacher.isLoggedIn) {
    return null;
  }

  return <>{children}</>;
}
