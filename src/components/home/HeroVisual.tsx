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
  ExternalLink 
} from 'lucide-react';
import { InstagramIcon } from '@/components/common/BrandIcons';

export function HeroVisual() {
  const [activeStep, setActiveStep] = useState<number>(2);

  return (
    <div className="relative w-full max-w-2xl mx-auto lg:max-w-none">
      {/* Background glow effects */}
      <div className="absolute -top-12 -left-12 w-72 h-72 bg-purple-400/25 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-indigo-400/25 rounded-full blur-3xl pointer-events-none" />

      {/* Main SaaS Browser / Laptop Frame */}
      <div className="relative rounded-2xl sm:rounded-3xl border border-purple-200/80 bg-white/90 backdrop-blur-xl shadow-2xl shadow-purple-600/15 overflow-hidden transition-all duration-300">
        
        {/* Browser Top Window Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/90" />
            <div className="w-3 h-3 rounded-full bg-amber-500/90" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/90" />
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800 text-[11px] font-mono text-purple-300 border border-slate-700/60 max-w-[200px] sm:max-w-xs truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>https://instadm.dev/app/live-engine</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-700/50 font-semibold text-[10px]">
              META VERIFIED API
            </span>
          </div>
        </div>

        {/* Dashboard Canvas Preview */}
        <div className="p-4 sm:p-6 bg-gradient-to-b from-slate-50/80 to-purple-50/30">
          
          {/* Dashboard Mini Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-sm">
                <InstagramIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">@themoderncreator</h4>
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Live Automation
                  </span>
                </div>
                <p className="text-xs text-slate-500">Post #104: 2026 Growth Playbook Launch</p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium shadow-2xs">
                Keyword: <span className="font-bold text-purple-600">&quot;LINK&quot;</span>
              </span>
            </div>
          </div>

          {/* Workflow Sequence Visualization */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
            {/* Step 1: Trigger */}
            <div 
              onClick={() => setActiveStep(1)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                activeStep === 1 
                  ? 'bg-purple-50/90 border-purple-400 ring-2 ring-purple-400/20 shadow-sm' 
                  : 'bg-white/80 border-slate-200 hover:border-purple-200'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-purple-900 flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-purple-600" /> 1. Trigger
                </span>
                <span className="text-[10px] text-purple-600 bg-purple-100 font-semibold px-1.5 py-0.2 rounded">Reel Comment</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">Detects keyword <span className="font-bold text-purple-700">&quot;LINK&quot;</span> in comments</p>
            </div>

            {/* Step 2: Instant Action */}
            <div 
              onClick={() => setActiveStep(2)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                activeStep === 2 
                  ? 'bg-purple-50/90 border-purple-400 ring-2 ring-purple-400/20 shadow-sm' 
                  : 'bg-white/80 border-slate-200 hover:border-purple-200'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-indigo-900 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-indigo-600" /> 2. Auto DM
                </span>
                <span className="text-[10px] text-emerald-600 bg-emerald-50 font-semibold px-1.5 py-0.2 rounded border border-emerald-200">&lt; 1.8s</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">Dispatches private DM with button &amp; link</p>
            </div>

            {/* Step 3: Lead Capture */}
            <div 
              onClick={() => setActiveStep(3)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                activeStep === 3 
                  ? 'bg-purple-50/90 border-purple-400 ring-2 ring-purple-400/20 shadow-sm' 
                  : 'bg-white/80 border-slate-200 hover:border-purple-200'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-pink-900 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-pink-600" /> 3. Lead Sync
                </span>
                <span className="text-[10px] text-pink-700 bg-pink-50 font-semibold px-1.5 py-0.2 rounded">Auto CRM</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">Captures email &amp; tags contact</p>
            </div>
          </div>

          {/* Interactive Live Simulation Window inside Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            
            {/* Left: Instagram Simulated Reel Post Card */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs">
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 p-0.5">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[10px] font-bold text-purple-700">
                    MC
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">themoderncreator</div>
                  <div className="text-[10px] text-slate-400">Instagram Reel</div>
                </div>
              </div>

              {/* Reel Media Placeholder */}
              <div className="relative rounded-lg bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 p-4 text-white text-center overflow-hidden mb-3">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/30 to-transparent" />
                <Sparkles className="w-6 h-6 text-yellow-300 mx-auto mb-1 animate-bounce" />
                <p className="text-xs font-extrabold tracking-wide uppercase text-purple-200">
                  Comment &quot;LINK&quot;
                </p>
                <p className="text-[11px] text-slate-200 font-medium">
                  to get our complete 2026 Growth Blueprint sent directly to your DMs!
                </p>
              </div>

              {/* Instagram Comment Notification */}
              <div className="p-2.5 rounded-lg bg-purple-50/80 border border-purple-200/80 flex items-start gap-2.5 animate-fadeIn">
                <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex-shrink-0 flex items-center justify-center text-[10px] font-bold">
                  SJ
                </div>
                <div className="text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900">@sarah_creative</span>
                    <span className="text-[10px] text-slate-400">12s ago</span>
                  </div>
                  <p className="text-slate-800 font-semibold mt-0.5">
                    Can I get the <span className="text-purple-600 bg-purple-200/60 px-1 py-0.2 rounded font-bold">LINK</span> please? 🙌
                  </p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-purple-700 mt-1">
                    <Zap className="w-2.5 h-2.5 fill-purple-600" /> Triggered automation #104
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Automated DM Message in Direct Inbox Preview */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-slate-900">Instagram Direct Message</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Delivered in 1.4s</span>
              </div>

              {/* DM Bubble */}
              <div className="space-y-2.5">
                <div className="flex items-start gap-2 max-w-[90%]">
                  <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex-shrink-0 flex items-center justify-center text-[10px] font-bold">
                    DM
                  </div>
                  <div className="bg-slate-100 text-slate-800 rounded-2xl rounded-tl-xs p-3 text-xs shadow-xs space-y-2">
                    <p className="font-medium">
                      Hey Sarah! 👋 Thanks for commenting on our Reel!
                    </p>
                    <p className="text-slate-600 text-[11px]">
                      Here is your instant VIP access to our <strong>2026 Instagram Growth Playbook</strong> (PDF + Templates):
                    </p>
                    
                    {/* Interactive Button */}
                    <div className="pt-1">
                      <div className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs shadow-sm hover:from-purple-500 hover:to-indigo-500 transition-all cursor-pointer">
                        <span>Download 2026 Playbook</span>
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Follower response simulation */}
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl rounded-tr-xs p-2.5 text-xs shadow-xs max-w-[80%]">
                    <p className="font-medium">Just downloaded! Thanks for the instant link! 🔥</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Lead Capture Notification Card (Bottom Right) */}
        <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-purple-200 shadow-xl shadow-purple-900/10 flex items-center gap-3 animate-bounce-slow">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center border border-emerald-200 flex-shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-bold text-slate-900">Lead Captured &amp; Verified</p>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <p className="text-[11px] text-slate-500">sarah.j@creativestudio.io • +Tag #VIPLead</p>
          </div>
        </div>

        {/* Floating Stats Pill (Top Right) */}
        <div className="absolute top-14 right-4 sm:top-16 sm:right-6 bg-slate-900/90 text-white backdrop-blur-md rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg border border-purple-500/30 hidden sm:flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>4,210 DMs sent today</span>
          <span className="text-emerald-400 font-mono text-[11px]">99.8% rate</span>
        </div>
      </div>
    </div>
  );
}
