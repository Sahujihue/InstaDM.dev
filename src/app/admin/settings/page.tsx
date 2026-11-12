'use client';

import React, { useState, useEffect } from 'react';
import { INITIAL_ADMIN_SETTINGS } from '@/lib/data';
import { AdminSettings } from '@/types';
import { useCurrency } from '@/context/CurrencyContext';
import { 
  Settings, 
  Save, 
  CheckCircle2, 
  Globe, 
  Sparkles, 
  ShieldCheck,
  CreditCard,
  Gift,
  DollarSign,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AdminSettingsPage() {
  const { 
    currencyPolicy: ctxPolicy, 
    setCurrencyPolicy: setCtxPolicy,
    allowManualSwitcher: ctxAllowSwitcher,
    setAllowManualSwitcher: setCtxAllowSwitcher
  } = useCurrency();

  const [settings, setSettings] = useState<AdminSettings>(INITIAL_ADMIN_SETTINGS);
  const [saved, setSaved] = useState(false);

  // Sync with CurrencyContext on mount
  useEffect(() => {
    setSettings((prev) => ({
      ...prev,
      currencyPolicy: ctxPolicy || 'AUTO_GEO',
      allowManualSwitcher: ctxAllowSwitcher || false
    }));
  }, [ctxPolicy, ctxAllowSwitcher]);

  const handleUpdate = (field: keyof AdminSettings, val: unknown) => {
    setSettings((prev) => ({ ...prev, [field]: val }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Update CurrencyContext & localStorage
    setCtxPolicy(settings.currencyPolicy);
    setCtxAllowSwitcher(settings.allowManualSwitcher);

    // 2. Persist full settings to localStorage
    try {
      localStorage.setItem('instadm_admin_settings', JSON.stringify(settings));
    } catch {
      // ignore
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
    try {
      confetti({ particleCount: 35, spread: 55 });
    } catch {}
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold mb-2">
            <Settings className="w-3.5 h-3.5" />
            Global Platform Configuration
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            System &amp; Currency Policy Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure Geo-IP currency targeting, referral commissions, SEO metadata, and announcement banners.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-500/20 hover:-translate-y-0.5 transition-all self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Settings Live</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-3 animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Global platform settings &amp; Geo-Currency rules updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* GEO-CURRENCY TARGETING POLICY */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Geo-IP Country &amp; Currency Targeting</h3>
              <p className="text-xs text-slate-500">
                Control how currency (₹ INR vs $ USD) is presented based on visitor country.
              </p>
            </div>
          </div>

          {/* Currency Policy Radio Options */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Active Currency Policy:
            </label>

            {/* Option 1: AUTO_GEO */}
            <label className={`block p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              settings.currencyPolicy === 'AUTO_GEO'
                ? 'border-purple-600 bg-purple-50/40 ring-2 ring-purple-600/10'
                : 'border-slate-200 hover:border-slate-300 bg-slate-50/30'
            }`}>
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="currencyPolicy"
                  value="AUTO_GEO"
                  checked={settings.currencyPolicy === 'AUTO_GEO'}
                  onChange={() => handleUpdate('currencyPolicy', 'AUTO_GEO')}
                  className="mt-1 text-purple-600 focus:ring-purple-500"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">
                      Strict Auto-Geo IP &amp; Locale Detection (Default)
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                      Recommended
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>India visitors:</strong> Strictly see <strong>₹ INR</strong> (₹499 / ₹1,499 / ₹3,999). International USD pricing is completely hidden.
                    <br />
                    <strong>Non-India visitors:</strong> Strictly see <strong>$ USD</strong> ($9.99 / $29.99 / $79.99). Indian INR pricing is completely hidden.
                  </p>
                </div>
              </div>
            </label>

            {/* Option 2: FORCE_USD */}
            <label className={`block p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              settings.currencyPolicy === 'FORCE_USD'
                ? 'border-purple-600 bg-purple-50/40 ring-2 ring-purple-600/10'
                : 'border-slate-200 hover:border-slate-300 bg-slate-50/30'
            }`}>
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="currencyPolicy"
                  value="FORCE_USD"
                  checked={settings.currencyPolicy === 'FORCE_USD'}
                  onChange={() => handleUpdate('currencyPolicy', 'FORCE_USD')}
                  className="mt-1 text-purple-600 focus:ring-purple-500"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">
                      Force USD ($) Globally (Including India)
                    </span>
                    <span className="bg-purple-100 text-purple-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                      Admin Override
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Overrules IP detection. Indian creators and international visitors alike will both see subscription plans in <strong>$ USD</strong> ($9.99 / $29.99 / $79.99).
                  </p>
                </div>
              </div>
            </label>

            {/* Option 3: FORCE_INR */}
            <label className={`block p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              settings.currencyPolicy === 'FORCE_INR'
                ? 'border-purple-600 bg-purple-50/40 ring-2 ring-purple-600/10'
                : 'border-slate-200 hover:border-slate-300 bg-slate-50/30'
            }`}>
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="currencyPolicy"
                  value="FORCE_INR"
                  checked={settings.currencyPolicy === 'FORCE_INR'}
                  onChange={() => handleUpdate('currencyPolicy', 'FORCE_INR')}
                  className="mt-1 text-purple-600 focus:ring-purple-500"
                />
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 text-xs sm:text-sm">
                    Force INR (₹) Globally
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Overrules IP detection. All visitors worldwide will see prices in <strong>₹ INR</strong> (₹499 / ₹1,499 / ₹3,999).
                  </p>
                </div>
              </div>
            </label>
          </div>

          {/* Manual Switcher Visibility Toggle */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="font-bold text-xs text-slate-900 flex items-center gap-2">
                {settings.allowManualSwitcher ? <Eye className="w-4 h-4 text-purple-600" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
                Allow Manual Currency Switcher on Public Navbar
              </span>
              <p className="text-[11px] text-slate-500 max-w-lg">
                When unchecked (recommended), the dropdown switcher in the navbar is completely hidden, guaranteeing that Indian visitors strictly see INR and non-Indian visitors strictly see USD without any manual override.
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={settings.allowManualSwitcher}
                onChange={(e) => handleUpdate('allowManualSwitcher', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>

        {/* AFFILIATE & REFERRAL PROGRAM SETTINGS */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Affiliate &amp; Refer-to-Earn Program</h3>
              <p className="text-xs text-slate-500">
                Configure payout commission rates and minimum payout thresholds for creator partners.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Recurring Commission Rate (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="5"
                  max="70"
                  value={settings.affiliateCommissionRate || 30}
                  onChange={(e) => handleUpdate('affiliateCommissionRate', Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">%</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Standard industry standard is 30% lifetime recurring commission.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Minimum Payout Threshold (₹ INR)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="500"
                  step="500"
                  value={settings.minimumPayoutAmount || 2000}
                  onChange={(e) => handleUpdate('minimumPayoutAmount', Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">INR</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Equivalent to approx $25 - $50 USD for international partners.
              </span>
            </div>
          </div>
        </div>

        {/* Announcement Bar Settings */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Homepage Top Announcement Bar</h3>
              <p className="text-xs text-slate-400">Notification ribbon displayed at the very top of instadm.dev</p>
            </div>
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Banner CTA Link Text</label>
              <input
                type="text"
                value={settings.announcementCta}
                onChange={(e) => handleUpdate('announcementCta', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium"
              />
            </div>
          </div>
        </div>

        {/* Global SEO Settings */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">SEO &amp; OpenGraph Settings</h3>
            <p className="text-xs text-slate-500">Search engine title and social media sharing cards</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Site Title Tag</label>
              <input
                type="text"
                value={settings.siteTitle}
                onChange={(e) => handleUpdate('siteTitle', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Hero Section Main Headline</label>
              <input
                type="text"
                value={settings.heroHeadline}
                onChange={(e) => handleUpdate('heroHeadline', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium"
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono"
              />
            </div>
          </div>
        </div>

      </form>

    </div>
  );
}
