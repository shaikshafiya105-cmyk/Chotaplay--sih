'use client';

import React, { useState } from 'react';
import { Star, AlertCircle, HelpCircle, CheckCircle, X, Send } from 'lucide-react';
import { FeedbackStatus, useApp } from '@/context/AppContext';
import { ClassType } from '@/data/curriculum';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicId: string;
  topicName: string;
  classId: ClassType;
}

export function FeedbackModal({ isOpen, onClose, topicId, topicName, classId }: FeedbackModalProps) {
  const { addFeedback, teacher } = useApp();
  const [studentName, setStudentName] = useState('');
  const [classSection, setClassSection] = useState('Section A');
  const [status, setStatus] = useState<FeedbackStatus>('Understood');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;

    addFeedback({
      teacherId: teacher?.id || 'TCH-2026',
      studentName: studentName.trim(),
      classSection: classSection,
      status: status,
      topicId: topicId,
      topicName: topicName,
      classId: classId,
      notes: notes.trim()
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setStudentName('');
      setNotes('');
      onClose();
    }, 1200);
  };

  const statusOptions: { value: FeedbackStatus; label: string; icon: any; colorClass: string }[] = [
    {
      value: 'Understood',
      label: 'Understood',
      icon: Star,
      colorClass: status === 'Understood' ? 'bg-[#FFC93C] text-[#1B5E7A] border-[#E8A317]' : 'border-[#FFC93C] text-[#1B5E7A] bg-white'
    },
    {
      value: 'Developing',
      label: 'Developing',
      icon: CheckCircle,
      colorClass: status === 'Developing' ? 'bg-[#2D9CDB] text-white border-[#1E4FA3]' : 'border-[#2D9CDB] text-[#1E4FA3] bg-white'
    },
    {
      value: 'Support Needed',
      label: 'Support Needed',
      icon: AlertCircle,
      colorClass: status === 'Support Needed' ? 'bg-[#FF7A30] text-white border-[#E85D04]' : 'border-[#FF7A30] text-[#FF7A30] bg-white'
    },
    {
      value: 'Not Understood',
      label: 'Not Understood',
      icon: HelpCircle,
      colorClass: status === 'Not Understood' ? 'bg-[#EAF6FC] text-[#1B5E7A] border-[#2D9CDB]' : 'border-[#2D9CDB]/40 text-[#1B5E7A]/70 bg-white'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#1B5E7A]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-chota-lg border border-[#2D9CDB]/20 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#2D9CDB]/20">
          <div>
            <h3 className="font-fredoka text-2xl font-bold text-[#1E4FA3]">
              Feedback Form
            </h3>
            <p className="text-xs md:text-sm text-[#1B5E7A]/80 font-medium">
              Topic: <strong className="text-[#FF7A30]">{topicName}</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#EAF6FC] text-[#1B5E7A] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#FFE9A8] text-[#1E4FA3] flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="font-fredoka text-xl font-bold text-[#1E4FA3]">Feedback Recorded!</h4>
            <p className="text-sm text-[#1B5E7A]">Saved to classroom progress table.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {/* Student Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1B5E7A] mb-1.5">
                Student Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Aarav Sharma"
                value={studentName}
                onChange={e => setStudentName(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-[#2D9CDB]/40 focus:border-[#FF7A30] focus:outline-none bg-[#FFFDF8] text-[#1B5E7A] font-medium text-sm"
              />
            </div>

            {/* Class Section */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1B5E7A] mb-1.5">
                Class / Section
              </label>
              <input
                type="text"
                placeholder="e.g. LKG - Lotus or Section A"
                value={classSection}
                onChange={e => setClassSection(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-[#2D9CDB]/40 focus:border-[#FF7A30] focus:outline-none bg-[#FFFDF8] text-[#1B5E7A] font-medium text-sm"
              />
            </div>

            {/* Understanding Status */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1B5E7A] mb-2">
                Understanding Level
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {statusOptions.map(opt => {
                  const Icon = opt.icon;
                  return (
                    <button
                      type="button"
                      key={opt.value}
                      onClick={() => setStatus(opt.value)}
                      className={`flex items-center gap-2 p-3 rounded-2xl border-2 font-bold text-xs md:text-sm transition-all duration-200 ${opt.colorClass}`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1B5E7A] mb-1.5">
                Observations / Notes
              </label>
              <textarea
                rows={2}
                placeholder="Teacher observations regarding this student..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border-2 border-[#2D9CDB]/40 focus:border-[#FF7A30] focus:outline-none bg-[#FFFDF8] text-[#1B5E7A] font-medium text-sm resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#FF7A30] hover:bg-[#E85D04] text-white font-fredoka text-lg font-bold shadow-chota-hover transition active:scale-95 flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              <span>Submit Feedback</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
