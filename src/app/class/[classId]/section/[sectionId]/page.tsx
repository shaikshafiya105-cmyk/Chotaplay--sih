'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Header } from '@/components/Header';
import { BackButton } from '@/components/BackButton';
import { AuthGuard } from '@/components/AuthGuard';
import { getTopicsByClassAndSection, CLASSES, SECTIONS, ClassType, SectionType } from '@/data/curriculum';
import { useApp } from '@/context/AppContext';

export default function SectionTopicsPage() {
  const params = useParams();
  const classId = params.classId as ClassType;
  const sectionId = params.sectionId as SectionType;
  const { isTopicFullyCompleted } = useApp();

  const classInfo = CLASSES.find(c => c.id === classId);
  const sectionInfo = SECTIONS.find(s => s.id === sectionId);
  const allSectionTopics = getTopicsByClassAndSection(classId, sectionId);

  // Recently Watched: ONLY topics that are GENUINELY completed!
  const recentlyWatched = allSectionTopics.filter(t => isTopicFullyCompleted(t));
  
  // Upcoming Topics: Topics that are NOT yet completed
  const upcomingTopics = allSectionTopics.filter(t => !isTopicFullyCompleted(t));

  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col bg-[#EAF6FC]">
        <Header />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 space-y-10">
          
          {/* Header with Section Title and Back Button returning to Class Interface */}
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#2D9CDB]/20">
            <div>
              <h1 className="font-fredoka text-3xl sm:text-4xl font-bold text-[#1E4FA3]">
                {classInfo?.name} · {sectionInfo?.name}
              </h1>
            </div>

            <BackButton href={`/class/${classId}`} label={classInfo?.name || 'Class'} />
          </div>

          {/* SECTION 1: RECENTLY WATCHED (Only if genuinely completed!) */}
          {recentlyWatched.length > 0 && (
            <section className="space-y-4">
              <h2 className="font-fredoka text-2xl font-bold text-[#1E4FA3]">
                Recently Watched
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentlyWatched.map(topic => (
                  <div
                    key={topic.topicId}
                    className="bg-white rounded-3xl overflow-hidden shadow-chota hover:shadow-chota-lg border-2 border-green-300 transition-all duration-300 flex flex-col group hover:-translate-y-1"
                  >
                    <div className="relative h-48 w-full bg-[#FFE8D6] overflow-hidden">
                      <Image
                        src={topic.thumbUrl}
                        alt={topic.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Status: Completed (Light Green) */}
                      <div className="absolute top-3 right-3 bg-green-100 text-green-800 border border-green-300 px-3 py-1 rounded-full font-bold text-xs shadow-xs flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-700" />
                        <span>Completed</span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <h3 className="font-fredoka text-xl font-bold text-[#1E4FA3] group-hover:text-[#FF7A30] transition-colors">
                        {topic.name}
                      </h3>

                      <Link
                        href={`/class/${classId}/section/${sectionId}/topic/${topic.topicId}`}
                        className="w-full py-2.5 px-4 rounded-full bg-[#FF7A30] hover:bg-[#E85D04] text-white font-fredoka text-sm font-bold shadow-xs transition flex items-center justify-center gap-2"
                      >
                        <span>Open Topic</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SECTION 2: UPCOMING TOPICS (NO status badge) */}
          <section className="space-y-4">
            <h2 className="font-fredoka text-2xl font-bold text-[#1E4FA3]">
              Upcoming Topics
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingTopics.map(topic => (
                <div
                  key={topic.topicId}
                  className="bg-white rounded-3xl overflow-hidden shadow-chota hover:shadow-chota-lg border-2 border-[#2D9CDB]/20 hover:border-[#FF7A30]/40 transition-all duration-300 flex flex-col group hover:-translate-y-1"
                >
                  {/* Topic Thumbnail - NO status badge on Upcoming Topics */}
                  <div className="relative h-48 w-full bg-[#FFE8D6] overflow-hidden">
                    <Image
                      src={topic.thumbUrl}
                      alt={topic.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <h3 className="font-fredoka text-xl font-bold text-[#1E4FA3] group-hover:text-[#FF7A30] transition-colors">
                      {topic.name}
                    </h3>

                    <Link
                      href={`/class/${classId}/section/${sectionId}/topic/${topic.topicId}`}
                      className="w-full py-2.5 px-4 rounded-full bg-[#FF7A30] hover:bg-[#E85D04] text-white font-fredoka text-sm font-bold shadow-xs transition flex items-center justify-center gap-2"
                    >
                      <span>Open Topic</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </AuthGuard>
  );
}
