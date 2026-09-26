'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { BackButton } from '@/components/BackButton';
import { TopicSubNav } from '@/components/TopicSubNav';
import { VideoPlayer } from '@/components/VideoPlayer';
import { FeedbackModal } from '@/components/FeedbackModal';
import { AuthGuard } from '@/components/AuthGuard';
import { getTopicById, ClassType, SectionType } from '@/data/curriculum';
import { MessageSquarePlus, Gamepad2 } from 'lucide-react';

export default function SectionTopicVideoPage() {
  const params = useParams();
  const router = useRouter();
  const classId = params.classId as ClassType;
  const sectionId = params.sectionId as SectionType;
  const topicId = params.topicId as string;
  const topic = getTopicById(classId, topicId, sectionId);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  if (!topic) return null;
  const basePath = `/class/${classId}/section/${sectionId}/topic/${topicId}`;

  const handlePlayGame = () => {
    if (topic.hasGame) {
      router.push(`${basePath}/game`);
    }
  };

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
              {topic.hasGame && (
                <button
                  onClick={handlePlayGame}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FF7A30] hover:bg-[#E85D04] text-white font-bold text-sm shadow-xs transition active:scale-95"
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>Play Game</span>
                </button>
              )}
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
          <VideoPlayer
            src={topic.videoUrl}
            topicId={`${classId}_${sectionId}_${topicId}`}
            topicName={topic.name}
            onPlayGame={handlePlayGame}
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
