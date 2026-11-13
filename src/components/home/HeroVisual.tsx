'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  ArrowRight, 
  MessageCircle, 
  Send, 
  UserCheck, 
  ExternalLink,
  Flame,
  Calendar,
  Gift,
  Play,
  RefreshCw
} from 'lucide-react';
import { InstagramIcon } from '@/components/common/BrandIcons';
import confetti from 'canvas-confetti';

interface ScenarioData {
  id: string;
  tabLabel: string;
  badge: string;
  accountHandle: string;
  accountName: string;
  postBadge: string;
  postTitle: string;
  postCaption: string;
  postKeyword: string;
  commentUser: string;
  commentText: string;
  dmHeader: string;
  dmBody: string;
  dmButtonText: string;
  dmUserReply: string;
  leadCaptured: string;
}

const SCENARIOS: ScenarioData[] = [
  {
    id: 'comment-pdf',
    tabLabel: '💬 Reel Comment',
    badge: 'High Conversion',
    accountHandle: 'themoderncreator',
    accountName: 'The Modern Creator',
    postBadge: 'Viral Reel',
    postTitle: '2026 Instagram Growth Playbook (45 Pages)',
    postCaption: 'Comment "LINK" below to get the direct download link sent instantly to your DMs!',
    postKeyword: 'LINK',
    commentUser: '@sarah_designs',
    commentText: 'Can I get the LINK please? 🙌',
    dmHeader: 'Hey Sarah! 👋 Thanks for commenting on our Reel!',
    dmBody: 'Here is your private VIP download link for the complete 2026 Instagram Growth Blueprint:',
    dmButtonText: 'Download Free PDF Guide',
    dmUserReply: 'Just downloaded! Amazing, thank you so much! 🔥',
    leadCaptured: 'sarah.d@designstudio.co • +Tag #VIPLead'
  },
  {
    id: 'story-discount',
    tabLabel: '🔥 Story Reply',
    badge: 'E-commerce Lift',
    accountHandle: 'zenith_apparel',
    accountName: 'Zenith Premium Wear',
    postBadge: 'Story Flash Sale',
    postTitle: 'Exclusive 30% Off Weekend Collection',
    postCaption: 'React or reply "DEAL" to this Story to unlock your exclusive checkout discount code.',
    postKeyword: 'DEAL',
    commentUser: '@alex_urban',
    commentText: 'Replying to Story: DEAL 🔥',
    dmHeader: 'Woohoo Alex! 🎉 You unlocked 30% Off!',
    dmBody: 'Use secret promo code VIP30 at checkout today. Free shipping included on orders above $50:',
    dmButtonText: 'Shop With 30% Discount',
    dmUserReply: 'Ordered the jacket! Thanks for the instant coupon 🚀',
    leadCaptured: 'alex.urban@gmail.com • +Tag #Purchased'
  },
  {
    id: 'dm-coach',
    tabLabel: '🎯 Keyword "COACH"',
    badge: 'High Ticket',
    accountHandle: 'marcus_scale',
    accountName: 'Marcus | 7-Figure Mentor',
    postBadge: 'Direct Funnel',
    postTitle: 'Scale to $50k/mo with 1:1 Mentorship',
    postCaption: 'DM me "COACH" to check eligibility and book a complimentary 15-minute game plan call.',
    postKeyword: 'COACH',
    commentUser: '@emily_founder',
    commentText: 'Sent DM: COACH',
    dmHeader: 'Hey Emily! Excited to help you scale.',
    dmBody: 'To see if we are a great fit, select a 15-minute slot on my private calendar below:',
    dmButtonText: 'Book 15-Min Strategy Call',
    dmUserReply: 'Booked for Thursday 3 PM! Excited to chat 🙌',
    leadCaptured: 'emily@techpulse.io • +Tag #BookedCall'
  }
];

