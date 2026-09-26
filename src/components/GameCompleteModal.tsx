'use client';

import React from 'react';
import { Trophy, Sparkles, X, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function GameCompleteModal() {
  const { isGameCompleteModalOpen, closeGameCompleteModal, completedGameTopicName } = useApp();

  if (!isGameCompleteModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#1B5E7A]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-chota-lg border-4 border-[#FFC93C] text-center space-y-6 animate-in zoom-in-95 duration-200">
        
        {/* Trophy Icon */}
        <div className="mx-auto w-24 h-24 rounded-full bg-[#FFE9A8] text-[#E8A317] border-4 border-white shadow-md flex items-center justify-center animate-bounce">
          <Trophy className="w-12 h-12 text-[#FF7A30]" />
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE8D6] text-[#FF7A30] font-bold text-xs uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mission Accomplished</span>
          </div>
          <h2 className="font-fredoka text-3xl font-bold text-[#1E4FA3]">
            Game Completed!
          </h2>
          <p className="text-sm md:text-base text-[#1B5E7A] font-medium mt-1">
            Super job! The class has completed the <strong className="text-[#FF7A30]">{completedGameTopicName}</strong> game challenge!
          </p>
        </div>

        <button
          onClick={closeGameCompleteModal}
          className="w-full py-3.5 rounded-full bg-[#FF7A30] hover:bg-[#E85D04] text-white font-fredoka text-lg font-bold shadow-chota-hover transition active:scale-95 flex items-center justify-center gap-2"
        >
          <span>Continue Lesson</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
