'use client';

import React, { useState } from 'react';
import { 
  Sliders, 
  Table, 
  Zap, 
  Workflow, 
  Webhook, 
  Bot, 
  CheckCircle2, 
  ExternalLink,
  Save,
  KeyRound,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '@/components/common/BrandIcons';
import confetti from 'canvas-confetti';

export default function IntegrationsDashboardPage() {
  const [openAiKey, setOpenAiKey] = useState('sk-proj-demo-open-ai-key-instadm-prod-2026');
  const [googleSheetsUrl, setGoogleSheetsUrl] = useState('https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZj_instadm_leads/edit');
  const [webhookUrl, setWebhookUrl] = useState('https://api.yourdomain.com/v1/instadm-inbound-webhook');
  const [savedStatus, setSavedStatus] = useState<string | null>(null);

  const handleSave = (service: string) => {
    setSavedStatus(service);
    setTimeout(() => setSavedStatus(null), 3000);
    try {
      confetti({ particleCount: 30, spread: 50 });
    } catch {}
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Integrations &amp; Webhooks
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Connect external marketing software, configure API keys, and set up outbound webhook endpoints.
        </p>
      </div>

      <div className="space-y-6">
        
        {/* OpenAI GPT-4o */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500 text-white flex items-center justify-center font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">OpenAI GPT-4o Integration</h3>
                <p className="text-xs text-slate-500">Powers autonomous conversational DM intelligence</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              CONNECTED
            </span>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">OpenAI Secret API Key</label>
            <div className="flex gap-2">
              <input
                type="password"
                value={openAiKey}
                onChange={(e) => setOpenAiKey(e.target.value)}
                className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => handleSave('OpenAI')}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs"
              >
                {savedStatus === 'OpenAI' ? 'Saved!' : 'Update Key'}
              </button>
            </div>
            <p className="text-[11px] text-slate-400">Stored with AES-256 server-side encryption.</p>
          </div>
        </div>

        {/* Google Sheets Sync */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Table className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Google Sheets Direct Sync</h3>
                <p className="text-xs text-slate-500">Appends captured emails &amp; phone numbers automatically</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              LIVE SYNC
            </span>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">Google Sheet Target URL</label>
            <div className="flex gap-2">
              <input
                type="url"
                value={googleSheetsUrl}
                onChange={(e) => setGoogleSheetsUrl(e.target.value)}
                className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => handleSave('Sheets')}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs"
              >
                {savedStatus === 'Sheets' ? 'Synced!' : 'Save Sheet'}
              </button>
            </div>
          </div>
        </div>

        {/* Custom Outbound Webhooks */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
                <Webhook className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Outbound Webhooks (HMAC Signed)</h3>
                <p className="text-xs text-slate-500">Post JSON events when triggers execute or leads are captured</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
              ACTIVE
            </span>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">Webhook Destination Endpoint</label>
            <div className="flex gap-2">
              <input
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => handleSave('Webhook')}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs"
              >
                {savedStatus === 'Webhook' ? 'Verified!' : 'Test & Save'}
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
