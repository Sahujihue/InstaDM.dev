import React from 'react';
import Link from 'next/link';
import { HeroVisual } from './HeroVisual';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative pt-6 pb-20 lg:pt-12 lg:pb-32 overflow-hidden bg-gradient-to-b from-purple-50/40 via-white to-slate-50/50">
      {/* Decorative gradient background blurs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-200/40 via-indigo-100/20 to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Copy & CTAs */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-6">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 border border-purple-200/80 text-purple-800 text-xs sm:text-sm font-semibold shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-purple-600 animate-pulse" />
              <span>Official Meta Instagram Messaging Partner Compliant</span>
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
              Automate Instagram DMs, reply to comments instantly, capture leads, and convert followers into customers — all on autopilot.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-size-200 hover:bg-pos-100 shadow-xl shadow-purple-600/25 hover:shadow-2xl hover:shadow-purple-600/35 transition-all transform hover:-translate-y-0.5 text-base"
              >
                <span>Start Free Today</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="#features"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/80 shadow-xs hover:border-purple-200 transition-all text-base"
              >
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Explore Features</span>
              </Link>
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
                  <span>Easy Instagram connection</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>Automated conversations 24/7</span>
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
