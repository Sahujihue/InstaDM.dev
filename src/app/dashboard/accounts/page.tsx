'use client';

import React, { useState } from 'react';
import { INITIAL_ACCOUNTS } from '@/lib/data';
import { InstagramAccount } from '@/types';
import { InstagramIcon, FacebookIcon } from '@/components/common/BrandIcons';
import { 
  CheckCircle2, 
  Plus, 
  RefreshCw, 
  ShieldCheck, 
  AlertCircle, 
  ExternalLink,
  Lock,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<InstagramAccount[]>(INITIAL_ACCOUNTS);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [newHandle, setNewHandle] = useState('');

  const handleSimulateOAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHandle) return;

    setIsConnecting(true);

    setTimeout(() => {
      const cleanHandle = newHandle.replace('@', '').toLowerCase();
      const newAcc: InstagramAccount = {
        id: `ig-acc-${Date.now()}`,
        username: cleanHandle,
        name: cleanHandle.charAt(0).toUpperCase() + cleanHandle.slice(1),
        profilePicture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        followersCount: Math.floor(Math.random() * 40000) + 1200,
        accountType: 'CREATOR',
        connectedAt: 'Just now',
        status: 'ACTIVE',
        metaPageId: `page_${Math.floor(Math.random() * 900000000)}`,
        webhookActive: true
      };

      setAccounts([...accounts, newAcc]);
      setIsConnecting(false);
      setShowConnectModal(false);
      setNewHandle('');

      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    }, 1200);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Connected Instagram Accounts
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your eligible Meta Creator &amp; Business accounts connected via the official Instagram Graph API.
          </p>
        </div>

        <button
          onClick={() => setShowConnectModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-500/25 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Connect New Account</span>
        </button>
      </div>

      {/* Meta Compliance Notice Banner */}
      <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200/80 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-indigo-950 space-y-1">
          <p className="font-bold">Meta Platform Policy Compliant</p>
          <p className="text-indigo-800 leading-relaxed">
            InstaDM strictly communicates through the sanctioned Meta Instagram Graph API v21.0. We never ask for your Instagram account password, and we never use browser scrapers. Your access tokens are refreshed automatically.
          </p>
        </div>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accounts.map((acc) => (
          <div
            key={acc.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-5"
          >
            {/* Top row */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3.5">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-purple-200 shadow-xs flex-shrink-0">
                  <img
                    src={acc.profilePicture}
                    alt={acc.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                    {acc.name}
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </h3>
                  <p className="text-xs font-mono text-purple-600 font-semibold">
                    @{acc.username}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {acc.followersCount.toLocaleString()} followers • {acc.accountType}
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> ACTIVE
              </span>
            </div>

            {/* Details table */}
            <div className="bg-slate-50 rounded-xl p-3 divide-y divide-slate-200/60 text-xs">
              <div className="py-1.5 flex justify-between text-slate-600">
                <span>Meta Page ID:</span>
                <span className="font-mono text-slate-800">{acc.metaPageId}</span>
              </div>
              <div className="py-1.5 flex justify-between text-slate-600">
                <span>Webhook Subscription:</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active (Comments, Stories, DMs)
                </span>
              </div>
              <div className="py-1.5 flex justify-between text-slate-600">
                <span>Connected Since:</span>
                <span className="text-slate-800">{acc.connectedAt}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3 text-slate-400" /> Re-sync Permissions
              </button>
              <a
                href={`https://instagram.com/${acc.username}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-purple-600 hover:underline flex items-center gap-1"
              >
                <span>View on Instagram</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Meta OAuth Simulation Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-purple-200 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Meta Dialog Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                  <FacebookIcon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Meta Business Login</h4>
                  <p className="text-[10px] text-slate-400">Official Graph API Connection</p>
                </div>
              </div>
              <button
                onClick={() => setShowConnectModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSimulateOAuth} className="space-y-4">
              <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-100 text-xs text-slate-600 space-y-1">
                <p className="font-bold text-purple-900">Required Permissions:</p>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-purple-800">
                  <li>instagram_basic</li>
                  <li>instagram_manage_messages</li>
                  <li>instagram_manage_comments</li>
                  <li>pages_show_list</li>
                </ul>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Instagram Handle / Username
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">@</span>
                  <input
                    type="text"
                    required
                    value={newHandle}
                    onChange={(e) => setNewHandle(e.target.value)}
                    placeholder="yourbrandname"
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Lock className="w-3.5 h-3.5 text-emerald-500" />
                <span>No password required • Read &amp; automated reply only</span>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowConnectModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isConnecting}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-md shadow-purple-500/20 flex items-center gap-2 disabled:opacity-50"
                >
                  {isConnecting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Verifying with Meta...</span>
                    </>
                  ) : (
                    <span>Authorize &amp; Connect</span>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
