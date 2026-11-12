'use client';

import React, { useState } from 'react';
import { INITIAL_ADMIN_SETTINGS } from '@/lib/data';
import { AdminSettings } from '@/types';
import { 
  Settings, 
  Save, 
  CheckCircle2, 
  Globe, 
  Sparkles, 
  ShieldCheck 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<AdminSettings>(INITIAL_ADMIN_SETTINGS);
  const [saved, setSaved] = useState(false);

  const handleUpdate = (field: keyof AdminSettings, val: unknown) => {
    setSettings({ ...settings, [field]: val });
  };

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
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            SEO &amp; Site Branding Configuration
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure site-wide metadata, announcement banner message, and support contact details.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Settings Live</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Branding and SEO configurations successfully saved!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Announcement Bar Settings */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Homepage Top Announcement Bar</h3>
            <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
              <input
                type="checkbox"
                checked={settings.announcementActive}
                onChange={(e) => handleUpdate('announcementActive', e.target.checked)}
                className="w-4 h-4 text-purple-600 rounded"
              />
              <span>Banner Active</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Banner Announcement Text</label>
              <input
                type="text"
                value={settings.announcementText}
                onChange={(e) => handleUpdate('announcementText', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Banner CTA Link Text</label>
              <input
                type="text"
                value={settings.announcementCta}
                onChange={(e) => handleUpdate('announcementCta', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium"
              />
            </div>
          </div>
        </div>

        {/* Global SEO Settings */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">SEO &amp; OpenGraph Settings</h3>
            <p className="text-xs text-slate-500">Search engine title and social media sharing cards</p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Site Title Tag</label>
              <input
                type="text"
                value={settings.siteTitle}
                onChange={(e) => handleUpdate('siteTitle', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Hero Section Main Headline</label>
              <input
                type="text"
                value={settings.heroHeadline}
                onChange={(e) => handleUpdate('heroHeadline', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Hero Subheading</label>
              <textarea
                rows={2}
                value={settings.heroSubheadline}
                onChange={(e) => handleUpdate('heroSubheadline', e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Support Contact Email</label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => handleUpdate('supportEmail', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono"
              />
            </div>
          </div>
        </div>

      </form>

    </div>
  );
}
