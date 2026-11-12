import React from 'react';
import { 
  Sliders, 
  TrendingUp, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Lock 
} from 'lucide-react';
import { InstagramIcon } from '@/components/common/BrandIcons';
import Link from 'next/link';

export function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Connect Instagram',
      description: 'Securely connect an eligible Instagram Business or Creator account using official Meta OAuth in less than 60 seconds.',
      icon: InstagramIcon,
      accent: 'from-purple-600 to-pink-500',
      illustration: (
        <div className="bg-slate-900 rounded-2xl p-4 text-white border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" /> Meta Official OAuth
            </span>
            <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">256-Bit SSL</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/80 border border-slate-700">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-bold text-xs">
              IG
            </div>
            <div className="text-left text-xs">
              <p className="font-bold">@your_instagram_handle</p>
              <p className="text-[11px] text-emerald-400 font-medium">✓ Verified Business / Creator</p>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 text-center">Never asks for password • Official Graph API safe</p>
        </div>
      ),
    },
    {
      step: '02',
      title: 'Create Automation',
      description: 'Choose a trigger (comment, story, or direct message), set your keyword, and customize your automated message with buttons and links.',
      icon: Sliders,
      accent: 'from-indigo-600 to-purple-600',
      illustration: (
        <div className="bg-slate-900 rounded-2xl p-4 text-white border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-purple-300 font-semibold">Trigger Configuration</span>
            <span className="text-[10px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded border border-purple-800">
              Keyword: &quot;LINK&quot;
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-left text-xs space-y-1">
            <span className="text-slate-400 text-[10px]">Automated DM Preview:</span>
            <p className="text-slate-200 text-[11px]">
              &quot;Thanks for commenting! Grab your exclusive discount code here: [Button]&quot;
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-purple-300 bg-purple-900/40 py-1.5 rounded-lg border border-purple-700/50">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Turn On Automation</span>
          </div>
        </div>
      ),
    },
    {
      step: '03',
      title: 'Grow Your Business',
      description: 'Let eligible interactions trigger automated conversations while you sleep. Capture leads, generate clicks, and watch sales roll in.',
      icon: TrendingUp,
      accent: 'from-pink-500 to-rose-600',
      illustration: (
        <div className="bg-slate-900 rounded-2xl p-4 text-white border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Running 24/7 Autopilot
            </span>
            <span className="text-slate-400 text-[10px]">Real-time</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-left">
            <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
              <p className="text-[10px] text-slate-400">DMs Delivered</p>
              <p className="text-base font-black text-white">4,812</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
              <p className="text-[10px] text-slate-400">Leads Captured</p>
              <p className="text-base font-black text-emerald-400">1,940</p>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 text-center">Seamless conversion without lifting a finger</p>
        </div>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-gradient-to-b from-white via-purple-50/30 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Seamless 3-Step Setup</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            How InstaDM Works.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            From zero to automated lead generation in three straightforward steps. No technical headaches or complex code required.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="relative bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-lg shadow-purple-500/5 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Step Number and Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${s.accent} text-white flex items-center justify-center shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-slate-200 font-mono">
                      {s.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2.5">
                    {s.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {s.description}
                  </p>
                </div>

                {/* Illustration Preview */}
                <div className="pt-2">
                  {s.illustration}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md shadow-purple-500/20 hover:shadow-lg transition-all"
          >
            <span>Set up your Instagram account in 2 minutes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
