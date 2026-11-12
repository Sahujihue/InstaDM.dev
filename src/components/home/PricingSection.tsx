'use client';

import React from 'react';
import Link from 'next/link';
import { useCurrency } from '@/context/CurrencyContext';
import { INITIAL_PRICING_PLANS } from '@/lib/data';
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export function PricingSection() {
  const { currency, setCurrency, isYearly, setIsYearly, formatPrice, allowManualSwitcher } = useCurrency();

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100/40 via-transparent to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Simple, Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Plans That Scale With Your Audience.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Start free, upgrade as your business expands. No hidden charges, no platform lock-in, and cancel anytime in 1-click.
          </p>

          {/* Controls: Monthly/Yearly toggle & Currency toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            
            {/* Monthly / Yearly Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => setIsYearly(false)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  !isYearly
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                onClick={() => setIsYearly(true)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isYearly
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Annual Billing</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-extrabold ${isYearly ? 'bg-purple-800 text-amber-300' : 'bg-purple-100 text-purple-700'}`}>
                  Save ~17%
                </span>
              </button>
            </div>

            {/* Currency Switcher (Shown only if allowed by Admin) */}
            {allowManualSwitcher && (
              <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700">
                <span className="text-slate-500 font-normal">Currency:</span>
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    currency === 'USD'
                      ? 'bg-white text-purple-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  USD ($)
                </button>
                <span className="text-slate-300">|</span>
                <button
                  type="button"
                  onClick={() => setCurrency('INR')}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    currency === 'INR'
                      ? 'bg-white text-purple-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  INR (₹)
                </button>
              </div>
            )}

          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12">
          {INITIAL_PRICING_PLANS.map((plan) => {
            const price = currency === 'INR'
              ? (isYearly ? plan.priceINR.yearly : plan.priceINR.monthly)
              : (isYearly ? plan.priceUSD.yearly : plan.priceUSD.monthly);

            const isPro = plan.popular;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPro
                    ? 'bg-gradient-to-b from-white via-purple-50/50 to-white border-2 border-purple-500 shadow-2xl shadow-purple-500/20 lg:-translate-y-2'
                    : 'bg-white border border-slate-200/90 shadow-lg shadow-slate-200/50 hover:border-purple-200 hover:shadow-xl'
                }`}
              >
                {/* Pro Popular Badge */}
                {isPro && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-xs px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>MOST POPULAR CHOICE</span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Tagline */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-black text-slate-900">{plan.name}</h3>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {plan.badge}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Price Block */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                        {formatPrice(price)}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        / month
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 mt-1">
                      {isYearly
                        ? `Billed annually (includes ~17% instant savings)`
                        : 'Billed monthly, cancel anytime'}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Included with {plan.name}:
                    </p>
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isPro ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plan CTA Button */}
                <div className="pt-2">
                  <Link
                    href={`/signup?plan=${plan.id}&billing=${isYearly ? 'yearly' : 'monthly'}`}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                      isPro
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/25'
                        : 'bg-slate-900 hover:bg-purple-900 text-white shadow-sm'
                    }`}
                  >
                    <span>Get Started with {plan.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <p className="text-[11px] text-center text-slate-400 mt-2">
                    14-day money-back guarantee • No credit card required to start
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Safe billing guarantee */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">100% Risk-Free 14-Day Guarantee</p>
              <p className="text-xs text-slate-600">If you don&apos;t generate more leads and save hours of time, we&apos;ll refund every penny without questions.</p>
            </div>
          </div>
          <Link
            href="/refund"
            className="text-xs font-bold text-purple-600 hover:underline flex-shrink-0"
          >
            Read Refund Policy
          </Link>
        </div>

        {/* Multi-Gateway Supported Badges */}
        <div className="max-w-4xl mx-auto p-4 rounded-2xl bg-white border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 text-center sm:text-left">
          <span className="font-semibold text-slate-700">
            Accepted Payment Gateways:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-[11px] font-bold">
            <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200">
              ⚡ Razorpay (UPI, GPay, PhonePe)
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-800 border border-purple-200">
              💳 Stripe (Cards, Apple Pay)
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-800 border border-sky-200">
              🅿️ PayPal
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
              🌊 Cashfree
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-green-50 text-green-800 border border-green-200">
              🛡️ PayU
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
              🪙 Crypto (USDT / BTC)
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
