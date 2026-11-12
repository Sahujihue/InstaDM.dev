'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, X } from 'lucide-react';

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative isolate flex items-center justify-center gap-x-3 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 px-4 py-2.5 text-xs sm:text-sm font-medium text-white shadow-sm overflow-hidden border-b border-purple-500/20">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent pointer-events-none" />

      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-purple-300" />
          <span>New</span>
        </span>
        <span className="text-slate-200 font-normal sm:font-medium">
          Automate your Instagram DMs and grow your business 24/7.
        </span>
      </div>

      <Link
        href="#features"
        className="inline-flex items-center gap-1 font-semibold text-purple-300 hover:text-white transition-colors underline-offset-4 hover:underline ml-1"
      >
        <span>Explore Features</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>

      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
        aria-label="Dismiss banner"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
