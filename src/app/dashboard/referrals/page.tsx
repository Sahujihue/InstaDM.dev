'use client';

import React, { useState } from 'react';
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
  QrCode, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  Wallet,
  Clock,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ReferralRecord } from '@/types';

const SAMPLE_REFERRALS: ReferralRecord[] = [
  {
    id: 'ref-1',
    referredUserName: 'Rohan Deshmukh',
    referredUserEmail: 'ro***@agencyreach.in',
    plan: 'agency',
    date: '2026-11-05',
    commissionAmount: 1199, // INR (approx $36 equivalent)
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
  const { currency, formatPrice } = useCurrency();

  const [copied, setCopied] = useState(false);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutMethod, setPayoutMethod] = useState<'UPI' | 'BANK' | 'PAYPAL' | 'CRYPTO'>('UPI');
  const [payoutDetails, setPayoutDetails] = useState('');
  const [payoutSubmitted, setPayoutSubmitted] = useState(false);

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

  // Convert amounts depending on currency
  const totalEarnedDisplay = currency === 'INR' ? '₹12,450' : '$149.50';
  const pendingPayoutDisplay = currency === 'INR' ? '₹3,750' : '$45.00';
  const minPayoutThreshold = currency === 'INR' ? '₹2,000' : '$50';

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
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
            Earn 30% Lifetime Recurring Commission
          </h1>
          <p className="mt-3 text-sm sm:text-base text-purple-100/90 leading-relaxed max-w-2xl">
            Invite creators, coaches, agencies, and e-commerce stores to InstaDM. You will earn <strong>30% recurring payout</strong> every single month for every customer who subscribes through your unique link.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold text-purple-200">
            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>30-Day Cookie Window</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Monthly Automated Payouts</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>UPI, Bank, PayPal &amp; Crypto</span>
            </div>
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
          <div className="text-3xl font-black text-slate-900">142</div>
          <span className="text-xs text-purple-600 font-semibold mt-1 inline-block">+28 clicks this week</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Signups</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">18</div>
          <span className="text-xs text-blue-600 font-semibold mt-1 inline-block">12.6% conversion rate</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Total Earned</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-600">{totalEarnedDisplay}</div>
          <span className="text-xs text-slate-500 mt-1 inline-block">Lifetime earnings paid out</span>
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
          <h3 className="font-bold text-slate-900 text-sm">They Subscribe to a Plan</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            When they connect their Instagram account and activate Starter, Pro, or Agency plan, your commission is credited.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm">
            3
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Earn 30% Every Month</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Enjoy recurring monthly payouts directly to your UPI ID, Bank Account, PayPal, or Crypto USDT wallet.
          </p>
        </div>
      </div>

      {/* Referral History Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Referred Customers &amp; Earnings</h3>
            <p className="text-xs text-slate-500 mt-0.5">Track signups, subscribed tiers, and commission status.</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-600 rounded-full w-fit">
            Commission Rate: 30% Lifetime
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-4 px-6">Referred Creator</th>
                <th className="py-4 px-6">Plan Subscribed</th>
                <th className="py-4 px-6">Date Joined</th>
                <th className="py-4 px-6">Monthly Commission</th>
                <th className="py-4 px-6 text-right">Payout Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SAMPLE_REFERRALS.map((ref) => (
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
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                      ref.plan === 'agency' 
                        ? 'bg-purple-100 text-purple-700' 
                        : ref.plan === 'pro' 
                        ? 'bg-indigo-100 text-indigo-700' 
                        : ref.plan === 'starter' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {ref.plan} Plan
                    </span>
                  </td>

                  <td className="py-4 px-6 text-slate-600 font-medium">
                    {ref.date}
                  </td>

                  <td className="py-4 px-6">
                    <span className="font-bold text-slate-900 text-xs">
                      {ref.commissionAmount > 0 
                        ? (currency === 'INR' ? `₹${ref.commissionAmount.toLocaleString()}/mo` : `$${(ref.commissionAmount / 83).toFixed(2)}/mo`)
                        : '₹0 (Free Trial)'}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-right">
                    {ref.status === 'PAID' && (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[10px] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        Paid
                      </span>
                    )}
                    {ref.status === 'PENDING' && (
                      <span className="inline-flex items-center gap-1 text-amber-700 font-bold text-[10px] bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                        <Clock className="w-3 h-3 text-amber-500" />
                        Next Cycle
                      </span>
                    )}
                    {ref.status === 'TRIAL' && (
                      <span className="inline-flex items-center gap-1 text-slate-500 font-bold text-[10px] bg-slate-100 px-2.5 py-1 rounded-full">
                        Free Plan
                      </span>
                    )}
                  </td>
                </tr>
              ))}
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
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
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