export function HeroVisual() {
  const [activeTab, setActiveTab] = useState<string>('comment-pdf');
  const [isSimulating, setIsSimulating] = useState(false);
  const [showSimSuccess, setShowSimSuccess] = useState(false);

  const current = SCENARIOS.find(s => s.id === activeTab) || SCENARIOS[0];

  const handleRunLiveSimulation = () => {
    setIsSimulating(true);
    setShowSimSuccess(false);

    setTimeout(() => {
      setIsSimulating(false);
      setShowSimSuccess(true);

      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.65 },
          colors: ['#a855f7', '#6366f1', '#ec4899']
        });
      } catch {}

      setTimeout(() => setShowSimSuccess(false), 4500);
    }, 900);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto lg:max-w-none">
      {/* Background glow effects */}
      <div className="absolute -top-12 -left-12 w-72 h-72 bg-purple-400/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-indigo-400/30 rounded-full blur-3xl pointer-events-none" />

      {/* Main SaaS Browser / Laptop Frame */}
      <div className="relative rounded-3xl border border-purple-200/90 bg-white/95 backdrop-blur-2xl shadow-2xl shadow-purple-600/20 overflow-hidden transition-all duration-300">
        
        {/* Browser Top Window Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/90" />
            <div className="w-3 h-3 rounded-full bg-amber-500/90" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/90" />
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 text-[11px] font-mono text-purple-300 border border-slate-800 max-w-[220px] sm:max-w-xs truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>https://instadm.dev/app/live-engine</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 font-bold text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              WEBHOOK ACTIVE (142ms)
            </span>
          </div>
        </div>

        {/* Dashboard Canvas Preview */}
        <div className="p-4 sm:p-6 bg-gradient-to-b from-slate-50/90 via-purple-50/30 to-white">
          
          {/* Interactive Scenario Tabs */}
          <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200/80">
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              {SCENARIOS.map((sc) => (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(sc.id);
                    setShowSimSuccess(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === sc.id
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25 scale-[1.02]'
                      : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>{sc.tabLabel}</span>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-extrabold ${activeTab === sc.id ? 'bg-purple-800 text-purple-200' : 'bg-slate-100 text-slate-500'}`}>
                    {sc.badge}
                  </span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleRunLiveSimulation}
              disabled={isSimulating}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-xs hover:opacity-95 transition-all shrink-0 active:scale-95"
            >
              {isSimulating ? (
                <>
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>Simulating...</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-white" />
                  <span>Simulate Send</span>
                </>
              )}
            </button>
          </div>

          {/* Account Bar */}
          <div className="flex items-center justify-between mb-4 bg-white rounded-2xl p-3 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-xs">
                <InstagramIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">@{current.accountHandle}</h4>
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> 24/7 Listening
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{current.accountName} • {current.postTitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-purple-50 border border-purple-200 text-purple-700 font-bold text-[11px] font-mono shadow-2xs">
                Trigger: &quot;{current.postKeyword}&quot;
              </span>
            </div>
          </div>

          {/* Two-Column Interactive Simulation Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            
            {/* Left: Instagram Trigger Source Card */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 p-0.5">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[10px] font-bold text-purple-700">
                      IG
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{current.accountHandle}</div>
                    <div className="text-[10px] text-slate-400">{current.postBadge}</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                  {current.postKeyword}
                </span>
              </div>

              {/* Media Card Graphic */}
              <div className="relative rounded-xl bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 p-4 text-white text-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/25 to-transparent" />
                <Sparkles className="w-5 h-5 text-amber-300 mx-auto mb-1 animate-bounce" />
                <p className="text-xs font-extrabold tracking-wide uppercase text-purple-200">
                  Comment &quot;{current.postKeyword}&quot;
                </p>
                <p className="text-[11px] text-slate-200 font-medium line-clamp-2 mt-0.5">
                  {current.postCaption}
                </p>
              </div>

              {/* Live Comment Notification */}
              <div className="p-3 rounded-xl bg-purple-50/90 border border-purple-200 flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex-shrink-0 flex items-center justify-center text-[10px] font-bold">
                  U
                </div>
                <div className="text-xs space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900">{current.commentUser}</span>
                    <span className="text-[10px] text-slate-400">Just now</span>
                  </div>
                  <p className="text-slate-800 font-semibold text-[11px]">
                    {current.commentText}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-purple-700 mt-1">
                    <Zap className="w-2.5 h-2.5 fill-purple-600 text-purple-600" /> Webhook fired (0.18s)
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Instant Automated DM Response Bubble */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-slate-900">Instagram Direct Message</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  ⚡ Sent in &lt;1.2s
                </span>
              </div>

              {/* DM Conversation Thread */}
              <div className="space-y-3">
                <div className="flex items-start gap-2 max-w-[95%]">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex-shrink-0 flex items-center justify-center text-[10px] font-bold shadow-xs">
                    DM
                  </div>
                  <div className="bg-slate-100 text-slate-900 rounded-2xl rounded-tl-xs p-3 text-xs shadow-2xs space-y-2 border border-slate-200/60">
                    <p className="font-semibold text-slate-900">
                      {current.dmHeader}
                    </p>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      {current.dmBody}
                    </p>
                    
                    {/* Action Button */}
                    <div className="pt-1">
                      <div className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-purple-600/20 hover:scale-[1.01] transition-all cursor-pointer">
                        <span>{current.dmButtonText}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Follower reaction */}
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl rounded-tr-xs p-2.5 text-xs shadow-xs max-w-[85%] font-medium">
                    <p>{current.dmUserReply}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Floating Lead Captured Toast */}
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-purple-200 shadow-xl shadow-purple-900/10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 flex-shrink-0">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-bold text-slate-900">Lead Captured &amp; Verified</p>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-[11px] text-slate-500 font-mono">{current.leadCaptured}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
