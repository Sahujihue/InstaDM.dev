import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';

export function FinalCta() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Large Gradient Card */}
        <div className="relative rounded-3xl sm:rounded-[36px] bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-950 p-8 sm:p-14 lg:p-20 overflow-hidden shadow-2xl shadow-purple-950/30 text-white">
          
          {/* Subtle floating background elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Background Dashboard Mockup Wireframe Graphic */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full opacity-10 pointer-events-none hidden lg:block">
            <svg viewBox="0 0 600 400" className="w-full h-full" fill="none" stroke="currentColor">
              <rect x="20" y="20" width="560" height="360" rx="16" strokeWidth="2" />
              <line x1="20" y1="70" x2="580" y2="70" strokeWidth="2" />
              <rect x="50" y="100" width="140" height="100" rx="8" strokeWidth="2" />
              <rect x="220" y="100" width="140" height="100" rx="8" strokeWidth="2" />
              <rect x="390" y="100" width="140" height="100" rx="8" strokeWidth="2" />
              <rect x="50" y="230" width="480" height="120" rx="8" strokeWidth="2" />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl text-center sm:text-left space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs sm:text-sm font-semibold">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Launch Your First Automation in Under 2 Minutes</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
              Ready to Make Instagram Work for You?
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              Start automating conversations, capturing leads, and growing your business with InstaDM.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
              <Link
                href="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-slate-900 bg-white hover:bg-slate-100 shadow-xl transition-all transform hover:-translate-y-0.5 text-base"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 text-purple-600" />
              </Link>

              <Link
                href="#pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-white bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/40 shadow-sm transition-all text-base"
              >
                <span>View Pricing</span>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-4 text-xs text-purple-200">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> No credit card required
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-300" /> Instant setup &amp; activation
              </span>
              <span>•</span>
              <span>Cancel anytime</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
