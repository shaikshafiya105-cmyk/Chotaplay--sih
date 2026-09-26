'use client';

import React, { useState } from 'react';
import { Gamepad2, Sparkles, CheckCircle2, RotateCcw, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '@/context/AppContext';
import { IconBox } from './IconBox';

interface GameContainerProps {
  gameUrl: string;
  topicName: string;
  topicId: string;
}

export function GameContainer({ gameUrl, topicName, topicId }: GameContainerProps) {
  const { markGameCompleted } = useApp();

  // Mark game as completed when the user enters and plays the game
  React.useEffect(() => {
    markGameCompleted(topicId);
  }, [topicId, markGameCompleted]);

  return (
    <div className="flex flex-col bg-white rounded-3xl p-6 md:p-8 shadow-chota border border-[#2D9CDB]/20">
      
      {/* Game Title Bar - Clean title without manual mark completed button */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#2D9CDB]/20">
        <div className="flex items-center gap-3">
          <IconBox size="md" variant="orange">
            <Gamepad2 className="w-6 h-6 text-[#FF7A30]" />
          </IconBox>
          <div>
            <h3 className="font-fredoka text-xl md:text-2xl font-bold text-[#1E4FA3]">
              {topicName} Game Challenge
            </h3>
            <p className="text-xs md:text-sm text-[#1B5E7A]/80 font-medium">
              Interactive classroom game session
            </p>
          </div>
        </div>
      </div>

      {/* Game Iframe */}
      <div className="relative w-full aspect-[4/3] md:aspect-[16/10] bg-[#EAF6FC] rounded-2xl overflow-hidden border-2 border-[#2D9CDB]/30 shadow-inner">
        <iframe
          src={gameUrl}
          title={topicName + ' Game'}
          className="w-full h-full border-0"
          allow="autoplay; fullscreen"
        />
      </div>
    </div>
  );
}
