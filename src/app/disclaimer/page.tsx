'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { ArrowLeft, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        
        {/* Navigation Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        {/* Page Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Official Legal Notice</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Disclaimer &amp; Meta API Compliance
          </h1>
          <p className="text-xs text-slate-400 font-mono">Last Updated: November 12, 2026</p>
        </div>

        {/* Legal Text Content */}
        <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-600 space-y-6 leading-relaxed">
          <section className="space-y-2 bg-slate-50 p-6 rounded-3xl border border-slate-200">
            <h2 className="text-base font-bold text-slate-900">1. Non-Affiliation with Meta Platforms, Inc.</h2>
            <p>
              InstaDM (<code>https://instadm.dev</code>) is an independent SaaS software platform developed and maintained by independent engineers. InstaDM is <strong>NOT affiliated with, sponsored by, endorsed by, certified by, or officially associated with Meta Platforms, Inc., Instagram, or Facebook</strong> in any manner.
            </p>
            <p>
              &quot;Instagram&quot;, &quot;Facebook&quot;, &quot;Meta&quot;, and related logos and marks are registered trademarks of Meta Platforms, Inc. Any references to these marks on this site are solely for nominative purposes to describe software compatibility with Meta&apos;s publicly accessible developer platforms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Official Meta Graph API Independence</h2>
            <p>
              InstaDM operates strictly through sanctioned, public Meta Graph API v21.0 endpoints. We never scrape private user interfaces or collect login passwords. Meta retains full unilateral authority over its API policies, rate limits, and platform features. While InstaDM engineers work diligently to maintain 99.8% uptime, changes enacted by Meta may occasionally affect message delivery rates or feature availability.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Earnings &amp; Conversion Results Disclaimer</h2>
            <p>
              Any revenue metrics, conversion statistics, or follower growth figures presented across our website, marketing materials, or case studies represent sample or historical creator results. They are provided solely for educational and illustrative purposes.
            </p>
            <p>
              InstaDM does not guarantee specific sales, lead volumes, or revenue increases. Individual success depends on numerous factors outside our control, including your audience size, product quality, offer relevance, and marketing acumen.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. User Responsibility &amp; Meta Community Guidelines</h2>
            <p>
              Users of InstaDM are solely responsible for ensuring their automated messages, keywords, and promotional content strictly comply with Meta Community Guidelines, Meta Commercial Terms, and applicable local advertising regulations.
            </p>
          </section>
        </div>

      </main>

      <Footer />
    </div>
  );
}
