'use client';

import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Save, 
  HelpCircle, 
  KeyRound, 
  ShieldCheck, 
  MessageSquare,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AiAssistantPage() {
  const [aiEnabled, setAiEnabled] = useState(true);
  const [model, setModel] = useState('gpt-4o');
  const [systemPrompt, setSystemPrompt] = useState(
    `You are the friendly, professional Instagram DM assistant for InstaDM (@themoderncreator). 
Your goals:
1. Greet followers warmly with their name if available.
2. Answer questions accurately about our 2026 Instagram Growth Playbook and pricing plans.
3. If they ask for pricing, highlight our Pro Plan ($29.99/mo or ₹1,499/mo).
4. If they need high-touch onboarding or have >5 client accounts, invite them to book a 1-on-1 strategy call.
5. Strictly adhere to Meta messaging rules: polite, succinct, and transparent.`
  );
  const [knowledgeBase, setKnowledgeBase] = useState(
    `FAQ:
- What is included in the 2026 Growth Playbook? 45-page blueprint, 12 Reel templates, and DM workflow scripts.
- How does the guarantee work? 14-day money-back guarantee with zero questions asked.
- Agency features: Up to 10+ accounts, client workspaces, custom webhooks, priority phone support.`
  );
  const [confidenceThreshold, setConfidenceThreshold] = useState(85);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    try {
      confetti({ particleCount: 30, spread: 50 });
    } catch {}
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              AI-Powered DM Assistant
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800">
              GPT-4o Engine
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Train your autonomous conversational AI agent on your brand knowledge, pricing, and FAQs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer bg-white px-3 py-2 rounded-xl border border-slate-200">
            <input
              type="checkbox"
              checked={aiEnabled}
              onChange={(e) => setAiEnabled(e.target.checked)}
              className="w-4 h-4 text-purple-600 rounded"
            />
            <span>{aiEnabled ? 'AI Assistant Active' : 'AI Assistant Paused'}</span>
          </label>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Model Selection Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900">LLM Engine Configuration</h3>
            </div>
            <span className="text-xs text-slate-400">Meta API Safe</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'gpt-4o', name: 'OpenAI GPT-4o', desc: 'Highest intelligence & reasoning', latency: '~1.1s' },
              { id: 'gpt-4o-mini', name: 'GPT-4o Mini', desc: 'Fastest response & low cost', latency: '~0.6s' },
              { id: 'claude-3-5', name: 'Claude 3.5 Sonnet', desc: 'Natural creative prose', latency: '~1.3s' }
            ].map((m) => (
              <div
                key={m.id}
                onClick={() => setModel(m.id)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  model === m.id
                    ? 'border-purple-600 bg-purple-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-purple-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900">{m.name}</span>
                  <span className="text-[10px] text-emerald-600 font-mono font-semibold">{m.latency}</span>
                </div>
                <p className="text-[11px] text-slate-500">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Prompt Instructions */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1">
              AI Persona &amp; System Instructions
            </label>
            <p className="text-xs text-slate-500 mb-2">
              Define the tone of voice, key goals, rules, and guardrails for automated conversations.
            </p>
            <textarea
              rows={6}
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="w-full p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-800 font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1">
              Custom Knowledge Base &amp; FAQs
            </label>
            <p className="text-xs text-slate-500 mb-2">
              Paste product information, refund terms, and calendar links. The AI will strictly ground answers in this text.
            </p>
            <textarea
              rows={4}
              value={knowledgeBase}
              onChange={(e) => setKnowledgeBase(e.target.value)}
              className="w-full p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-800 font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2 text-xs">
            <span className="text-slate-600 font-medium">Confidence Trigger Threshold: {confidenceThreshold}%</span>
            <input
              type="range"
              min="50"
              max="95"
              value={confidenceThreshold}
              onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
              className="w-48"
            />
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="flex items-center justify-between pt-2">
          {saved ? (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> AI Configuration deployed successfully!
            </span>
          ) : <span />}

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-500/25 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save &amp; Deploy AI Assistant</span>
          </button>
        </div>

      </form>

    </div>
  );
}
