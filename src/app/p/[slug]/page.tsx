'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { INITIAL_CMS_PAGES } from '@/lib/data';
import { CmsPage } from '@/types';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { ArrowLeft, Clock, FileText, ShieldCheck } from 'lucide-react';

function CmsPageContent() {
  const params = useParams();
  const slug = params?.slug as string;

  const [page, setPage] = useState<CmsPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      let pages = INITIAL_CMS_PAGES;
      const stored = localStorage.getItem('instadm_cms_pages');
      if (stored) {
        pages = JSON.parse(stored);
      }
      const match = pages.find((p) => p.slug.toLowerCase() === slug?.toLowerCase());
      if (match) {
        setPage(match);
      }
    } catch {
      const match = INITIAL_CMS_PAGES.find((p) => p.slug.toLowerCase() === slug?.toLowerCase());
      if (match) setPage(match);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-slate-400 text-sm">
        Loading page content...
      </div>
    );
  }

  if (!page) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <FileText className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-black text-slate-900">Page Not Found</h1>
        <p className="text-sm text-slate-600">
          The page you are looking for does not exist or has not been published yet.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-bold text-xs"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      {/* Navigation Breadcrumb */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-700 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Home</span>
      </Link>

      {/* Page Header */}
      <div className="space-y-3 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="uppercase text-[10px] font-black tracking-wider px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700">
            {page.category}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Updated {page.lastUpdated}
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          {page.title}
        </h1>
        {page.summary && (
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            {page.summary}
          </p>
        )}
      </div>

      {/* Page Body Content */}
      <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-4">
        {page.content}
      </div>
    </div>
  );
}

export default function DynamicCmsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="py-20 text-center text-slate-400 text-xs">Loading page...</div>}>
          <CmsPageContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
