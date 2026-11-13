'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import { INITIAL_ACCOUNTS, INITIAL_AUTOMATIONS, INITIAL_LEADS, INITIAL_PRICING_PLANS } from '@/lib/data';
import { InstagramIcon } from '@/components/common/BrandIcons';
import {
  MessageSquare,
  Zap,
  Users,
  TrendingUp,
  Plus,
  ArrowUpRight,
  Clock,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Filter,
  Check,
  CreditCard,
  ShieldCheck,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { CreateAutomationModal } from '@/components/dashboard/CreateAutomationModal';
import { CheckoutModal } from '@/components/billing/CheckoutModal';
import { Automation, PricingPlan } from '@/types';
import { getStoredPricingPlans, getStoredDiscountPercent } from '@/lib/pricing';

export default function DashboardOverviewPage() {
  const { user, updateUserPlan } = useAuth();
  const { currency, setCurrency, isYearly, setIsYearly, formatPrice, allowManualSwitcher } = useCurrency();
  const [automations, setAutomations] = useState<Automation[]>(INITIAL_AUTOMATIONS);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Pricing & Checkout states
  const [plans, setPlans] = useState<PricingPlan[]>(INITIAL_PRICING_PLANS);
  const [discountPercent, setDiscountPercent] = useState<number>(17);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<{
    id: 'starter' | 'pro' | 'agency';
    name: string;
    price: number;
  }>({
    id: 'pro',
    name: 'Pro',
    price: 29.99
  });

  useEffect(() => {
    setPlans(getStoredPricingPlans());
    setDiscountPercent(getStoredDiscountPercent());

    const handleUpdate = () => {
      setPlans(getStoredPricingPlans());
      setDiscountPercent(getStoredDiscountPercent());
    };
    window.addEventListener('instadm_pricing_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('instadm_pricing_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const handleOpenCheckout = (planId: 'starter' | 'pro' | 'agency', planName: string, price: number) => {
    setSelectedPlanForCheckout({ id: planId, name: planName, price });
    setCheckoutModalOpen(true);
  };

  const handleCheckoutSuccess = (planId: 'starter' | 'pro' | 'agency') => {
    updateUserPlan(planId, isYearly ? 'yearly' : 'monthly');
    try {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    } catch {}
  };

  // Stats calculation
  const totalDms = automations.reduce((acc, curr) => acc + curr.totalDelivered, 0);
  const activeAutomationsCount = automations.filter(a => a.status === 'ACTIVE').length;
  const totalLeads = INITIAL_LEADS.length + 3842; // base + sample

  const handleSaveAutomation = (newAuto: Automation) => {
    setAutomations([newAuto, ...automations]);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/30 text-purple-200 text-xs font-semibold border border-purple-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Autopilot Engine Live</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Welcome back, {user?.name || 'Creator'}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Your automations are active and ready. Over the past 24 hours, InstaDM replied to 1,420 interactions with a 99.8% delivery rate.
          </p>
        </div>

        <div className="relative z-10 flex-shrink-0 flex items-center gap-3">
          <Link
            href="/dashboard/billing"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all"
          >
            <CreditCard className="w-4 h-4 text-purple-300" />
            <span>Plan: {(user?.plan || 'pro').toUpperCase()}</span>
          </Link>

          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-md transition-all transform hover:scale-105"
          >
            <Plus className="w-4 h-4 text-purple-600" />
            <span>Create New Automation</span>
          </button>
        </div>
      </div>

      {/* 4 Key Performance Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Connected Accounts</span>
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <InstagramIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{INITIAL_ACCOUNTS.length}</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">All Healthy</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">@themoderncreator, @zenith...</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Automated DMs</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{totalDms.toLocaleString()}</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +18.4%
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">Avg delivery response: 1.4s</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Automations</span>
            <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{activeAutomationsCount}</span>
            <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">Running</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">Reel comments &amp; DM keywords</p>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Leads Captured</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{totalLeads.toLocaleString()}</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +24% MoM
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">Verified emails &amp; phone contacts</p>
        </div>
      </div>

      {/* Main Grid: Automations Table & Live Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 8 Cols: Active Automations Manager */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Active Automations</h3>
              <p className="text-xs text-slate-500">Monitor trigger volume, delivered DMs, and click-through rates</p>
            </div>
            <Link
              href="/dashboard/automations"
              className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {automations.map((auto) => (
              <div key={auto.id} className="p-5 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1 max-w-md">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{auto.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                      auto.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {auto.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>Keywords:</span>
                    {auto.triggerKeywords.map((k) => (
                      <span key={k} className="px-1.5 py-0.2 rounded bg-purple-50 text-purple-700 font-mono font-bold text-[11px]">
                        {k}
                      </span>
                    ))}
                    <span>• {auto.type.replace(/_/g, ' ')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs text-right">
                  <div>
                    <span className="text-[10px] text-slate-400 block">DMs Delivered</span>
                    <span className="font-bold text-slate-800 text-sm">{auto.totalDelivered.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Leads</span>
                    <span className="font-bold text-purple-600 text-sm">{auto.leadsCollected.toLocaleString()}</span>
                  </div>
                  <Link
                    href="/dashboard/flow-builder"
                    className="p-2 rounded-xl text-slate-400 hover:text-purple-600 hover:bg-purple-50"
                    title="Edit in Flow Builder"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 4 Cols: Live Activity Feed */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <h3 className="text-sm font-bold text-slate-900">Live Interaction Feed</h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Real-time</span>
          </div>

          <div className="space-y-3.5">
            {INITIAL_LEADS.map((lead) => (
              <div key={lead.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">@{lead.instagramUsername}</span>
                  <span className="text-[10px] text-slate-400">{lead.capturedAt}</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Triggered <strong>{lead.sourceAutomationName}</strong>
                </p>
                {lead.email && (
                  <div className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono">
                    ✓ Email: {lead.email}
                  </div>
                )}
              </div>
            ))}
          </div>

          <Link
            href="/dashboard/contacts"
            className="block text-center text-xs font-bold text-purple-600 hover:underline pt-2"
          >
            Open Contacts Database ➔
          </Link>
        </div>

      </div>

      {/* DASHBOARD PRICING & UPGRADE PLANS SECTION */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold mb-1.5 border border-purple-100">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Subscription &amp; Upgrade Plans</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Upgrade Your Workspace Capacity
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Unlock higher message limits, additional Instagram accounts, and AI-powered dynamic reply triggers.
            </p>
          </div>

          {/* Billing & Currency Switchers */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setIsYearly(false)}
                className={`px-3 py-1.5 rounded-lg transition-all ${!isYearly ? 'bg-white shadow-2xs text-purple-700' : 'text-slate-600'}`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setIsYearly(true)}
                className={`px-3 py-1.5 rounded-lg transition-all ${isYearly ? 'bg-purple-600 text-white shadow-2xs' : 'text-slate-600'}`}
              >
                Annual (Save ~{discountPercent}%)
              </button>
            </div>

            {allowManualSwitcher && (
              <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`px-2.5 py-1.5 rounded-lg transition-all ${currency === 'USD' ? 'bg-white text-purple-700 shadow-2xs' : 'text-slate-600'}`}
                >
                  USD ($)
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('INR')}
                  className={`px-2.5 py-1.5 rounded-lg transition-all ${currency === 'INR' ? 'bg-white text-purple-700 shadow-2xs' : 'text-slate-600'}`}
                >
                  INR (₹)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 3 Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => {
            const isCurrent = (user?.plan || 'pro') === plan.id;
            const price = currency === 'INR'
              ? (isYearly ? plan.priceINR.yearly : plan.priceINR.monthly)
              : (isYearly ? plan.priceUSD.yearly : plan.priceUSD.monthly);

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-6 border flex flex-col justify-between transition-all ${
                  isCurrent
                    ? 'border-2 border-purple-600 bg-purple-50/20 shadow-md ring-1 ring-purple-500/20'
                    : 'border-slate-200 bg-white hover:border-purple-200 hover:shadow-lg'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-black text-slate-900">{plan.name}</h4>
                    {isCurrent ? (
                      <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-purple-600 text-white tracking-wide">
                        ACTIVE PLAN
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                    {plan.description}
                  </p>

                  <div className="text-3xl font-black text-slate-900 mb-4">
                    {formatPrice(price)}
                    <span className="text-xs text-slate-400 font-semibold"> / month</span>
                  </div>

                  {/* Limits Checklist */}
                  <div className="bg-slate-50 rounded-2xl p-3 mb-5 space-y-1.5 text-xs border border-slate-100">
                    <div className="flex justify-between text-slate-600">
                      <span>Instagram Accounts:</span>
                      <strong className="text-slate-900">{plan.limits.accounts}</strong>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Monthly DMs:</span>
                      <strong className="text-slate-900">{plan.limits.monthlyDms.toLocaleString()}</strong>
                    </div>
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
                  onClick={() => handleOpenCheckout(plan.id as 'starter' | 'pro' | 'agency', plan.name, price)}
                  className={`w-full py-3 rounded-2xl font-bold text-xs transition-all ${
                    isCurrent
                      ? 'bg-slate-100 text-slate-400 cursor-default font-semibold'
                      : 'bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-600/20 hover:scale-[1.02]'
                  }`}
                >
                  {isCurrent ? 'Current Active Plan' : `Upgrade to ${plan.name} (${formatPrice(price)})`}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Create Automation Modal with Post & Story Selector */}
      <CreateAutomationModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleSaveAutomation}
      />

      {/* Instant Checkout Gateway Modal */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        planId={selectedPlanForCheckout.id}
        planName={selectedPlanForCheckout.name}
        priceAmount={selectedPlanForCheckout.price}
        billingCycle={isYearly ? 'yearly' : 'monthly'}
        onSuccess={() => handleCheckoutSuccess(selectedPlanForCheckout.id)}
      />

    </div>
  );
}
