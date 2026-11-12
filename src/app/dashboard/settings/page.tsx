'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  User, 
  Lock, 
  ShieldCheck, 
  Key, 
  Save, 
  CheckCircle2, 
  Copy,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SettingsPage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || 'Alex Rivera');
  const [email, setEmail] = useState(user?.email || 'alex@creatorstudio.co');
  const [saved, setSaved] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);

  const verifyToken = 'instadm_meta_verify_token_prod_2026';

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    try {
      confetti({ particleCount: 30, spread: 50 });
    } catch {}
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(verifyToken);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Account &amp; Security Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your personal profile, Meta developer webhook credentials, and team access.
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <User className="w-5 h-5 text-purple-600" />
            <h3 className="text-base font-bold text-slate-900">Personal Information</h3>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              {saved ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Changes saved!
                </span>
              ) : <span />}

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs transition-colors"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>

        {/* Meta Webhook Verification Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Key className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">Meta Webhook Verification Details</h3>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Use these official credentials in your Meta App Dashboard under <strong>Instagram Graph API ➔ Webhooks</strong>:
          </p>

          <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 font-semibold block mb-0.5">Callback URL:</span>
              <div className="p-2 bg-white rounded-lg border border-slate-200 font-mono text-[11px] text-purple-700">
                https://instadm.dev/api/webhooks/instagram
              </div>
            </div>

            <div>
              <span className="text-slate-500 font-semibold block mb-0.5">Verify Token (hub.verify_token):</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={verifyToken}
                  className="w-full p-2 bg-white rounded-lg border border-slate-200 font-mono text-[11px] text-slate-800"
                />
                <button
                  onClick={handleCopy}
                  className="px-3 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg text-slate-700 font-bold text-xs flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedToken ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
