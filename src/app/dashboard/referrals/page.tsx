'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import { 
  Gift, 
  Copy, 
  Check, 
  Share2, 
  DollarSign, 
  Users, 
  MousePointerClick, 
  CreditCard, 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Wallet,
  Clock,
  Send,
  Zap,
  Info,
  ShieldCheck,
  Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ReferralRecord } from '@/types';

const INITIAL_REFERRALS: ReferralRecord[] = [
  {
    id: 'ref-1',
    referredUserName: 'Rohan Deshmukh',
    referredUserEmail: 'ro***@agencyreach.in',
    plan: 'agency',
    date: '2026-11-05',
    commissionAmount: 1199,
    status: 'PAID'
  },
  {
    id: 'ref-2',
    referredUserName: 'Maya Lin',
    referredUserEmail: 'ma***@creatorflow.co',
    plan: 'pro',
    date: '2026-11-02',
    commissionAmount: 449,
    status: 'PENDING'
  },
  {
    id: 'ref-3',
    referredUserName: 'David Kim',
    referredUserEmail: 'da***@kimmedia.studio',
    plan: 'pro',
    date: '2026-10-28',
    commissionAmount: 449,
    status: 'PAID'
  },
  {
    id: 'ref-4',
    referredUserName: 'Aarav Patel',
    referredUserEmail: 'aa***@patelfitness.com',
    plan: 'starter',
    date: '2026-10-21',
    commissionAmount: 149,
    status: 'PAID'
  },
  {
    id: 'ref-5',
    referredUserName: 'Sophie Martin',
    referredUserEmail: 'so***@fashionedit.fr',
    plan: 'free',
    date: '2026-11-09',
    commissionAmount: 0,
    status: 'TRIAL'
  }
];

