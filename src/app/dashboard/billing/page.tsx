'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import { INITIAL_PRICING_PLANS } from '@/lib/data';
import { 
  CreditCard, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Download, 
  ArrowRight,
  TrendingUp,
  Receipt
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BillingPage() {
  const { user, updateUserPlan } = useAuth();
  const { currency, setCurrency, isYearly, setIsYearly, formatPrice } = useCurrency();
  const [activePlan, setActivePlan] = useState(user?.plan || 'pro');

  const handleSelectPlan = (planId: 'free' | 'starter' | 'pro' | 'agency') => {
    setActivePlan(planId);
    updateUserPlan(planId, isYearly ? 'yearly' : 'monthly');
    try {
      confetti({ particleCount: 50, spread: 60 });
    } catch {}
  };

  const invoices = [
    { id: 'INV-2026-004', date: 'Nov 01, 2026', amount: currency === 'INR' ? '₹1,499' : '$29.99', status: 'PAID' },
    { id: 'INV-2026-003', date: 'Oct 01, 2026', amount: currency === 'INR' ? '₹1,499' : '$29.99', status: 'PAID' },
    { id: 'INV-2026-002', date: 'Sep 01, 2026', amount: currency === 'INR' ? '₹1,499' : '$29.99', status: 'PAID' },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Billing &amp; Subscription Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your active InstaDM tier, invoice receipts, and monthly message limits.
        </p>
      </div>

      {/* Current Active Plan Overview Card */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/30 text-purple-200 text-xs font-semibold border border-purple-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Active Tier: {activePlan.toUpperCase()} PLAN</span>
          </div>
          <h2 className="text-2xl font-black">
            {activePlan === 'starter' ? 'Starter Creator Plan' : activePlan === 'agency' ? 'Enterprise Agency Plan' : 'Pro Growth Plan'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Your billing cycle is currently <strong>{isYearly ? 'Annual' : 'Monthly'}</strong>. Next auto-renewal on Dec 01, 2026.
          </p>

          {/* Usage Bar */}
          <div className="pt-2 max-w-md space-y-1 text-xs">
            <div className="flex justify-between text-slate-300 text-[11px]">
              <span>Monthly DMs Used: <strong>14,250</strong></span>
              <span>Limit: <strong>25,000 / mo</strong></span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-purple-400 to-emerald-400 h-full w-[57%]" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 self-stretch md:self-auto">
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-center">
            <span className="text-[10px] text-slate-300 block uppercase font-bold">Current Rate</span>
            <span className="text-xl font-black text-white">
              {formatPrice(currency === 'INR' ? (activePlan === 'starter' ? 499 : activePlan === 'pro' ? 1499 : 3999) : (activePlan === 'starter' ? 9.99 : activePlan === 'pro' ? 29.99 : 79.99))}
            </span>
          </div>
        </div>
      </div>

      {/* Plan Switcher Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-slate-900">Change Subscription Tier</h3>
          
          {/* Currency and Billing Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-3 py-1 rounded-lg ${!isYearly ? 'bg-white shadow-2xs text-purple-700' : 'text-slate-600'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-3 py-1 rounded-lg ${isYearly ? 'bg-purple-600 text-white' : 'text-slate-600'}`}
              >
                Annual (Save 17%)
              </button>
            </div>

            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2 py-1 rounded-lg ${currency === 'USD' ? 'bg-white text-purple-700' : 'text-slate-600'}`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency('INR')}
                className={`px-2 py-1 rounded-lg ${currency === 'INR' ? 'bg-white text-purple-700' : 'text-slate-600'}`}
              >
                INR (₹)
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_PRICING_PLANS.map((plan) => {
            const isCurrent = activePlan === plan.id;
            const price = currency === 'INR'
              ? (isYearly ? plan.priceINR.yearly : plan.priceINR.monthly)
              : (isYearly ? plan.priceUSD.yearly : plan.priceUSD.monthly);

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-6 border flex flex-col justify-between transition-all ${
                  isCurrent
                    ? 'border-2 border-purple-600 bg-purple-50/20 shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-bold text-slate-900">{plan.name}</h4>
                    {isCurrent && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-600 text-white">
                        CURRENT
                      </span>
                    )}
                  </div>

                  <div className="text-2xl font-black text-slate-900 mb-3">
                    {formatPrice(price)}
                    <span className="text-xs text-slate-400 font-normal"> / mo</span>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-600 mb-6">
                    {plan.features.slice(0, 5).map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  disabled={isCurrent}
                  onClick={() => handleSelectPlan(plan.id as 'free' | 'starter' | 'pro' | 'agency')}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition-colors ${
                    isCurrent
                      ? 'bg-slate-100 text-slate-400 cursor-default'
                      : 'bg-purple-600 hover:bg-purple-700 text-white shadow-xs'
                  }`}
                >
                  {isCurrent ? 'Current Plan' : `Switch to ${plan.name}`}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Invoice History */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-purple-600" />
            <h3 className="text-base font-bold text-slate-900">Billing History &amp; Receipts</h3>
          </div>
          <span className="text-xs text-slate-400">Tax invoices compliant with GST &amp; VAT</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {invoices.map((inv) => (
            <div key={inv.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900 font-mono">{inv.id}</span>
                <span className="text-slate-500 block">{inv.date}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-slate-900 text-sm">{inv.amount}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {inv.status}
                </span>
                <button
                  type="button"
                  onClick={() => alert(`Downloading invoice ${inv.id}`)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-purple-600 hover:bg-purple-50"
                  title="Download PDF"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
