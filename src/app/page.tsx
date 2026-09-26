'use client';

import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function IntroPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 1. Attempt unmuted autoplay with audio
    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Browser blocked audio autoplay. Start muted per policy
        video.muted = true;
        video.play().catch(() => {});
      });
    }

    // 2. Unmute & ensure playback on the user's very first interaction anywhere on page
    const handleFirstInteraction = () => {
      if (video) {
        video.muted = false;
        if (video.paused) {
          video.play().catch(() => {});
        }
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  const handleEnded = () => {
    router.push('/entry');
  };

  return (
    <main className="relative w-screen h-screen bg-[#1B5E7A] overflow-hidden flex items-center justify-center select-none">
      {/* PLAIN, CLEAN INTRO VIDEO - ZERO VISIBLE PLAYER CONTROLS */}
      <video
        ref={videoRef}
        src="/intro.mp4"
        playsInline
        autoPlay
        controls={false}
        onEnded={handleEnded}
        className="w-full h-full object-cover pointer-events-none"
      />
    </main>
  );
}

