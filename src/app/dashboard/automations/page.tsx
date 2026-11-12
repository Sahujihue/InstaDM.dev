'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { INITIAL_AUTOMATIONS } from '@/lib/data';
import { Automation } from '@/types';
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
  GitFork
} from 'lucide-react';

export default function AutomationsPage() {
  const [automations, setAutomations] = useState<Automation[]>(INITIAL_AUTOMATIONS);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  const filtered = automations.filter((a) => {
    if (filterType !== 'ALL' && a.type !== filterType) return false;
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
            Automations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Build, monitor, and optimize your comment triggers, story replies, and DM keywords.
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
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Automation</span>
          </Link>
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
            placeholder="Search campaigns or keywords..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {[
            { id: 'ALL', label: 'All Types' },
            { id: 'COMMENT_TO_DM', label: 'Comment to DM' },
            { id: 'STORY_REPLY', label: 'Story Reply' },
            { id: 'DM_KEYWORD', label: 'DM Keywords' },
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

      {/* Automations List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          {filtered.map((auto) => (
            <div
              key={auto.id}
              className="p-5 sm:p-6 hover:bg-slate-50/60 transition-colors flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
            >
              {/* Left Column: Info */}
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-2.5">
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
                </div>

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
                    Type: {auto.type.replace(/_/g, ' ')}
                  </span>
                </div>

                <p className="text-xs text-slate-600 italic bg-slate-50 p-2 rounded-lg border border-slate-100 line-clamp-1">
                  &quot;{auto.replyMessage}&quot;
                </p>
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

                <Link
                  href="/dashboard/flow-builder"
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                >
                  Edit Flow
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
