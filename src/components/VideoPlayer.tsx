'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, CheckCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface VideoPlayerProps {
  src: string;
  topicId: string;
  topicName: string;
  onEnded?: () => void;
  onPlayGame?: () => void;
}

export function VideoPlayer({ src, topicId, topicName, onEnded, onPlayGame }: VideoPlayerProps) {
  const { markVideoCompleted } = useApp();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setCurrentTime(video.currentTime);
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setIsCompleted(true);
      markVideoCompleted(topicId);
      if (onEnded) onEnded();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, [topicId, markVideoCompleted, onEnded]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    const seekTime = (parseFloat(e.target.value) / 100) * duration;
    video.currentTime = seekTime;
    setProgress(parseFloat(e.target.value));
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullScreen = () => {
    const container = containerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video bg-[#1B5E7A] rounded-3xl overflow-hidden shadow-chota-lg border-4 border-[#2D9CDB]/30 group"
    >
      <video
        ref={videoRef}
        src={src}
        playsInline
        className="w-full h-full object-contain cursor-pointer"
        onClick={togglePlay}
      />

      {/* Play Overlay when paused */}
      {!isPlaying && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 bg-[#1B5E7A]/40 backdrop-blur-[2px] flex items-center justify-center cursor-pointer transition-opacity"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#FF7A30] text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform border-4 border-white">
            <Play className="w-10 h-10 md:w-12 md:h-12 fill-current translate-x-1" />
          </div>
        </div>
      )}

      {/* Classroom Video Controls Bar */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#1B5E7A] via-[#1B5E7A]/80 to-transparent p-4 md:p-6 flex flex-col gap-2 transition-opacity">
        
        {/* Scrubber Progress Bar */}
        <div className="w-full flex items-center gap-3">
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={progress}
            onChange={handleSeek}
            className="w-full h-2 bg-white/40 rounded-lg appearance-none cursor-pointer accent-[#FF7A30]"
          />
        </div>

        {/* Buttons Row */}
        <div className="flex items-center justify-between text-white text-sm font-semibold">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="p-2 rounded-full hover:bg-white/20 transition active:scale-95"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-current" />}
            </button>

            <button
              onClick={toggleMute}
              className="p-2 rounded-full hover:bg-white/20 transition active:scale-95"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>

            <span className="text-xs md:text-sm font-mono opacity-90">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isCompleted && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFC93C] text-[#1B5E7A] text-xs font-bold shadow-sm">
                <CheckCircle className="w-4 h-4" />
                <span>Completed</span>
              </div>
            )}

            <button
              onClick={toggleFullScreen}
              className="p-2 rounded-full hover:bg-white/20 transition active:scale-95"
              aria-label="Full screen"
            >
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
