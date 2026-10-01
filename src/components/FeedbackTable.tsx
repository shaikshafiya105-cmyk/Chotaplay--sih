'use client';

import React, { useState } from 'react';
import { Plus, Minus, Star, AlertCircle, HelpCircle, CheckCircle, Search, Filter } from 'lucide-react';
import { FeedbackItem, FeedbackStatus } from '@/context/AppContext';
import { ClassType } from '@/data/curriculum';

interface FeedbackTableProps {
  feedbackList: FeedbackItem[];
}

export function FeedbackTable({ feedbackList }: FeedbackTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const filtered = feedbackList.filter(item => {
    const matchesClass = selectedClassFilter === 'all' || item.classId === selectedClassFilter;
    const matchesSearch =
      item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.topicName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.classSection.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesSearch;
  });

  const getStatusBadge = (status: FeedbackStatus) => {
    switch (status) {
      case 'Understood':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE9A8] text-[#1B5E7A] text-xs font-bold border border-[#E8A317]/50 shadow-xs">
            <Star className="w-3.5 h-3.5 fill-[#FFC93C] text-[#E8A317]" />
            <span>Understood</span>
          </span>
        );
      case 'Developing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF6FC] text-[#1E4FA3] text-xs font-bold border border-[#2D9CDB]/50 shadow-xs">
            <CheckCircle className="w-3.5 h-3.5 text-[#2D9CDB]" />
            <span>Developing</span>
          </span>
        );
      case 'Support Needed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE8D6] text-[#E85D04] text-xs font-bold border border-[#FF7A30]/50 shadow-xs">
            <AlertCircle className="w-3.5 h-3.5 text-[#FF7A30]" />
            <span>Support Needed</span>
          </span>
        );
      case 'Not Understood':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F4F6] text-[#6B7280] text-xs font-bold border border-gray-300 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#9CA3AF]" />
            <span>Not Understood</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-chota border border-[#2D9CDB]/20 space-y-6">
      
      {/* Table Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-fredoka text-xl md:text-2xl font-bold text-[#1E4FA3]">
            Class-Wise Understanding Record
          </h3>
          <p className="text-xs md:text-sm text-[#1B5E7A]/80 font-medium">
            Real classroom feedback mapped per topic and student
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Class Filter Tabs */}
          <div className="flex items-center bg-[#EAF6FC] p-1 rounded-full border border-[#2D9CDB]/30 text-xs font-bold">
            {['all', 'lkg', 'ukg', '1st-class', 'explore'].map(c => (
              <button
                key={c}
                onClick={() => setSelectedClassFilter(c)}
                className={`px-3 py-1.5 rounded-full transition ${
                  selectedClassFilter === c
                    ? 'bg-[#1E4FA3] text-white shadow-xs'
                    : 'text-[#1B5E7A] hover:bg-white/60'
                }`}
              >
                {c === 'all' ? 'All' : c.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#1B5E7A]/60" />
            <input
              type="text"
              placeholder="Search student / topic..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-1.5 text-xs md:text-sm rounded-full border border-[#2D9CDB]/40 bg-[#FFFDF8] focus:outline-none focus:border-[#FF7A30] text-[#1B5E7A]"
            />
          </div>
        </div>
      </div>

      {/* Feedback Table */}
      <div className="overflow-x-auto rounded-2xl border border-[#2D9CDB]/30 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#1E4FA3] text-white text-xs md:text-sm font-fredoka tracking-wider">
              <th className="py-3.5 px-4 font-bold">Student</th>
              <th className="py-3.5 px-4 font-bold">Class / Section</th>
              <th className="py-3.5 px-4 font-bold">Topic</th>
              <th className="py-3.5 px-4 font-bold">Status</th>
              <th className="py-3.5 px-4 font-bold text-center">Detail</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2D9CDB]/20 text-xs md:text-sm">
            {filtered.length > 0 ? (
              filtered.map((item, idx) => {
                const isExpanded = expandedId === item.id;
                // Alternate row backgrounds: White and Butter Wash (#FFF6DC)
                const rowBg = idx % 2 === 0 ? 'bg-white' : 'bg-[#FFF6DC]';

                return (
                  <React.Fragment key={item.id}>
                    <tr className={`${rowBg} hover:bg-[#FFE8D6]/50 transition-colors`}>
                      <td className="py-3.5 px-4 font-bold text-[#1B5E7A]">
                        {item.studentName}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-[#1B5E7A]">
                        {item.classSection}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-[#1E4FA3]">
                        {item.topicName}
                      </td>
                      <td className="py-3.5 px-4">
                        {getStatusBadge(item.status)}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => toggleExpand(item.id)}
                          className="w-7 h-7 rounded-full bg-[#FFE8D6] text-[#FF7A30] hover:bg-[#FF7A30] hover:text-white transition flex items-center justify-center mx-auto border border-[#FF7A30]/30 font-bold"
                          aria-label="Expand feedback detail"
                        >
                          {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </button>
                      </td>
                    </tr>
                    
                    {/* Expandable detail row */}
                    {isExpanded && (
                      <tr className="bg-[#EAF6FC] border-b border-[#2D9CDB]/30">
                        <td colSpan={5} className="py-3 px-6 text-xs text-[#1B5E7A]">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <strong className="text-[#1E4FA3]">Teacher Observation:</strong>{' '}
                              <span>{item.notes || 'No extra notes recorded.'}</span>
                            </div>
                            <div className="text-gray-500 text-xs font-mono shrink-0">
                              Recorded: {item.createdAt}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="py-12 text-center text-[#1B5E7A]/70 font-medium">
                  {feedbackList.length === 0 ? (
                    <div className="space-y-1">
                      <p className="font-semibold text-base text-[#1B5E7A]">No student feedback submitted yet.</p>
                      <p className="text-xs text-[#1B5E7A]/60">Teacher-submitted student observations will appear here once recorded.</p>
                    </div>
                  ) : (
                    <p>No feedback records found matching your filter.</p>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
