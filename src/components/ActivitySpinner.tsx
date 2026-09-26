'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, CheckCircle2, ChevronRight, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ActivityItem } from '@/data/curriculum';
import { IconBox } from './IconBox';
import { useApp } from '@/context/AppContext';

interface ActivitySpinnerProps {
  topicName: string;
  topicId: string;
  activities: ActivityItem[];
  onSelectActivity?: (activity: ActivityItem) => void;
}

export function ActivitySpinner({
  topicName,
  topicId,
  activities,
  onSelectActivity
}: ActivitySpinnerProps) {
  const { markActivityCompleted } = useApp();
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [hasEverSpun, setHasEverSpun] = useState(false);
  const currentRotationRef = useRef(0);

  // Colors for 4 segments (90 deg each) strictly in ChotaPlay palette
  // Segment 0, 1, 2, 3
  const segmentColors = [
    { bg: '#1E4FA3', text: '#FFFFFF', accent: '#FFE9A8' }, // Blue
    { bg: '#FF7A30', text: '#FFFFFF', accent: '#FFF6DC' }, // Orange
    { bg: '#FFE9A8', text: '#1B5E7A', accent: '#1E4FA3' }, // Sunshine Yellow
    { bg: '#2D9CDB', text: '#FFFFFF', accent: '#FFE8D6' }  // Sky Blue
  ];

  // Deterministic spin calculation
  const spinWheel = () => {
    if (isSpinning || activities.length < 4) return;

    setIsSpinning(true);

    // Pick a random target index (0 to 3) or different from current
    let targetIdx = Math.floor(Math.random() * 4);
    if (selectedIndex !== null && Math.random() > 0.3) {
      targetIdx = (selectedIndex + 1 + Math.floor(Math.random() * 3)) % 4;
    }

    // Each segment is 90 degrees.
    // Pointer is at the top (270° in standard wheel canvas, or top-center 0°).
    // Segment 0 is [0° - 90°], center at 45°
    // Segment 1 is [90° - 180°], center at 135°
    // Segment 2 is [180° - 270°], center at 225°
    // Segment 3 is [270° - 360°], center at 315°
    
    // To align segment center with the TOP POINTER (at 0° / 360°):
    // Angle offset = 360° - (targetIdx * 90° + 45°)
    const targetSegmentAngle = 360 - (targetIdx * 90 + 45);

    // Add 5 to 7 full rotations (1800° - 2520°)
    const fullRotations = 360 * 6;
    const currentBase = Math.floor(currentRotationRef.current / 360) * 360;
    const nextTotalRotation = currentBase + fullRotations + targetSegmentAngle;

    currentRotationRef.current = nextTotalRotation;
    setRotationDegree(nextTotalRotation);

    // Animation duration is 3.5 seconds
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedIndex(targetIdx);
      setHasEverSpun(true);
      
      const selected = activities[targetIdx];
      if (selected) {
        markActivityCompleted(topicId, selected.id);
        if (onSelectActivity) onSelectActivity(selected);
      }

      // Celebratory mini confetti
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#FF7A30', '#2D9CDB', '#FFC93C', '#1E4FA3']
        });
      } catch (e) {}
    }, 3500);
  };

  const currentActivity = selectedIndex !== null ? activities[selectedIndex] : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* LEFT: Activity Spinner Wheel */}
      <div className="lg:col-span-6 flex flex-col items-center bg-white rounded-3xl p-6 md:p-8 shadow-chota border border-[#2D9CDB]/20">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE8D6] text-[#FF7A30] font-bold text-xs uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Activity Wheel</span>
          </div>
          <h3 className="font-fredoka text-xl md:text-2xl font-bold text-[#1B5E7A]">
            Discover Your Topic Mission
          </h3>
          <p className="text-xs md:text-sm text-[#1B5E7A]/80 font-medium">
            Spin to choose 1 of 4 teacher-led classroom activities!
          </p>
        </div>

        {/* Spinner Frame */}
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center my-2">
          
          {/* Top Fixed Pointer (Does not rotate) */}
          <div className="absolute -top-3 z-30 flex flex-col items-center animate-pointer-bob pointer-events-none">
            <div className="w-8 h-10 md:w-10 md:h-12 bg-[#FF7A30] border-3 border-white rounded-lg shadow-lg flex items-center justify-center transform rotate-180">
              <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[12px] border-b-white"></div>
            </div>
          </div>

          {/* Outer Decorative Ring */}
          <div className="absolute inset-0 rounded-full border-8 border-[#FFE9A8] shadow-inner"></div>
          <div className="absolute inset-1 rounded-full border-4 border-[#1E4FA3]/20 pointer-events-none"></div>

          {/* Rotating Wheel Canvas */}
          <div
            className="w-full h-full rounded-full relative overflow-hidden shadow-chota-lg"
            style={{
              transform: `rotate(${rotationDegree}deg)`,
              transition: isSpinning
                ? 'transform 3.5s cubic-bezier(0.15, 0.9, 0.25, 1)'
                : 'none'
            }}
          >
            {activities.slice(0, 4).map((act, index) => {
              const angle = index * 90;
              const color = segmentColors[index % segmentColors.length];
              const isSelected = !isSpinning && selectedIndex === index;

              return (
                <div
                  key={act.id || index}
                  className="absolute top-0 left-0 w-full h-full origin-center"
                  style={{
                    transform: `rotate(${angle}deg)`,
                    clipPath: 'polygon(50% 50%, 0 0, 100% 0)'
                  }}
                >
                  <div
                    className={`w-full h-full flex flex-col items-center pt-8 md:pt-10 px-6 transition-colors duration-300 ${
                      isSelected ? 'brightness-110' : ''
                    }`}
                    style={{ backgroundColor: color.bg, color: color.text }}
                  >
                    <div className="max-w-[140px] text-center transform -rotate-45">
                      <span className="font-fredoka text-xs sm:text-sm md:text-base font-bold leading-tight block drop-shadow-sm">
                        {act.name}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Center Cap with Brand Logo */}
            <div className="absolute inset-0 m-auto w-16 h-16 md:w-20 md:h-20 bg-white rounded-full border-4 border-[#FF7A30] shadow-md flex items-center justify-center z-20">
              <span className="font-fredoka text-xs md:text-sm font-bold text-[#1E4FA3]">
                Chota<span className="text-[#FF7A30]">Play</span>
              </span>
            </div>
          </div>
        </div>

        {/* SPIN Button */}
        <div className="mt-6 w-full max-w-xs">
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className={`w-full py-3.5 md:py-4 px-8 rounded-full font-fredoka text-lg md:text-xl font-bold tracking-wide shadow-chota-hover transition-all duration-200 active:scale-95 flex items-center justify-center gap-3 ${
              isSpinning
                ? 'bg-[#E85D04] text-white opacity-90 cursor-not-allowed animate-pulse'
                : 'bg-[#FF7A30] hover:bg-[#E85D04] text-white border-2 border-white'
            }`}
          >
            {isSpinning ? (
              <>
                <RefreshCw className="w-6 h-6 animate-spin" />
                <span>Spinning Mission...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6" />
                <span>{hasEverSpun ? '✨ SPIN AGAIN' : '✨ SPIN THE WHEEL'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* RIGHT: Activity Details Panel */}
      <div className="lg:col-span-6 bg-white rounded-3xl p-6 md:p-8 shadow-chota border border-[#2D9CDB]/20 min-h-[440px] flex flex-col justify-between">
        {currentActivity ? (
          <div className="space-y-6">
            
            {/* Mission Selected Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#2D9CDB]/20">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF6DC] text-[#E8A317] font-bold text-xs uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Activity Mission Selected</span>
                </div>
                <h2 className="font-fredoka text-2xl md:text-3xl font-bold text-[#1E4FA3]">
                  {currentActivity.name}
                </h2>
              </div>
              <IconBox size="md" variant="yellow" className="shrink-0">
                <Sparkles className="w-6 h-6 text-[#FF7A30]" />
              </IconBox>
            </div>

            {/* Instruction */}
            <div className="bg-[#EAF6FC] rounded-2xl p-4 md:p-5 border border-[#2D9CDB]/30">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#1E4FA3] mb-1">
                Teacher Instruction
              </h4>
              <p className="text-sm md:text-base text-[#1B5E7A] font-medium leading-relaxed">
                {currentActivity.instruction}
              </p>
            </div>

            {/* How To Play */}
            <div>
              <h4 className="font-fredoka text-base md:text-lg font-bold text-[#1B5E7A] mb-3 flex items-center gap-2">
                <span>🎯 HOW TO PLAY</span>
              </h4>
              <div className="space-y-2.5">
                {currentActivity.howToPlay.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FFE8D6] text-[#FF7A30] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-[#FF7A30]/30">
                      {idx + 1}
                    </div>
                    <p className="text-sm md:text-base text-[#1B5E7A] leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* WOW Moment */}
            {currentActivity.wowMoment && (
              <div className="bg-[#FFF6DC] rounded-2xl p-4 md:p-5 border-2 border-[#FFC93C] shadow-sm">
                <div className="flex items-center gap-2 text-[#E8A317] font-bold text-xs uppercase tracking-wider mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Classroom WOW Moment</span>
                </div>
                <p className="text-sm md:text-base font-bold text-[#1B5E7A]">
                  {currentActivity.wowMoment}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 my-auto">
            <div className="w-20 h-20 rounded-3xl bg-[#FFE8D6] flex items-center justify-center border-2 border-[#FF7A30]/30 shadow-sm">
              <Sparkles className="w-10 h-10 text-[#FF7A30]" />
            </div>
            <h3 className="font-fredoka text-2xl font-bold text-[#1E4FA3]">
              🎯 Ready for Your Activity?
            </h3>
            <p className="text-[#1B5E7A] max-w-sm text-sm md:text-base font-medium">
              Tap the <span className="font-bold text-[#FF7A30]">SPIN THE WHEEL</span> button on the left to reveal one of the 4 exciting missions for <strong className="text-[#1E4FA3]">{topicName}</strong>!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
