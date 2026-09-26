'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { BackButton } from '@/components/BackButton';
import { TopicSubNav } from '@/components/TopicSubNav';
import { ActivitySpinner } from '@/components/ActivitySpinner';
import { FeedbackModal } from '@/components/FeedbackModal';
import { AuthGuard } from '@/components/AuthGuard';
import { getTopicById, ClassType, SectionType } from '@/data/curriculum';
import { MessageSquarePlus } from 'lucide-react';

export default function SectionTopicActivityPage() {
  const params = useParams();
  const classId = params.classId as ClassType;
  const sectionId = params.sectionId as SectionType;
  const topicId = params.topicId as string;
  const topic = getTopicById(classId, topicId, sectionId);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  if (!topic) return null;
  const basePath = `/class/${classId}/section/${sectionId}/topic/${topicId}`;

  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col bg-[#EAF6FC]">
        <Header />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#2D9CDB]/20">
            <div>
              <h1 className="font-fredoka text-3xl md:text-4xl font-bold text-[#1E4FA3]">
                {topic.name}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFeedbackOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FFE8D6] hover:bg-[#FF7A30] text-[#FF7A30] hover:text-white font-bold text-sm border-2 border-[#FF7A30] shadow-xs transition active:scale-95"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Record Feedback</span>
              </button>
              <BackButton href={basePath} label="Topic Hub" />
            </div>
          </div>

          <TopicSubNav topic={topic} basePath={basePath} />
          <ActivitySpinner
            topicName={topic.name}
            topicId={`${classId}_${sectionId}_${topicId}`}
            activities={topic.activities}
          />

          <FeedbackModal
            isOpen={isFeedbackOpen}
            onClose={() => setIsFeedbackOpen(false)}
            topicId={topic.topicId}
            topicName={topic.name}
            classId={classId}
          />
        </main>
      </div>
    </AuthGuard>
  );
}
