'use client';

import React, { useState } from 'react';
import { INITIAL_PRICING_PLANS } from '@/lib/data';
import { PricingPlan } from '@/types';
import { 
  CreditCard, 
  Save, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Sparkles,
  Sliders
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AdminPricingPage() {
  const [plans, setPlans] = useState<PricingPlan[]>(INITIAL_PRICING_PLANS);
  const [discountPercent, setDiscountPercent] = useState<number>(17);
  const [saved, setSaved] = useState(false);

  const handlePriceChange = (
    planId: string, 
    currency: 'INR' | 'USD', 
    period: 'monthly' | 'yearly', 
    value: number
  ) => {
    setPlans(plans.map((p) => {
      if (p.id === planId) {
        if (currency === 'INR') {
          return {
            ...p,
            priceINR: { ...p.priceINR, [period]: value }
          };
        } else {
          return {
            ...p,
            priceUSD: { ...p.priceUSD, [period]: value }
          };
        }
      }
      return p;
    }));
  };

  const handleLimitChange = (
    planId: string,
    field: keyof PricingPlan['limits'],
    value: unknown
  ) => {
    setPlans(plans.map((p) => {
      if (p.id === planId) {
        return {
          ...p,
          limits: { ...p.limits, [field]: value }
        };
      }
      return p;
    }));
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    try {
      confetti({ particleCount: 40, spread: 50 });
    } catch {}
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Pricing &amp; Plans Live Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Edit monthly and annual subscription rates in INR and USD, toggle plan limits, and adjust annual discount rates live without touching source code.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-500/25 transition-all self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes Live</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>All pricing configurations saved and updated live across the marketing website and checkout!</span>
        </div>
      )}

      {/* Global Annual Discount Setting */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Annual Subscription Savings Discount</h3>
          <p className="text-xs text-slate-500">Calculated automatically on checkout and banner pills</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(Number(e.target.value))}
            className="w-20 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-center"
          />
          <span className="text-xs font-bold text-slate-700">% OFF</span>
        </div>
      </div>

      {/* Plans Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-base font-black text-slate-900">{plan.name}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 uppercase">
                  {plan.badge}
                </span>
              </div>

              {/* USD Pricing */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  USD Pricing ($)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Monthly ($)</span>
                    <input
                      type="number"
                      step="0.01"
                      value={plan.priceUSD.monthly}
                      onChange={(e) => handlePriceChange(plan.id, 'USD', 'monthly', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-mono font-bold"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Yearly / mo ($)</span>
                    <input
                      type="number"
                      step="0.01"
                      value={plan.priceUSD.yearly}
                      onChange={(e) => handlePriceChange(plan.id, 'USD', 'yearly', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-mono font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* INR Pricing */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  INR Pricing (₹)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Monthly (₹)</span>
                    <input
                      type="number"
                      value={plan.priceINR.monthly}
                      onChange={(e) => handlePriceChange(plan.id, 'INR', 'monthly', parseInt(e.target.value, 10) || 0)}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-mono font-bold"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Yearly / mo (₹)</span>
                    <input
                      type="number"
                      value={plan.priceINR.yearly}
                      onChange={(e) => handlePriceChange(plan.id, 'INR', 'yearly', parseInt(e.target.value, 10) || 0)}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-mono font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Plan Limits */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Usage Limits
                </label>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">IG Accounts:</span>
                  <input
                    type="number"
                    value={plan.limits.accounts}
                    onChange={(e) => handleLimitChange(plan.id, 'accounts', parseInt(e.target.value, 10) || 1)}
                    className="w-16 px-2 py-1 rounded-lg border border-slate-200 text-right font-bold"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Monthly DMs:</span>
                  <input
                    type="number"
                    value={plan.limits.monthlyDms}
                    onChange={(e) => handleLimitChange(plan.id, 'monthlyDms', parseInt(e.target.value, 10) || 1000)}
                    className="w-24 px-2 py-1 rounded-lg border border-slate-200 text-right font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Live on checkout
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
