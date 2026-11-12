import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-700"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-400 font-mono">Effective Date: November 12, 2026</p>
        </div>

        <div className="prose prose-slate max-w-none text-sm text-slate-600 space-y-6 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By accessing or creating an account on <strong>https://instadm.dev</strong>, you agree to be bound by these Terms of Service. If you disagree with any portion of these terms, you may not use our services.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">2. Acceptable Use Policy &amp; Anti-Spam Prohibition</h2>
            <p>
              InstaDM is engineered exclusively for genuine conversational lead capture and community engagement. You agree NOT to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Send unsolicited bulk promotional messages to users who have not explicitly interacted with your account.</li>
              <li>Circumvent or attempt to bypass Meta’s 24-hour standard messaging window.</li>
              <li>Distribute malicious code, phishing links, deceptive financial schemes, or defamatory materials.</li>
              <li>Impersonate any brand, person, or organization without explicit written authorization.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">3. Account Eligibility</h2>
            <p>
              To utilize InstaDM automations, you must possess an eligible Instagram Professional (Business or Creator) account connected to a verified Facebook Page in good standing with Meta Platforms, Inc.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">4. Service Availability &amp; Modifications</h2>
            <p>
              While InstaDM maintains an industry-leading 99.8% uptime SLA, service availability is subject to Meta Graph API operational status. We reserve the right to modify or discontinue features in response to platform policy revisions.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
