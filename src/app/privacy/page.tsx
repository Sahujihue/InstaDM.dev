import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { ShieldCheck, ArrowLeft, Lock } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Meta Graph API Compliant</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400 font-mono">Last Updated: November 12, 2026</p>
        </div>

        <div className="prose prose-slate max-w-none text-sm text-slate-600 space-y-6 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">1. Overview &amp; Commitment</h2>
            <p>
              InstaDM (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), operating via <strong>https://instadm.dev</strong>, respects your privacy and is committed to protecting the personal data of our users and their Instagram audience. This Privacy Policy details our practices concerning data collection, transmission, and retention in strict adherence to Meta’s Developer Platform Policies and GDPR/CCPA standards.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">2. Meta Platform &amp; Instagram Graph API Compliance</h2>
            <p>
              InstaDM strictly utilizes official, sanctioned Meta Instagram Graph API endpoints. We declare:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>No Passwords Requested:</strong> We never request, capture, or store your Instagram account password. Authentication is conducted exclusively via Meta’s official OAuth dialog.</li>
              <li><strong>No Scraping or Bot Emulation:</strong> We do not employ automated browser scrapers, reverse-engineered private APIs, or headless browsers.</li>
              <li><strong>Permission Scope:</strong> We only request permissions necessary to execute your configured automations (e.g. <code>instagram_basic</code>, <code>instagram_manage_comments</code>, <code>instagram_manage_messages</code>).</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">3. Data We Collect</h2>
            <p>
              When you use InstaDM, we may collect:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Account Credentials:</strong> Your name, email address, and encrypted hashed password.</li>
              <li><strong>Instagram Profile Metadata:</strong> Instagram username, profile photo, and public Page ID provided via Meta OAuth.</li>
              <li><strong>Conversational Lead Data:</strong> Voluntarily submitted email addresses, phone numbers, and keyword triggers collected during automated DM conversations.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">4. Data Deletion Instructions</h2>
            <p>
              In accordance with Meta Platform Rules, users may request complete deletion of their account and all captured lead data at any time by navigating to <strong>Settings ➔ Delete Account</strong> or by emailing <code>privacy@instadm.dev</code>. Data is permanently purged from our encrypted databases within 48 hours.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">5. Security Standards</h2>
            <p>
              All traffic between your browser, our servers, and Meta’s Graph API is encrypted via 256-bit Transport Layer Security (TLS/SSL). Sensitive credentials and access tokens are stored in hardware security module (HSM) encrypted stores.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