export default function ReferralsDashboardPage() {
  const { user } = useAuth();
  const { currency } = useCurrency();

  const [copied, setCopied] = useState(false);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutMethod, setPayoutMethod] = useState<'UPI' | 'BANK' | 'PAYPAL' | 'CRYPTO'>('UPI');
  const [payoutDetails, setPayoutDetails] = useState('');
  const [payoutSubmitted, setPayoutSubmitted] = useState(false);
  const [commissionRate, setCommissionRate] = useState<number>(30);
  const [minPayoutAmount, setMinPayoutAmount] = useState<number>(2000);
  const [referralsList, setReferralsList] = useState<ReferralRecord[]>(INITIAL_REFERRALS);
  const [notification, setNotification] = useState<string | null>(null);

  // Sync settings dynamically from localStorage & window events
  useEffect(() => {
    const loadSettings = () => {
      try {
        const stored = localStorage.getItem('instadm_admin_settings');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.affiliateCommissionRate !== undefined) {
            setCommissionRate(Number(parsed.affiliateCommissionRate));
          }
          if (parsed.minimumPayoutAmount !== undefined) {
            setMinPayoutAmount(Number(parsed.minimumPayoutAmount));
          }
        }

        const storedRefs = localStorage.getItem('instadm_referral_records');
        if (storedRefs) {
          setReferralsList(JSON.parse(storedRefs));
        }
      } catch {
        // ignore
      }
    };

    loadSettings();
    window.addEventListener('instadm_settings_updated', loadSettings);
    window.addEventListener('storage', loadSettings);
    return () => {
      window.removeEventListener('instadm_settings_updated', loadSettings);
      window.removeEventListener('storage', loadSettings);
    };
  }, []);

  // Save referrals to localStorage whenever updated
  const saveReferrals = (updated: ReferralRecord[]) => {
    setReferralsList(updated);
    try {
      localStorage.setItem('instadm_referral_records', JSON.stringify(updated));
    } catch {}
  };

  // Referral code generated from user name or id
  const referralCode = (user?.name?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'alexrivera');
  const referralLink = `https://instadm.dev/ref/${referralCode}?utm_source=creator_affiliate`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    try {
      confetti({ particleCount: 35, spread: 60 });
    } catch {}
    setTimeout(() => setCopied(false), 2500);
  };

  const shareText = encodeURIComponent(
    `I'm using InstaDM to automate my Instagram DMs, Reel comments, and lead capture 24/7. Use my link to get started: ${referralLink}`
  );

  const handlePayoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payoutDetails) return;
    setPayoutSubmitted(true);
    try {
      confetti({ particleCount: 50, spread: 70 });
    } catch {}
    setTimeout(() => {
      setPayoutSubmitted(false);
      setShowPayoutModal(false);
      setPayoutDetails('');
    }, 2500);
  };

  // Plan price constants in INR
  const PLAN_PRICES_INR = {
    free: 0,
    starter: 499,
    pro: 1499,
    agency: 3999
  };

  // Calculate commission for a given plan dynamically
  const getCommissionForPlan = (plan: 'free' | 'starter' | 'pro' | 'agency') => {
    if (plan === 'free') return 0;
    const basePrice = PLAN_PRICES_INR[plan] || 0;
    return Math.round((basePrice * commissionRate) / 100);
  };

  // Simulate subscription purchase for a user on Free/Trial
  const handleSimulateSubscriptionPurchase = (recordId: string, upgradePlan: 'starter' | 'pro' | 'agency' = 'pro') => {
    const updated = referralsList.map((ref) => {
      if (ref.id === recordId) {
        const comm = getCommissionForPlan(upgradePlan);
        return {
          ...ref,
          plan: upgradePlan,
          status: 'PAID' as const,
          commissionAmount: comm,
          date: new Date().toISOString().split('T')[0]
        };
      }
      return ref;
    });

    saveReferrals(updated);

    const comm = getCommissionForPlan(upgradePlan);
    const commDisplay = currency === 'INR' ? `₹${comm}` : `$${(comm / 83).toFixed(2)}`;
    setNotification(`🎉 Subscription Purchased! User upgraded to ${upgradePlan.toUpperCase()} Plan. ${commDisplay} (${commissionRate}%) credited to your balance!`);
    
    try {
      confetti({ particleCount: 65, spread: 80, origin: { y: 0.6 } });
    } catch {}

    setTimeout(() => setNotification(null), 5000);
  };

  // Add a new demo free trial signup
  const handleAddDemoSignup = () => {
    const names = ['Riya Sharma', 'Ananya Gupta', 'Michael Scott', 'Priya Menon', 'Liam Cooper'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomEmail = `${randomName.toLowerCase().replace(/\s+/g, '')}@creator.io`;
    
    const newRecord: ReferralRecord = {
      id: `ref-${Date.now()}`,
      referredUserName: randomName,
      referredUserEmail: randomEmail,
      plan: 'free',
      date: new Date().toISOString().split('T')[0],
      commissionAmount: 0,
      status: 'TRIAL'
    };

    const updated = [newRecord, ...referralsList];
    saveReferrals(updated);
    setNotification(`👤 New Referral Signed Up: ${randomName} is on Free Trial (₹0 commission). Commission unlocks when they purchase a subscription.`);
    setTimeout(() => setNotification(null), 4500);
  };

  // Calculate dynamic totals
  const totalEarnedINR = referralsList
    .filter((r) => r.status === 'PAID')
    .reduce((sum, r) => sum + (r.plan === 'free' ? 0 : getCommissionForPlan(r.plan)), 0);

  const pendingPayoutINR = referralsList
    .filter((r) => r.status === 'PENDING')
    .reduce((sum, r) => sum + (r.plan === 'free' ? 0 : getCommissionForPlan(r.plan)), 0);

  const totalClicks = 142 + (referralsList.length - 5) * 6;
  const totalSignups = referralsList.length;
  const paidConversions = referralsList.filter((r) => r.status !== 'TRIAL').length;

  // Currency-aware displays
  const totalEarnedDisplay = currency === 'INR' 
    ? `₹${totalEarnedINR.toLocaleString()}` 
    : `$${(totalEarnedINR / 83).toFixed(2)}`;

  const pendingPayoutDisplay = currency === 'INR' 
    ? `₹${pendingPayoutINR.toLocaleString()}` 
    : `$${(pendingPayoutINR / 83).toFixed(2)}`;

  const minPayoutThreshold = currency === 'INR' 
    ? `₹${minPayoutAmount.toLocaleString()}` 
    : `$${Math.round(minPayoutAmount / 40)}`;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* Toast Notification */}
      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-600 text-white shadow-xl flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-200" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-white/80 hover:text-white text-xs font-bold ml-4">
            Dismiss
          </button>
        </div>
      )}

      {/* Hero Perk Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 p-8 sm:p-10 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-60 h-60 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-purple-200 text-xs font-bold mb-4 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            InstaDM Partner &amp; Affiliate Program
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Earn {commissionRate}% Lifetime Recurring Commission
          </h1>
          <p className="mt-3 text-sm sm:text-base text-purple-100/90 leading-relaxed max-w-2xl">
            Invite creators, coaches, agencies, and e-commerce stores to InstaDM. You will earn <strong className="text-white underline decoration-purple-400 decoration-2">{commissionRate}% recurring payout</strong> every single month for every customer who subscribes to a paid plan through your unique link.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold text-purple-200">
            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>30-Day Cookie Window</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Paid on Subscription Purchases</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>UPI, Bank, PayPal &amp; Crypto</span>
            </div>
          </div>
        </div>
      </div>

      {/* IMPORTANT COMMISSION ELIGIBILITY POLICY CARD */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-purple-50 via-indigo-50 to-pink-50 border border-purple-200/80 shadow-xs space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Commission Rule: Commission Is Credited When a User Purchases a Subscription
            </h3>
            <p className="text-xs text-slate-600">
              Free signups and trials do not generate payouts. Commission ({commissionRate}%) is unlocked the moment a referred customer buys or renews any paid subscription.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/70 space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              <span className="text-xs font-bold text-slate-700">1. Free Signup / Trial</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Referred user registers. Commission is <strong>₹0 / $0</strong> while they explore free features.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-emerald-300 space-y-1 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-bold text-emerald-700">2. Subscription Purchase</span>
            </div>
            <p className="text-[11px] text-slate-600">
              User upgrades to Starter, Pro, or Agency. <strong>{commissionRate}% commission is credited instantly!</strong>
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-purple-300 space-y-1 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-600"></span>
              <span className="text-xs font-bold text-purple-700">3. Monthly Recurring</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Every month their plan auto-renews, you continue receiving <strong>{commissionRate}% recurring commission</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Referral Clicks</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <MousePointerClick className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{totalClicks}</div>
          <span className="text-xs text-purple-600 font-semibold mt-1 inline-block">+28 clicks this week</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Signups</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{totalSignups}</div>
          <span className="text-xs text-blue-600 font-semibold mt-1 inline-block">
            {paidConversions} paid ({((paidConversions / totalSignups) * 100).toFixed(0)}% paid conversion)
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Total Earned ({commissionRate}%)</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-600">{totalEarnedDisplay}</div>
          <span className="text-xs text-slate-500 mt-1 inline-block">Paid subscription payouts</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Pending Payout</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{pendingPayoutDisplay}</div>
          <button
            onClick={() => setShowPayoutModal(true)}
            className="text-xs text-purple-600 font-bold hover:underline mt-1 inline-flex items-center gap-1"
          >
            Request Payout <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Unique Referral Link & Social Sharing */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">Your Personal Referral Link</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Share this link across your Instagram bio, YouTube descriptions, emails, or agency pitch decks.
          </p>
        </div>

        {/* Link Input & Copy */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 flex items-center gap-2 text-xs font-mono text-slate-800 break-all select-all">
            <span className="text-slate-400 select-none">🔗</span>
            <span className="font-semibold">{referralLink}</span>
          </div>

          <button
            onClick={handleCopyLink}
            className={`px-6 py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
              copied
                ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/20 hover:-translate-y-0.5'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" /> Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> Copy Referral Link
              </>
            )}
          </button>
        </div>

        {/* Social Quick Share Buttons */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Share2 className="w-4 h-4 text-purple-600" />
            <span>Share directly on:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* WhatsApp */}
            <a
              href={`https://api.whatsapp.com/send?text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <span>WhatsApp</span>
            </a>

            {/* Twitter/X */}
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <span>Twitter / X</span>
            </a>

            {/* LinkedIn */}
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <span>LinkedIn</span>
            </a>

            {/* Telegram */}
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <span>Telegram</span>
            </a>
          </div>
        </div>
      </div>

      {/* How it works 3-step banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-black text-sm">
            1
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Share Your Referral Link</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Send your unique link to content creators, marketing agencies, e-commerce stores, or post on social media.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-sm">
            2
          </div>
          <h3 className="font-bold text-slate-900 text-sm">They Purchase a Subscription</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            When they connect Instagram and activate Starter, Pro, or Agency plan, your {commissionRate}% commission is credited.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm">
            3
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Earn {commissionRate}% Every Month</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Enjoy recurring monthly payouts directly to your UPI ID, Bank Account, PayPal, or Crypto USDT wallet.
          </p>
        </div>
      </div>

      {/* Referral History Table with Interactive Subscription Upgrades */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Referred Customers &amp; Earnings</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Track signups, subscribed tiers, and commission status. Commission unlocks on paid subscription.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddDemoSignup}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Demo Signup</span>
            </button>
            <span className="text-xs font-bold px-3 py-1 bg-purple-100 text-purple-700 rounded-full w-fit">
              Commission Rate: {commissionRate}% Lifetime
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-4 px-6">Referred Creator</th>
                <th className="py-4 px-6">Plan Status</th>
                <th className="py-4 px-6">Date Joined</th>
                <th className="py-4 px-6">Monthly Commission ({commissionRate}%)</th>
                <th className="py-4 px-6 text-right">Commission Status &amp; Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {referralsList.map((ref) => {
                const comm = getCommissionForPlan(ref.plan);
                const commText = comm > 0
                  ? (currency === 'INR' ? `₹${comm.toLocaleString()}/mo` : `$${(comm / 83).toFixed(2)}/mo`)
                  : '₹0 (Free Trial)';

                return (
                  <tr key={ref.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                          {ref.referredUserName.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block">{ref.referredUserName}</span>
                          <span className="text-[11px] text-slate-400 font-mono">{ref.referredUserEmail}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase ${
                        ref.plan === 'agency' 
                          ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                          : ref.plan === 'pro' 
                          ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' 
                          : ref.plan === 'starter' 
                          ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}>
                        {ref.plan} Plan
                      </span>
                    </td>

                    <td className="py-4 px-6 text-slate-600 font-medium">
                      {ref.date}
                    </td>

                    <td className="py-4 px-6">
                      <div className="space-y-0.5">
                        <span className={`font-black text-xs ${comm > 0 ? 'text-emerald-600' : 'text-slate-400'}`}>
                          {commText}
                        </span>
                        {comm > 0 && (
                          <span className="text-[10px] text-slate-400 block">
                            {commissionRate}% of {currency === 'INR' ? `₹${PLAN_PRICES_INR[ref.plan]}` : `$${(PLAN_PRICES_INR[ref.plan] / 83).toFixed(2)}`}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-6 text-right">
                      {ref.status === 'PAID' && (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[10px] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          Paid Subscribed
                        </span>
                      )}
                      {ref.status === 'PENDING' && (
                        <span className="inline-flex items-center gap-1 text-amber-700 font-bold text-[10px] bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                          <Clock className="w-3 h-3 text-amber-500" />
                          Next Payout Cycle
                        </span>
                      )}
                      {ref.status === 'TRIAL' && (
                        <div className="inline-flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 text-slate-500 font-bold text-[10px] bg-slate-100 px-2 py-0.5 rounded-md">
                            Free Trial (₹0)
                          </span>
                          <button
                            onClick={() => handleSimulateSubscriptionPurchase(ref.id, 'pro')}
                            title="Simulate this user purchasing a Pro subscription"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-[10px] shadow-xs transition-transform hover:scale-105"
                          >
                            <Zap className="w-3 h-3 text-yellow-300" />
                            <span>Upgrade to Pro</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* REQUEST PAYOUT MODAL */}
      {showPayoutModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden p-6 animate-in fade-in zoom-in-95 duration-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Request Commission Payout</h3>
                  <p className="text-xs text-slate-400">Available Balance: <strong className="text-emerald-600">{pendingPayoutDisplay}</strong></p>
                </div>
              </div>
            </div>

            {payoutSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">Payout Request Received!</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Your payout of {pendingPayoutDisplay} will be processed to your chosen account within 24–48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handlePayoutSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Select Payout Method</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPayoutMethod('UPI')}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                        payoutMethod === 'UPI'
                          ? 'border-purple-600 bg-purple-50 text-purple-700'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      🇮🇳 UPI (Instant)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPayoutMethod('BANK')}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                        payoutMethod === 'BANK'
                          ? 'border-purple-600 bg-purple-50 text-purple-700'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      🏦 Bank Transfer
                    </button>
                    <button
                      type="button"
                      onClick={() => setPayoutMethod('PAYPAL')}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                        payoutMethod === 'PAYPAL'
                          ? 'border-purple-600 bg-purple-50 text-purple-700'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      🌐 PayPal
                    </button>
                    <button
                      type="button"
                      onClick={() => setPayoutMethod('CRYPTO')}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                        payoutMethod === 'CRYPTO'
                          ? 'border-purple-600 bg-purple-50 text-purple-700'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      🪙 Crypto USDT
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {payoutMethod === 'UPI' && 'Enter UPI ID / VPA (e.g. username@okhdfcbank)'}
                    {payoutMethod === 'BANK' && 'Account No, IFSC Code & Account Holder Name'}
                    {payoutMethod === 'PAYPAL' && 'PayPal Email Address'}
                    {payoutMethod === 'CRYPTO' && 'USDT Wallet Address (TRC-20 / ERC-20)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={payoutDetails}
                    onChange={(e) => setPayoutDetails(e.target.value)}
                    placeholder={
                      payoutMethod === 'UPI' 
                        ? 'e.g. creator@okhdfcbank' 
                        : payoutMethod === 'PAYPAL' 
                        ? 'payouts@creatorstudio.co' 
                        : payoutMethod === 'CRYPTO' 
                        ? '0x71C... or T9y...' 
                        : 'A/C 1234567890, IFSC HDFC0001234, Name: Alex'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Minimum payout threshold is {minPayoutThreshold}. Processing fee: ₹0 / $0.
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPayoutModal(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
