'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { ArrowLeft, Sparkles, ShieldCheck, Zap, Heart, CheckCircle2, Users, Rocket } from 'lucide-react';
import { InstagramIcon } from '@/components/common/BrandIcons';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
        
        {/* Navigation Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        {/* Page Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Mission &amp; Vision</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            About InstaDM
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            Empowering creators, coaches, e-commerce stores, and marketing agencies to turn every Instagram interaction into a lifelong customer.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200/80 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Turning Interactions Into Meaningful Conversations
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Founded in 2026, InstaDM was built to eliminate the painful hours creators and businesses waste manually replying to &quot;LINK&quot;, &quot;PRICE&quot;, or &quot;HOW&quot; on viral Instagram Reels, Carousels, and Stories.
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Traditional &quot;link in bio&quot; landing pages lose up to 80% of prospective buyers due to friction. InstaDM bridges that gap by delivering personalized resources, lead magnets, and checkout vouchers directly into followers&apos; DMs within 3 seconds of their comment.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Official Meta Graph API</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We never use unauthorized browser scrapers or store passwords. 100% compliant with Meta Developer Policies and GDPR.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Sub-3-Second Delivery</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Powered by real-time webhook listeners, our infrastructure dispatches automated DMs while the follower is still on your post.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Built for Creators</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Drag-and-drop workflow builder, AI assistant grounding, CSV contact exports, and multi-currency billing built for scale.
            </p>
          </div>
        </div>

        {/* CTA Card */}
        <div className="rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 p-8 sm:p-10 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-lg">
            <h3 className="text-xl sm:text-2xl font-black">Ready to automate your Instagram growth?</h3>
            <p className="text-xs sm:text-sm text-purple-200">
              Join thousands of creators who turn Reel comments into customers automatically 24/7.
            </p>
          </div>
          <Link
            href="/signup"
            className="px-6 py-3.5 rounded-xl bg-white text-slate-900 font-bold text-xs sm:text-sm hover:bg-purple-50 transition-all shrink-0 shadow-md text-center"
          >
            Start Free Today
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}
