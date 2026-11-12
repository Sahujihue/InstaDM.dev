'use client';

import React, { useState } from 'react';
import { 
  Send, 
  Sparkles, 
  MessageCircle, 
  CheckCircle2, 
  ExternalLink, 
  RefreshCw, 
  Zap, 
  Lock,
  ArrowRight
} from 'lucide-react';
import { InstagramIcon } from '@/components/common/BrandIcons';
import confetti from 'canvas-confetti';

interface Scenario {
  id: string;
  name: string;
  keyword: string;
  postTitle: string;
  postCaption: string;
  dmText: string;
  buttonLabel: string;
  leadPlaceholder: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'link',
    name: 'Free Resource PDF',
    keyword: 'LINK',
    postTitle: '🔥 The 2026 Instagram Growth Playbook (45 Pages)',
    postCaption: 'Drop "LINK" in the comments and my automated assistant will send you the direct download link instantly!',
    dmText: 'Hey there! 👋 Thanks for commenting on my post! Here is your private download link for the 2026 Growth Playbook:',
    buttonLabel: 'Download PDF Guide',
    leadPlaceholder: 'Enter your email for bonus templates',
  },
  {
    id: 'deal',
    name: 'E-commerce 30% VIP Code',
    keyword: 'DEAL',
    postTitle: '🏷️ Flash Sale: 30% Off Everything This Weekend!',
    postCaption: 'Want our secret VIP discount code before public release? Comment "DEAL" below to receive it right now in your DMs.',
    dmText: 'Woohoo! 🎉 You unlocked our exclusive VIP discount code: VIP30. Tap below to apply it at checkout:',
    buttonLabel: 'Shop With 30% Discount',
    leadPlaceholder: 'Enter your phone for SMS delivery alerts',
  },
  {
    id: 'coach',
    name: 'Coaching Strategy Call',
    keyword: 'COACH',
    postTitle: '🚀 Ready to Scale Your High-Ticket Business?',
    postCaption: 'I am taking on 5 new private coaching clients this month. Comment "COACH" to apply and book a complimentary 15-min call.',
    dmText: 'Hey! Super excited you reached out. Let’s map out your 90-day growth game plan on a free 15-minute call:',
    buttonLabel: 'Select Your Call Time',
    leadPlaceholder: 'Enter your email to confirm appointment',
  },
];

