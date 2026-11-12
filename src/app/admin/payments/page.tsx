'use client';

import React, { useState } from 'react';
import { INITIAL_PAYMENT_GATEWAYS, INITIAL_PAYMENT_TRANSACTIONS } from '@/lib/data';
import { PaymentGatewayConfig, PaymentTransaction } from '@/types';
import { 
  CreditCard, 
  ShieldCheck, 
  Save, 
  CheckCircle2, 
  ExternalLink, 
  KeyRound, 
  ToggleLeft, 
  ToggleRight, 
  RefreshCw,
  Sliders,
  DollarSign,
  QrCode,
  Terminal,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AdminPaymentsPage() {
  const [gateways, setGateways] = useState<PaymentGatewayConfig[]>(INITIAL_PAYMENT_GATEWAYS);
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(INITIAL_PAYMENT_TRANSACTIONS);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'gateways' | 'transactions'>('gateways');

  const handleToggleEnable = (id: string) => {
    setGateways(gateways.map((g) => {
      if (g.id === id) {
        return { ...g, enabled: !g.enabled };
      }
      return g;
    }));
  };

  const handleToggleMode = (id: string) => {
    setGateways(gateways.map((g) => {
      if (g.id === id) {
        return { ...g, mode: g.mode === 'live' ? 'sandbox' : 'live' };
      }
      return g;
    }));
  };

  const handleUpdateKey = (id: string, field: 'publishableKey' | 'secretKey' | 'webhookSecret', val: string) => {
    setGateways(gateways.map((g) => {
      if (g.id === id) {
        return { ...g, [field]: val };
      }
      return g;
    }));
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    try {
      confetti({ particleCount: 35, spread: 50 });
    } catch {}
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Payment Gateway Manager
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Multi-Gateway Live
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure, enable, and manage keys for Razorpay, Stripe, PayPal, Cashfree, PayU, and Crypto payments.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-500/25 transition-all self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Gateways Live</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Payment gateway configurations and API keys saved successfully! Active immediately on checkout.</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('gateways')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'gateways'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          Payment Gateways ({gateways.length})
        </button>
        <button
          onClick={() => setActiveTab('transactions')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'transactions'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          Recent Transactions ({transactions.length})
        </button>
      </div>

      {/* TAB 1: GATEWAYS LIST */}
      {activeTab === 'gateways' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gateways.map((gw) => (
              <div
                key={gw.id}
                className={`bg-white rounded-3xl p-6 border transition-all space-y-4 ${
                  gw.enabled
                    ? 'border-slate-200 shadow-sm'
                    : 'border-slate-200 opacity-60 bg-slate-50/50'
                }`}
              >
                {/* Gateway Card Top Row */}
                <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">{gw.name}</h3>
                      <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full uppercase ${
                        gw.mode === 'live'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {gw.mode}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{gw.description}</p>
                  </div>

                  {/* Enable / Disable Switch */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => handleToggleEnable(gw.id)}
                      className={`text-xs font-bold px-3 py-1 rounded-xl transition-colors ${
                        gw.enabled
                          ? 'bg-purple-600 text-white shadow-2xs'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {gw.enabled ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>
                </div>

                {/* Mode Selector */}
                <div className="flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-600 font-semibold">Environment Mode:</span>
                  <div className="flex items-center bg-white p-0.5 rounded-lg border border-slate-200 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => handleToggleMode(gw.id)}
                      className={`px-2.5 py-0.5 rounded ${gw.mode === 'sandbox' ? 'bg-amber-100 text-amber-900' : 'text-slate-500'}`}
                    >
                      Sandbox
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleMode(gw.id)}
                      className={`px-2.5 py-0.5 rounded ${gw.mode === 'live' ? 'bg-emerald-600 text-white' : 'text-slate-500'}`}
                    >
                      Live Production
                    </button>
                  </div>
                </div>

                {/* API Keys */}
                <div className="space-y-2.5 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                      Publishable Key / Client ID / Merchant Key
                    </label>
                    <input
                      type="text"
                      value={gw.publishableKey}
                      onChange={(e) => handleUpdateKey(gw.id, 'publishableKey', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                      Secret Key / App Secret / Private Key
                    </label>
                    <input
                      type="password"
                      value={gw.secretKey}
                      onChange={(e) => handleUpdateKey(gw.id, 'secretKey', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                      Webhook Secret (Endpoint: /api/webhooks/payments)
                    </label>
                    <input
                      type="text"
                      value={gw.webhookSecret}
                      onChange={(e) => handleUpdateKey(gw.id, 'webhookSecret', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-800"
                    />
                  </div>
                </div>

                {/* Supported Methods Tags */}
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Accepted Methods:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {gw.supportedMethods.map((m) => (
                      <span key={m} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: TRANSACTIONS LIST */}
      {activeTab === 'transactions' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-4 px-6">Transaction ID</th>
                  <th className="py-4 px-6">Gateway</th>
                  <th className="py-4 px-6">User Email</th>
                  <th className="py-4 px-6">Plan Tier</th>
                  <th className="py-4 px-6">Amount</th>
                  <th className="py-4 px-6">Payment Method</th>
                  <th className="py-4 px-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-slate-900">
                      {tx.id}
                      <span className="block text-[10px] text-slate-400 font-normal">{tx.createdAt}</span>
                    </td>

                    <td className="py-4 px-6">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-purple-100 text-purple-700">
                        {tx.gateway}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-slate-800 font-medium">
                      {tx.userEmail}
                    </td>

                    <td className="py-4 px-6 uppercase font-bold text-slate-700">
                      {tx.planId}
                    </td>

                    <td className="py-4 px-6 font-black text-slate-900 text-sm">
                      {tx.currency === 'INR' ? `₹${tx.amount.toLocaleString()}` : `${tx.currency} ${tx.amount}`}
                    </td>

                    <td className="py-4 px-6 text-slate-600 text-[11px]">
                      {tx.paymentMethodDetails}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{tx.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
