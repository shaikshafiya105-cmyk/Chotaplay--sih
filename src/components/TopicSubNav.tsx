'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, PlayCircle, Gamepad2, Compass, Sparkles } from 'lucide-react';
import { IconBox } from './IconBox';
import { TopicItem } from '@/data/curriculum';

interface TopicSubNavProps {
  topic: TopicItem;
  basePath: string; // e.g. /class/lkg/topic/rainbow-world or /explore/topic/little-leaders
  isExplore?: boolean;
}

export function TopicSubNav({ topic, basePath, isExplore = false }: TopicSubNavProps) {
  const pathname = usePathname();

  const tabs = [
    {
      id: 'note',
      label: 'Note',
      icon: FileText,
      href: `${basePath}/note`,
      isActive: pathname.endsWith('/note') || pathname === basePath
    },
    {
      id: 'video',
      label: 'Video',
      icon: PlayCircle,
      href: `${basePath}/video`,
      isActive: pathname.endsWith('/video')
    },
    ...(!isExplore && topic.hasGame
      ? [
          {
            id: 'game',
            label: 'Game',
            icon: Gamepad2,
            href: `${basePath}/game`,
            isActive: pathname.endsWith('/game')
          }
        ]
      : []),
    {
      id: 'activity',
      label: 'Activity',
      icon: Sparkles,
      href: `${basePath}/activity`,
      isActive: pathname.endsWith('/activity')
    }
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 md:gap-3 py-2">
      {tabs.map(tab => {
        const Icon = tab.icon;
        return (
          <Link
            key={tab.id}
            href={tab.href}
            className={`flex items-center gap-2.5 px-4 py-2.5 md:px-6 md:py-3 rounded-full font-bold text-sm md:text-base transition-all duration-200 active:scale-95 shadow-sm ${
              tab.isActive
                ? 'bg-[#FF7A30] text-white shadow-md border-2 border-[#E85D04]'
                : 'bg-white text-[#1B5E7A] hover:bg-[#EAF6FC] border-2 border-[#2D9CDB]/40'
            }`}
          >
            <IconBox
              size="sm"
              variant={tab.isActive ? 'yellow' : 'blue'}
              shadow={false}
              className="w-7 h-7 rounded-xl"
            >
              <Icon className={`w-4 h-4 stroke-[2.5] ${tab.isActive ? 'text-[#FF7A30]' : 'text-[#1E4FA3]'}`} />
            </IconBox>
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