export function InteractiveDemo() {
  const [activeScenario, setActiveScenario] = useState<Scenario>(SCENARIOS[0]);
  const [commentInput, setCommentInput] = useState<string>('LINK');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [automationTriggered, setAutomationTriggered] = useState<boolean>(false);
  const [capturedEmail, setCapturedEmail] = useState<string>('');
  const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false);

  const handleSelectScenario = (sc: Scenario) => {
    setActiveScenario(sc);
    setCommentInput(sc.keyword);
    setAutomationTriggered(false);
    setEmailSubmitted(false);
    setCapturedEmail('');
  };

  const handleTriggerAutomation = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!commentInput.trim()) return;

    setIsProcessing(true);
    setAutomationTriggered(false);
    setEmailSubmitted(false);

    // Simulate instant Meta webhook round-trip
    setTimeout(() => {
      setIsProcessing(false);
      setAutomationTriggered(true);

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#9333ea', '#6366f1', '#ec4899'],
        });
      } catch {
        // confetti fallback
      }
    }, 700);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (capturedEmail.includes('@')) {
      setEmailSubmitted(true);
      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#6366f1'],
        });
      } catch {
        // ignore
      }
    }
  };

  const handleReset = () => {
    setAutomationTriggered(false);
    setEmailSubmitted(false);
    setCapturedEmail('');
  };

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 via-white to-purple-50/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulated Live Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Try The Live Automation Simulator.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Test how InstaDM works right now. Leave a test comment below and watch the instant Direct Message trigger in real time.
          </p>
        </div>

        {/* Preset Scenarios Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          <span className="text-xs font-semibold text-slate-500 mr-2">Preset Templates:</span>
          {SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(sc)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeScenario.id === sc.id
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-purple-300 hover:bg-purple-50/50'
              }`}
            >
              {sc.name} (<span className="font-mono text-purple-300 font-bold">{sc.keyword}</span>)
            </button>
          ))}
        </div>

        {/* The 2-Column Live Interactive Demo Playground */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Simulated Instagram Post & Comment Input */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-purple-200/90 shadow-xl shadow-purple-500/5 space-y-5">
            
            {/* Instagram Profile Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 p-0.5">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-bold text-xs text-purple-700">
                    IDM
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-slate-900">@instadm_demo</span>
                    <span className="text-[10px] text-purple-600 bg-purple-50 px-1.5 py-0.2 rounded font-semibold border border-purple-200">
                      Verified
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">Instagram Creator</span>
                </div>
              </div>
              <InstagramIcon className="w-5 h-5 text-pink-600" />
            </div>

            {/* Post Media Preview Box */}
            <div className="rounded-2xl bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 p-6 text-white text-center space-y-3 relative overflow-hidden">
              <div className="absolute top-2 right-2 bg-white/10 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono">
                Post #82
              </div>
              <h3 className="text-lg font-extrabold text-purple-200">{activeScenario.postTitle}</h3>
              <p className="text-xs sm:text-sm text-slate-200 font-medium max-w-md mx-auto">
                {activeScenario.postCaption}
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/30 border border-purple-400/40 text-purple-200 text-xs font-bold">
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>Trigger Keyword: &quot;{activeScenario.keyword}&quot;</span>
              </div>
            </div>

            {/* Live Comment Input Box */}
            <form onSubmit={handleTriggerAutomation} className="space-y-3">
              <label className="block text-xs font-bold text-slate-700">
                Leave your test comment below:
              </label>
              
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value.toUpperCase())}
                    placeholder={`Type ${activeScenario.keyword}...`}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm font-bold text-slate-900 uppercase"
                  />
                  <button
                    type="button"
                    onClick={() => setCommentInput(activeScenario.keyword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-purple-600 hover:text-purple-800 bg-purple-100 px-2 py-1 rounded-md"
                  >
                    Use &quot;{activeScenario.keyword}&quot;
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-md shadow-purple-500/25 flex items-center gap-2 flex-shrink-0 transition-all disabled:opacity-50"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Try This Automation</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Demo mode: Safe browser simulation (no real IG account required).</span>
                {automationTriggered && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-purple-600 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <RefreshCw className="w-3 h-3" /> Reset Demo
                  </button>
                )}
              </div>
            </form>

            {/* Comment Log Feed */}
            {automationTriggered && (
              <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200/80 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    YOU
                  </div>
                  <div className="text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">@you (Visitor)</span>
                      <span className="text-[10px] text-slate-400">Just now</span>
                    </div>
                    <p className="text-slate-800 font-semibold mt-0.5">
                      I want the <span className="bg-purple-200 text-purple-900 px-1 py-0.2 rounded font-bold">{commentInput}</span>! 🙌
                    </p>
                    <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1.5 mt-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Webhook received • Automated DM dispatched in 1.1s</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Simulated Smartphone Instagram DM Screen */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-sm bg-slate-950 rounded-[40px] p-4 border-[6px] border-slate-900 shadow-2xl shadow-purple-600/20 text-white relative">
              
              {/* Phone Speaker Notch */}
              <div className="w-28 h-4 bg-slate-900 rounded-full mx-auto mb-3" />

              {/* Instagram DM Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 px-2">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-bold text-xs">
                    IDM
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-slate-950" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <h4 className="text-xs font-bold text-slate-100">instadm_demo</h4>
                    </div>
                    <p className="text-[10px] text-emerald-400">Active now</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-purple-950 text-purple-300 px-2 py-0.5 rounded border border-purple-800">
                  Direct Inbox
                </span>
              </div>

              {/* Inbox Message Container */}
              <div className="py-4 px-1 min-h-[360px] flex flex-col justify-between space-y-4">
                
                {/* Initial conversation state */}
                {!automationTriggered && !isProcessing && (
                  <div className="my-auto text-center space-y-3 px-4">
                    <div className="w-12 h-12 rounded-full bg-purple-900/40 border border-purple-700/50 flex items-center justify-center mx-auto text-purple-300">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-medium text-slate-400">
                      Awaiting trigger... Click <strong>&quot;Try This Automation&quot;</strong> on the left to watch the automated DM arrive!
                    </p>
                  </div>
                )}

                {/* Processing Spinner / Typing Indicator */}
                {isProcessing && (
                  <div className="flex items-center gap-2 bg-slate-900 p-3 rounded-2xl rounded-tl-xs max-w-[200px] border border-slate-800">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]" />
                    <span className="text-xs text-slate-400 ml-1">InstaDM typing...</span>
                  </div>
                )}

                {/* Delivered Automated DM */}
                {automationTriggered && (
                  <div className="space-y-3 animate-in fade-in slide-in-from-bottom-3 duration-400">
                    
                    {/* Timestamp */}
                    <div className="text-center">
                      <span className="text-[10px] text-slate-500">Today • 12:54 PM</span>
                    </div>

                    {/* The Bot's DM Bubble */}
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                        IDM
                      </div>
                      <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-xs p-3.5 text-xs space-y-2.5 max-w-[92%] shadow-md">
                        <p className="text-slate-200 leading-relaxed">
                          {activeScenario.dmText}
                        </p>

                        {/* Interactive CTA Link Button */}
                        <div className="pt-1">
                          <button
                            type="button"
                            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-purple-500/25 transition-all"
                          >
                            <span>{activeScenario.buttonLabel}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Interactive Lead Capture Form */}
                        {!emailSubmitted ? (
                          <form onSubmit={handleEmailSubmit} className="pt-2 border-t border-slate-800 space-y-2">
                            <span className="text-[11px] text-purple-300 font-semibold block">
                              🔒 Direct Lead Capture Demo:
                            </span>
                            <div className="flex gap-1.5">
                              <input
                                type="email"
                                value={capturedEmail}
                                onChange={(e) => setCapturedEmail(e.target.value)}
                                placeholder="name@example.com"
                                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                              />
                              <button
                                type="submit"
                                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                              >
                                Send
                              </button>
                            </div>
                          </form>
                        ) : (
                          <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 text-[11px] flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            <span>Lead captured! Synced to Contacts CRM.</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Delivery Status */}
                    <div className="text-right pr-2">
                      <span className="text-[10px] text-slate-400 flex items-center justify-end gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Delivered via Meta API
                      </span>
                    </div>

                  </div>
                )}

                {/* Simulated Bottom Message Input */}
                <div className="pt-2 border-t border-slate-800/80">
                  <div className="flex items-center justify-between px-3 py-2 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-500">
                    <span>Message...</span>
                    <Send className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
