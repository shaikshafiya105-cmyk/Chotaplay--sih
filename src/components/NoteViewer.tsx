'use client';

import React from 'react';
import Image from 'next/image';
import { BookOpen, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface NoteViewerProps {
  noteUrl: string;
  topicName: string;
  topicId: string;
}

export function NoteViewer({ noteUrl, topicName, topicId }: NoteViewerProps) {
  const { progress, markNoteCompleted } = useApp();
  const isCompleted = progress.completedNotes.includes(topicId);

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-chota border border-[#2D9CDB]/20 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#2D9CDB]/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#EAF6FC] flex items-center justify-center border border-[#2D9CDB]/30">
            <BookOpen className="w-5 h-5 text-[#1E4FA3]" />
          </div>
          <div>
            <h3 className="font-fredoka text-xl md:text-2xl font-bold text-[#1E4FA3]">
              Teacher Learning Notes
            </h3>
            <p className="text-xs md:text-sm text-[#1B5E7A]/80 font-medium">
              Curriculum reference sheet for {topicName}
            </p>
          </div>
        </div>

        {/* Mark Note Completed Action */}
        <button
          onClick={() => markNoteCompleted(topicId)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition active:scale-95 shadow-xs ${
            isCompleted
              ? 'bg-green-100 text-green-800 border-2 border-green-300'
              : 'bg-[#FF7A30] hover:bg-[#E85D04] text-white border-2 border-white'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isCompleted ? 'Note Completed' : 'Mark Note Read'}</span>
        </button>
      </div>

      {/* High-Resolution Note Sheet */}
      <div className="relative w-full rounded-2xl overflow-hidden border-2 border-[#2D9CDB]/30 shadow-xs bg-[#FFFDF8] flex justify-center p-2">
        <Image
          src={noteUrl}
          alt={`Notes for ${topicName}`}
          width={1200}
          height={800}
          className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
          priority
        />
      </div>
    </div>
  );
}
