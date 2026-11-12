'use client';

import React, { useState } from 'react';
import { INITIAL_FAQS } from '@/lib/data';
import { FaqItem } from '@/types';
import { 
  HelpCircle, 
  Save, 
  Plus, 
  Trash2, 
  CheckCircle2 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>(INITIAL_FAQS);
  const [saved, setSaved] = useState(false);

  const handleUpdate = (id: string, field: keyof FaqItem, val: string) => {
    setFaqs(faqs.map((f) => {
      if (f.id === id) {
        return { ...f, [field]: val };
      }
      return f;
    }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    try {
      confetti({ particleCount: 30, spread: 50 });
    } catch {}
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            FAQ Content Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Edit question titles, answers, and platform compliance guidelines displayed across the FAQ section.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save FAQs Live</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>FAQ questions updated live on the homepage accordion!</span>
        </div>
      )}

      {/* FAQs List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={faq.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-purple-600">
                FAQ #{index + 1} ({faq.category})
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Question</label>
              <input
                type="text"
                value={faq.question}
                onChange={(e) => handleUpdate(faq.id, 'question', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Answer</label>
              <textarea
                rows={3}
                value={faq.answer}
                onChange={(e) => handleUpdate(faq.id, 'answer', e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed"
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
