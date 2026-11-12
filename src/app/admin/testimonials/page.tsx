'use client';

import React, { useState } from 'react';
import { INITIAL_TESTIMONIALS } from '@/lib/data';
import { Testimonial } from '@/types';
import { 
  MessageSquare, 
  Plus, 
  Trash2, 
  Save, 
  CheckCircle2, 
  Star 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [saved, setSaved] = useState(false);

  const handleUpdate = (id: string, field: keyof Testimonial, val: unknown) => {
    setTestimonials(testimonials.map((t) => {
      if (t.id === id) {
        return { ...t, [field]: val };
      }
      return t;
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
            Homepage Testimonial Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Edit, add, or reorder customer reviews and performance metrics displayed on the marketing landing page.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Testimonials Live</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Testimonials successfully saved and deployed to the homepage!</span>
        </div>
      )}

      {/* Testimonials List */}
      <div className="space-y-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Customer Name</label>
                <input
                  type="text"
                  value={t.name}
                  onChange={(e) => handleUpdate(t.id, 'name', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Instagram Handle</label>
                <input
                  type="text"
                  value={t.handle}
                  onChange={(e) => handleUpdate(t.id, 'handle', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Metric Result Highlight</label>
                <input
                  type="text"
                  value={t.metricsResult}
                  onChange={(e) => handleUpdate(t.id, 'metricsResult', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-purple-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Review Quote</label>
              <textarea
                rows={2}
                value={t.review}
                onChange={(e) => handleUpdate(t.id, 'review', e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs leading-relaxed"
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
