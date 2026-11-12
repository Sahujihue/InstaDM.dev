'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { INITIAL_ACCOUNTS, INITIAL_AUTOMATIONS, INITIAL_LEADS } from '@/lib/data';
import { InstagramIcon } from '@/components/common/BrandIcons';
import {
  MessageSquare,
  Zap,
  Users,
  TrendingUp,
  Plus,
  ArrowUpRight,
  Clock,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Filter,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { CreateAutomationModal } from '@/components/dashboard/CreateAutomationModal';
import { Automation } from '@/types';

export default function DashboardOverviewPage() {
  const { user } = useAuth();
  const [automations, setAutomations] = useState<Automation[]>(INITIAL_AUTOMATIONS);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Stats calculation
  const totalDms = automations.reduce((acc, curr) => acc + curr.totalDelivered, 0);
  const activeAutomationsCount = automations.filter(a => a.status === 'ACTIVE').length;
  const totalLeads = INITIAL_LEADS.length + 3842; // base + sample

  const handleSaveAutomation = (newAuto: Automation) => {
    setAutomations([newAuto, ...automations]);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/30 text-purple-200 text-xs font-semibold border border-purple-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Autopilot Engine Live</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Welcome back, {user?.name || 'Creator'}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Your automations are active and ready. Over the past 24 hours, InstaDM replied to 1,420 interactions with a 99.8% delivery rate.
          </p>
        </div>

        <div className="relative z-10 flex-shrink-0">
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-md transition-all transform hover:scale-105"
          >
            <Plus className="w-4 h-4 text-purple-600" />
            <span>Create New Automation</span>
          </button>
        </div>
      </div>

      {/* 4 Key Performance Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Connected Accounts</span>
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <InstagramIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{INITIAL_ACCOUNTS.length}</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">All Healthy</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">@themoderncreator, @zenith...</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Automated DMs</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{totalDms.toLocaleString()}</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +18.4%
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">Avg delivery response: 1.4s</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Automations</span>
            <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{activeAutomationsCount}</span>
            <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">Running</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">Reel comments &amp; DM keywords</p>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Leads Captured</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{totalLeads.toLocaleString()}</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +24% MoM
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">Verified emails &amp; phone contacts</p>
        </div>
      </div>

      {/* Main Grid: Automations Table & Live Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 8 Cols: Active Automations Manager */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Active Automations</h3>
              <p className="text-xs text-slate-500">Monitor trigger volume, delivered DMs, and click-through rates</p>
            </div>
            <Link
              href="/dashboard/automations"
              className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {automations.map((auto) => (
              <div key={auto.id} className="p-5 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1 max-w-md">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{auto.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                      auto.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {auto.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>Keywords:</span>
                    {auto.triggerKeywords.map((k) => (
                      <span key={k} className="px-1.5 py-0.2 rounded bg-purple-50 text-purple-700 font-mono font-bold text-[11px]">
                        {k}
                      </span>
                    ))}
                    <span>• {auto.type.replace(/_/g, ' ')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs text-right">
                  <div>
                    <span className="text-[10px] text-slate-400 block">DMs Delivered</span>
                    <span className="font-bold text-slate-800 text-sm">{auto.totalDelivered.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Leads</span>
                    <span className="font-bold text-purple-600 text-sm">{auto.leadsCollected.toLocaleString()}</span>
                  </div>
                  <Link
                    href="/dashboard/flow-builder"
                    className="p-2 rounded-xl text-slate-400 hover:text-purple-600 hover:bg-purple-50"
                    title="Edit in Flow Builder"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 4 Cols: Live Activity Feed */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <h3 className="text-sm font-bold text-slate-900">Live Interaction Feed</h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Real-time</span>
          </div>

          <div className="space-y-3.5">
            {INITIAL_LEADS.map((lead) => (
              <div key={lead.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">@{lead.instagramUsername}</span>
                  <span className="text-[10px] text-slate-400">{lead.capturedAt}</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Triggered <strong>{lead.sourceAutomationName}</strong>
                </p>
                {lead.email && (
                  <div className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono">
                    ✓ Email: {lead.email}
                  </div>
                )}
              </div>
            ))}
          </div>

          <Link
            href="/dashboard/contacts"
            className="block text-center text-xs font-bold text-purple-600 hover:underline pt-2"
          >
            Open Contacts Database ➔
          </Link>
        </div>

      </div>

      {/* Create Automation Modal with Post & Story Selector */}
      <CreateAutomationModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleSaveAutomation}
      />

    </div>
  );
}
