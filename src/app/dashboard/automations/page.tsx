'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { INITIAL_AUTOMATIONS, INITIAL_INSTAGRAM_POSTS } from '@/lib/data';
import { Automation } from '@/types';
import { CreateAutomationModal } from '@/components/dashboard/CreateAutomationModal';
import { 
  Zap, 
  Plus, 
  Search, 
  Filter, 
  MessageSquare, 
  Sparkles, 
  KeyRound, 
  Radio, 
  Play, 
  Pause, 
  MoreHorizontal,
  ExternalLink,
  CheckCircle2,
  GitFork,
  Image as ImageIcon,
  Film,
  Layers,
  Check,
  Trash2
} from 'lucide-react';

export default function AutomationsPage() {
  const [automations, setAutomations] = useState<Automation[]>(INITIAL_AUTOMATIONS);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleStatus = (id: string) => {
    setAutomations(automations.map((a) => {
      if (a.id === id) {
        return {
          ...a,
          status: a.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE',
        };
      }
      return a;
    }));
  };

  const handleSaveAutomation = (newAuto: Automation) => {
    setAutomations([newAuto, ...automations]);
  };

  const handleDeleteAutomation = (id: string) => {
    setAutomations(automations.filter((a) => a.id !== id));
  };

  const filtered = automations.filter((a) => {
    if (filterType === 'POST' && a.type !== 'COMMENT_TO_DM') return false;
    if (filterType === 'STORY' && a.type !== 'STORY_REPLY') return false;
    if (filterType === 'DM_KEYWORD' && a.type !== 'DM_KEYWORD') return false;
    if (searchQuery && !a.name.toLowerCase().includes(searchQuery.toLowerCase()) && !a.triggerKeywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Automations Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure comment-to-DM funnels for specific Instagram posts, Reels, and active Stories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/flow-builder"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-50 font-bold text-xs sm:text-sm transition-colors"
          >
            <GitFork className="w-4 h-4" />
            <span>Open Flow Canvas</span>
          </Link>

          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-500/25 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Automation (Select Post/Story)</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search campaigns, posts, or keywords..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Filter Pills with Post & Story options */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {[
            { id: 'ALL', label: 'All Automations' },
            { id: 'POST', label: '📸 Posts & Reels' },
            { id: 'STORY', label: '📱 Stories' },
            { id: 'DM_KEYWORD', label: '🔑 DM Keywords' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filterType === f.id
                  ? 'bg-purple-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Automations List with Visual Post/Story Attachment Previews */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          {filtered.map((auto) => {
            const hasThumbnail = auto.selectedPostThumbnail || auto.postThumbnail || (auto.type === 'COMMENT_TO_DM' ? INITIAL_INSTAGRAM_POSTS[0].thumbnail : undefined);

            return (
              <div
                key={auto.id}
                className="p-5 sm:p-6 hover:bg-slate-50/60 transition-colors flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
              >
                {/* Left Column: Post Thumbnail + Details */}
                <div className="flex items-start gap-4 max-w-xl">
                  {/* Visual Post / Story Thumbnail */}
                  {hasThumbnail && (
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 flex-shrink-0 shadow-xs group">
                      <img
                        src={hasThumbnail}
                        alt="Post Attachment"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute bottom-1 left-1 px-1.5 py-0.2 rounded bg-black/80 text-white font-mono text-[9px] font-bold">
                        {auto.type === 'STORY_REPLY' ? 'STORY' : 'POST'}
                      </span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">{auto.name}</h3>
                      
                      <button
                        onClick={() => toggleStatus(auto.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition-colors ${
                          auto.status === 'ACTIVE'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {auto.status === 'ACTIVE' ? (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>ACTIVE</span>
                          </>
                        ) : (
                          <>
                            <Pause className="w-2.5 h-2.5" />
                            <span>PAUSED</span>
                          </>
                        )}
                      </button>

                      {/* Scope Badge */}
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {auto.targetScope === 'ALL_POSTS' ? 'All Posts & Reels' : auto.targetScope === 'NEXT_POST' ? 'Next Upcoming Post' : auto.targetScope === 'SPECIFIC_STORY' ? 'Specific Story' : 'Specific Post / Reel'}
                      </span>
                    </div>

                    {/* Keywords */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">Trigger Keywords:</span>
                      {auto.triggerKeywords.map((k) => (
                        <span
                          key={k}
                          className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-mono font-bold text-xs border border-purple-100"
                        >
                          &quot;{k}&quot;
                        </span>
                      ))}
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-600 font-medium">
                        {auto.matchType === 'EXACT' ? 'Exact Match' : 'Contains Keyword'}
                      </span>
                    </div>

                    {/* Target Caption / Message Preview */}
                    <p className="text-xs text-slate-600 italic bg-slate-50 p-2 rounded-lg border border-slate-100 line-clamp-1">
                      DM: &quot;{auto.replyMessage}&quot;
                    </p>
                  </div>
                </div>

                {/* Right Column: Performance Stats */}
                <div className="flex items-center gap-6 sm:gap-8 text-xs w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Triggers</span>
                    <span className="text-base font-black text-slate-900">{auto.totalTriggers.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Delivered</span>
                    <span className="text-base font-black text-slate-900">{auto.totalDelivered.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Link Clicks</span>
                    <span className="text-base font-black text-indigo-600">{auto.linkClicks.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Leads</span>
                    <span className="text-base font-black text-purple-600">{auto.leadsCollected.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Link
                      href="/dashboard/flow-builder"
                      className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors flex items-center gap-1"
                    >
                      <span>Edit</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDeleteAutomation(auto.id)}
                      title="Delete Automation"
                      className="p-1.5 rounded-xl border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Post & Story Selection Modal */}
      <CreateAutomationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveAutomation}
      />

    </div>
  );
}
