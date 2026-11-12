import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { ShieldCheck, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function RefundPolicyPage() {
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Money-Back Guarantee</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="text-xs text-slate-400 font-mono">Last Updated: November 12, 2026</p>
        </div>

        <div className="prose prose-slate max-w-none text-sm text-slate-600 space-y-6 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">1. Customer Satisfaction Refund Guarantee</h2>
            <p>
              We want you to be completely satisfied with InstaDM. If our platform does not meet your automation expectations or you experience technical delivery issues, simply contact our team at <code>support@instadm.dev</code> or open a support ticket in your dashboard. We will process your refund request swiftly and fairly.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">2. Single-Click Cancellation Anytime</h2>
            <p>
              You may cancel your monthly or yearly subscription at any time directly through <strong>Dashboard ➔ Billing ➔ Cancel Subscription</strong>. There are no cancellation penalties or hidden lock-ins. Following cancellation, your account retains full access until the end of your current paid billing period.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">3. Currency &amp; Processing</h2>
            <p>
              Refunds are issued directly to your original payment method (Credit Card, Debit Card, UPI, or Net Banking) in your transacted currency (INR or USD). Processing typically reflects on your bank statement within 3 to 5 business days.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
