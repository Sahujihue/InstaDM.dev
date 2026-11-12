import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle2, 
  MessageCircle, 
  Sparkles, 
  Bot, 
  GitFork, 
  Users, 
  Zap, 
  ExternalLink, 
  TrendingUp,
  Tag,
  ShieldCheck,
  Check,
  Send
} from 'lucide-react';

export function FeatureShowcase() {
  return (
    <div className="py-16 sm:py-24 space-y-24 sm:space-y-32 bg-white overflow-hidden">
      
      {/* ============================================================ */}
      {/* BANNER 1: Every Comment Deserves a Conversation */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Left */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>Comment to DM Engine</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Every Comment Deserves a{' '}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Conversation.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Tired of replying &quot;check your DM&quot; hundreds of times? InstaDM automatically detects keyword triggers on your posts and Reels, sends personalized DMs with one-tap link buttons, and leaves a polite public reply.
            </p>

            <ul className="space-y-3 text-sm text-slate-700 font-medium">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Dispatches instant DMs in under 2 seconds.</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Rotates varied public replies to look completely natural.</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Works on all past and future Reels, carousels, and photos.</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 text-sm font-bold text-purple-600 hover:text-purple-700 group"
              >
                <span>Automate your first post comment now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Visual Right: Instagram Post + Automated DM Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-gradient-to-br from-purple-100/70 via-indigo-50/50 to-pink-50/40 p-6 sm:p-8 border border-purple-200/80 shadow-2xl shadow-purple-500/10">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                
                {/* Simulated Post Card */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-md">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center text-xs font-bold">
                      IC
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">@insta_creator</div>
                      <div className="text-[10px] text-slate-400">Viral Reel • 182K views</div>
                    </div>
                  </div>

                  {/* Reel Cover mockup */}
                  <div className="rounded-xl bg-slate-900 text-white p-6 text-center space-y-2 mb-3.5">
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-200 text-[10px] font-bold">
                      FREE RESOURCE
                    </span>
                    <p className="text-sm font-bold">5 High-Converting Instagram DM Funnels</p>
                    <p className="text-[11px] text-slate-300">Comment &quot;LINK&quot; to receive the instant guide</p>
                  </div>

                  {/* Comment trigger */}
                  <div className="bg-purple-50/90 rounded-xl p-3 border border-purple-200 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-800">@design_pro_user</span>
                      <span className="text-slate-400 text-[10px]">Just now</span>
                    </div>
                    <p className="text-xs text-slate-700">
                      Can you send me the <span className="bg-purple-200 text-purple-900 font-bold px-1.5 py-0.5 rounded">LINK</span> please?
                    </p>
                    <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 pt-1">
                      <CheckCircle2 className="w-3 h-3" /> Keyword &quot;LINK&quot; matched • Dispatched DM
                    </div>
                  </div>
                </div>

                {/* Simulated Automated DM Phone Preview */}
                <div className="bg-slate-950 text-white rounded-2xl p-4 border border-slate-800 shadow-xl space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-bold">Instagram Direct</span>
                    </div>
                    <span className="text-[10px] text-purple-300 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
                      Auto-reply: 1.2s
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <div className="bg-slate-900 rounded-2xl rounded-tl-xs p-3 text-xs space-y-2 border border-slate-800">
                      <p className="text-slate-200">
                        Hey there! 👋 Here is your instant access to the <strong>5 High-Converting DM Funnels</strong> blueprint:
                      </p>
                      
                      <div className="p-2.5 rounded-xl bg-purple-900/40 border border-purple-500/40 text-purple-200 text-[11px] flex items-center justify-between">
                        <span>Direct Download (PDF, 8.4MB)</span>
                        <ExternalLink className="w-3.5 h-3.5 text-purple-300" />
                      </div>

                      <button className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-md">
                        Download Free Guide Now
                      </button>
                    </div>

                    <div className="bg-slate-900 rounded-2xl rounded-tl-xs p-2.5 text-[11px] text-slate-300 border border-slate-800">
                      💬 Want our exclusive video walkthrough too? Type <strong>&quot;VIDEO&quot;</strong>!
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* BANNER 2: Your AI Assistant Never Sleeps */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Left: Modern AI Chat Interface */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="relative rounded-3xl bg-gradient-to-br from-indigo-100/80 via-purple-50/50 to-cyan-50/60 p-6 sm:p-8 border border-indigo-200/80 shadow-2xl shadow-indigo-500/10">
              
              <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
                {/* AI Assistant Chat Header */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 text-white">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-slate-900" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold">InstaDM AI Assistant</span>
                        <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-1.5 py-0.2 rounded border border-cyan-800">
                          GPT-4o
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">Trained on Brand Knowledge Base &amp; FAQ</p>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                    Confidence: 98%
                  </span>
                </div>

                {/* Conversation Flow */}
                <div className="p-4 sm:p-5 space-y-3.5 bg-slate-50/70 text-xs">
                  {/* Follower Question */}
                  <div className="flex justify-end">
                    <div className="bg-indigo-600 text-white rounded-2xl rounded-tr-xs p-3 max-w-xs shadow-xs">
                      Do you offer an agency plan with multiple client logins? What is the pricing?
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-xs">
                      AI
                    </div>
                    <div className="bg-white text-slate-800 rounded-2xl rounded-tl-xs p-3.5 max-w-sm border border-slate-200 shadow-xs space-y-2">
                      <p>
                        Yes, absolutely! Our <strong>Agency Plan</strong> is specifically built for multi-client management. It includes:
                      </p>
                      <ul className="list-disc pl-4 space-y-0.5 text-slate-600 text-[11px]">
                        <li>Dedicated client workspaces</li>
                        <li>Up to 10+ Instagram accounts</li>
                        <li>Visual drag-and-drop workflow builder</li>
                        <li>Starts at $79.99/month (or ₹3,999/month)</li>
                      </ul>
                      <p className="text-purple-700 font-semibold pt-1">
                        Would you like me to book a 1-on-1 demo call with our onboarding specialist?
                      </p>
                    </div>
                  </div>

                  {/* Follower Response */}
                  <div className="flex justify-end">
                    <div className="bg-indigo-600 text-white rounded-2xl rounded-tr-xs p-2.5 max-w-xs shadow-xs">
                      Yes please! Tomorrow afternoon works great.
                    </div>
                  </div>

                  {/* AI Automated Calendar Link */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-xs">
                      AI
                    </div>
                    <div className="bg-white text-slate-800 rounded-2xl rounded-tl-xs p-3 border border-slate-200 shadow-xs space-y-2">
                      <p>Awesome! Here is our priority calendar link:</p>
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 font-semibold">
                        <CalendarIcon className="w-4 h-4" />
                        <span>instadm.dev/demo/vip-booking</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Text Right */}
          <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
              <Bot className="w-3.5 h-3.5" />
              <span>Smart AI Conversationalist</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Your AI Assistant{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Never Sleeps.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Equip your brand with an intelligent AI chatbot that speaks with your unique voice. It reads customer questions, qualifies buyer intent, addresses objections, and books sales appointments 24/7.
            </p>

            <ul className="space-y-3 text-sm text-slate-700 font-medium">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Upload your website URL, FAQs, and pricing PDF in seconds.</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Smooth human handoff when a lead requests a live team member.</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Zero hallucinations — strictly adheres to your guardrails.</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 group"
              >
                <span>Deploy your AI assistant today</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* BANNER 3: Build Smart Automations Without Coding */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Left */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider">
              <GitFork className="w-3.5 h-3.5" />
              <span>Drag &amp; Drop Canvas</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Build Smart Automations{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Without Coding.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Design complex multi-step journeys visually. Drag triggers, conditional splits (like &quot;Is User Following?&quot;), delay timers, AI evaluations, and webhooks onto an infinite canvas.
            </p>

            <ul className="space-y-3 text-sm text-slate-700 font-medium">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Visual node editor with real-time test execution.</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Conditional branching based on follower status, tags, &amp; clicks.</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Pre-built templates for e-commerce, webinars, coaches &amp; creators.</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/dashboard/flow-builder"
                className="inline-flex items-center gap-2 text-sm font-bold text-purple-600 hover:text-purple-700 group"
              >
                <span>Open interactive visual flow builder</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Visual Right: Visual Flow Builder Canvas Mockup */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-slate-950 p-6 sm:p-8 border border-slate-800 shadow-2xl shadow-purple-950/40">
              
              {/* Canvas Toolbar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-white font-bold">Workflow: Webinar Funnel 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-slate-800 text-purple-300 font-mono text-[11px] border border-slate-700">
                    Zoom: 100%
                  </span>
                  <span className="px-3 py-1 rounded bg-purple-600 text-white font-bold text-[11px]">
                    Active
                  </span>
                </div>
              </div>

              {/* Node Graph Mockup */}
              <div className="space-y-4">
                {/* Node 1: Trigger */}
                <div className="p-3.5 rounded-xl bg-purple-900/40 border border-purple-500/50 text-white shadow-md max-w-md">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-purple-300 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-purple-400" /> TRIGGER: Reel Comment
                    </span>
                    <span className="text-[10px] bg-purple-800/80 px-1.5 py-0.5 rounded text-purple-200">Start</span>
                  </div>
                  <p className="text-xs text-slate-300">Contains keywords: &quot;WEBINAR&quot; or &quot;REGISTER&quot;</p>
                </div>

                <div className="pl-6 text-purple-400 text-xs flex items-center gap-2">
                  <div className="w-0.5 h-4 bg-purple-500" />
                  <span>Downstream flow</span>
                </div>

                {/* Node 2: Condition */}
                <div className="p-3.5 rounded-xl bg-indigo-900/40 border border-indigo-500/50 text-white shadow-md max-w-md ml-4">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-indigo-300 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> CONDITION: Follow Check
                    </span>
                    <span className="text-[10px] bg-indigo-800/80 px-1.5 py-0.5 rounded text-indigo-200">Branch</span>
                  </div>
                  <p className="text-xs text-slate-300">Is follower following @themoderncreator?</p>
                </div>

                <div className="pl-10 text-indigo-400 text-xs flex items-center gap-2">
                  <div className="w-0.5 h-4 bg-indigo-500" />
                  <span>If YES ➔ Send Direct Access Link</span>
                </div>

                {/* Node 3: Action Message */}
                <div className="p-3.5 rounded-xl bg-emerald-900/40 border border-emerald-500/50 text-white shadow-md max-w-md ml-8">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" /> ACTION: Send DM &amp; Collect Email
                    </span>
                    <span className="text-[10px] bg-emerald-800/80 px-1.5 py-0.5 rounded text-emerald-200">Delivery</span>
                  </div>
                  <p className="text-xs text-slate-300">&quot;You&apos;re in! What email should we send the Zoom link to?&quot;</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* BANNER 4: Turn Conversations Into Customers */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Left: Lead CRM Dashboard Mockup */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="relative rounded-3xl bg-gradient-to-br from-emerald-100/70 via-teal-50/50 to-purple-50/40 p-6 sm:p-8 border border-emerald-200/80 shadow-2xl shadow-emerald-500/10">
              
              <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
                {/* Mini CRM Header */}
                <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">Captured Contact Pipeline</h4>
                    <p className="text-[11px] text-slate-400">3,842 verified contacts collected</p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500 text-white font-bold text-xs">
                    +38 New Today
                  </span>
                </div>

                {/* Contacts Table Mockup */}
                <div className="divide-y divide-slate-100 text-xs">
                  {/* Row 1 */}
                  <div className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
                        SJ
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">Sarah Jenkins</div>
                        <div className="text-slate-500 text-[11px]">sarah.j@creativestudio.io</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-700 text-[10px] font-semibold">
                        #ReelComment
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[10px] font-semibold">
                        Qualified
                      </span>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                        AM
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">Alexandre Mercier</div>
                        <div className="text-slate-500 text-[11px]">alex@branddirect.co</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 text-[10px] font-semibold">
                        #VIPVoucher
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[10px] font-semibold">
                        $149 Buyer
                      </span>
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold text-xs">
                        RV
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">Rohit Verma</div>
                        <div className="text-slate-500 text-[11px]">rohit.v@fitlife.in</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-pink-100 text-pink-700 text-[10px] font-semibold">
                        #StrategyCall
                      </span>
                      <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-[10px] font-semibold">
                        Booked
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom sync status */}
                <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Auto-synced to Google Sheets, Klaviyo &amp; Zapier
                  </span>
                  <span className="font-semibold text-purple-700">Export CSV</span>
                </div>
              </div>

            </div>
          </div>

          {/* Text Right */}
          <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span>Built-in Lead CRM</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Turn Conversations Into{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">
                Customers.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Don’t leave interested followers stuck in your inbox. Capture verified email addresses and phone numbers during the conversation, tag each lead based on their interests, and sync to your marketing stack.
            </p>

            <ul className="space-y-3 text-sm text-slate-700 font-medium">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Automated regex validation for emails and phone numbers.</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Instant CSV export with full conversation histories.</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>1-click webhooks to HubSpot, ActiveCampaign, and Salesforce.</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/dashboard/contacts"
                className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700 group"
              >
                <span>Explore contact management features</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
