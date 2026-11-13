import React from 'react';
import Link from 'next/link';
import { HeroVisual } from './HeroVisual';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Sparkles, Star } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative pt-6 pb-20 lg:pt-12 lg:pb-32 overflow-hidden bg-gradient-to-b from-purple-50/50 via-white to-slate-50/60">
      {/* Decorative high-tech grid & gradient background blurs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-200/50 via-indigo-100/30 to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Copy & CTAs */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-6">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-purple-200/90 text-purple-800 text-xs sm:text-sm font-semibold shadow-xs backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600"></span>
              </span>
              <span>Official Meta Graph API v21.0 Compliant • Zero Password Delegation</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Turn Every Instagram Interaction Into a{' '}
              <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
                Customer.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Automate Instagram DMs, reply to Reel comments in &lt;1.2 seconds, capture verified email leads, and multiply your course, coaching, and e-commerce sales on autopilot.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 shadow-xl shadow-purple-600/25 hover:shadow-2xl hover:shadow-purple-600/40 transition-all transform hover:-translate-y-0.5 text-base active:scale-95"
              >
                <span>Start Free Today</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="#features"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-xs hover:border-purple-300 transition-all text-base"
              >
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Explore Features</span>
              </Link>
            </div>

            {/* Social Proof Star Ratings & Creator Avatar Stack */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <div className="flex -space-x-2.5 overflow-hidden">
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80"
                  alt="Creator"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80"
                  alt="Creator"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80"
                  alt="Creator"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80"
                  alt="Creator"
                />
                <div className="inline-flex h-9 w-9 rounded-full ring-2 ring-white bg-purple-600 text-white items-center justify-center text-[10px] font-bold">
                  +14k
                </div>
              </div>

              <div className="text-left text-xs space-y-0.5">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="font-bold text-slate-800 ml-1">4.9 / 5.0</span>
                </div>
                <p className="text-slate-500 font-medium">
                  Trusted by 14,000+ top Instagram creators, coaches &amp; brands
                </p>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="pt-4 border-t border-slate-200/70">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs sm:text-sm font-medium text-slate-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>No coding required</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <span>1-Click Instagram connection</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>100% Meta compliant &amp; ban-safe</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Product Banner */}
          <div className="lg:col-span-6 w-full">
            <HeroVisual />
          </div>

        </div>
      </div>
    </section>
  );
}
