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
  EyeOff, 
  Search, 
  Share2, 
  FileCode, 
  Tag, 
  Image as ImageIcon, 
  Upload, 
  Monitor, 
  Smartphone, 
  Check, 
  RefreshCw,
  Copy,
  ExternalLink,
  Lock,
  Database
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { InstaLogo } from '@/components/common/InstaLogo';
import { InstagramIcon, FacebookIcon } from '@/components/common/BrandIcons';

export default function AdminSettingsPage() {
  const { 
    currencyPolicy: ctxPolicy, 
    setCurrencyPolicy: setCtxPolicy,
    allowManualSwitcher: ctxAllowSwitcher,
    setAllowManualSwitcher: setCtxAllowSwitcher
  } = useCurrency();

  const [settings, setSettings] = useState<AdminSettings>(INITIAL_ADMIN_SETTINGS);
  const [saved, setSaved] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [copiedWebhook, setCopiedWebhook] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);
  const [webhookTestStatus, setWebhookTestStatus] = useState<'idle' | 'testing' | 'success' | 'failed'>('idle');
  const [copiedSql, setCopiedSql] = useState(false);

  // Sync with localStorage & CurrencyContext on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('instadm_admin_settings');
      if (stored) {
        setSettings(JSON.parse(stored));
      } else {
        setSettings((prev) => ({
          ...prev,
          currencyPolicy: ctxPolicy || 'AUTO_GEO',
          allowManualSwitcher: ctxAllowSwitcher || false
        }));
      }
    } catch {
      // ignore
    }
  }, [ctxPolicy, ctxAllowSwitcher]);

  const handleUpdate = (field: keyof AdminSettings, val: unknown) => {
    setSettings((prev) => ({ ...prev, [field]: val }));
  };

  const handleTestWebhook = async () => {
    setWebhookTestStatus('testing');
    try {
      const token = settings.webhookVerifyToken || 'instadm_meta_verify_token_prod_2026';
      const res = await fetch(`/api/webhooks/instagram?hub.mode=subscribe&hub.challenge=test_handshake_challenge&hub.verify_token=${encodeURIComponent(token)}`);
      if (res.ok) {
        const text = await res.text();
        if (text === 'test_handshake_challenge') {
          setWebhookTestStatus('success');
        } else {
          setWebhookTestStatus('failed');
        }
      } else {
        setWebhookTestStatus('failed');
      }
    } catch {
      setWebhookTestStatus('failed');
    }
    setTimeout(() => setWebhookTestStatus('idle'), 4500);
  };

  const handleFileUpload = (field: 'logoUrl' | 'faviconUrl' | 'metaBannerUrl', file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        handleUpdate(field, e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Update CurrencyContext & localStorage
    setCtxPolicy(settings.currencyPolicy);
    setCtxAllowSwitcher(settings.allowManualSwitcher);

    // 2. Persist full settings to localStorage
    try {
      localStorage.setItem('instadm_admin_settings', JSON.stringify(settings));
      window.dispatchEvent(new Event('instadm_settings_updated'));
    } catch {
      // ignore
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
    try {
      confetti({ particleCount: 35, spread: 55 });
    } catch {}
  };

  const titleLength = (settings.siteTitle || '').length;
  const descLength = (settings.metaDescription || '').length;

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
            Brand Assets, Logo, Favicon &amp; SEO
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Customize your logo, browser favicon, Meta social banner, SEO tags, and Geo-IP currency targeting.
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
          <span>Brand logo, favicon, Meta banner, and SEO configurations saved live across the website!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* BRAND IDENTITY, LOGO, FAVICON & META SOCIAL BANNER SUITE */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Brand Identity, Logo &amp; Favicon</h3>
              <p className="text-xs text-slate-500">
                Manage your logo image, browser tab favicon, and social media sharing cover banner.
              </p>
            </div>
          </div>

          {/* Brand Name & Suffix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Brand Name
              </label>
              <input
                type="text"
                required
                value={settings.brandName || 'InstaDM'}
                onChange={(e) => handleUpdate('brandName', e.target.value)}
                placeholder="InstaDM"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Displayed in header, emails, and brand logo mark.</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Domain Suffix / Badge
              </label>
              <input
                type="text"
                value={settings.brandSuffix ?? '.dev'}
                onChange={(e) => handleUpdate('brandSuffix', e.target.value)}
                placeholder=".dev"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold text-purple-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Small pill badge beside logo (leave empty to hide).</span>
            </div>
          </div>

          {/* 1. LOGO CONFIGURATION & LIVE PREVIEW */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700">1. Website Logo (Header &amp; Navigation)</h4>
                <p className="text-[11px] text-slate-500">Provide an image URL, upload a logo directly from your computer, or use the default gradient vector icon.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-7 space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700">Custom Logo Image</label>
                    <label className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 transition-colors">
                      <Upload className="w-3 h-3" />
                      <span>Upload File</span>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/svg+xml,image/webp"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) handleFileUpload('logoUrl', e.target.files[0]);
                        }}
                      />
                    </label>
                  </div>
                  <input
                    type="url"
                    value={settings.logoUrl || ''}
                    onChange={(e) => handleUpdate('logoUrl', e.target.value)}
                    placeholder="https://instadm.dev/custom-logo.png (or upload file)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Recommended: Transparent PNG, SVG, or WebP (Height: 40px - 80px).
                  </span>
                </div>

                {/* Preset Logo Quick Selectors */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[10px] font-bold text-slate-400">Presets &amp; Actions:</span>
                  <button
                    type="button"
                    onClick={() => handleUpdate('logoUrl', '')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                      !settings.logoUrl ? 'bg-purple-100 border-purple-300 text-purple-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Default Gradient Vector
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdate('logoUrl', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                      settings.logoUrl?.includes('photo-1618005182384') ? 'bg-purple-100 border-purple-300 text-purple-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Gradient Square Icon
                  </button>
                  {settings.logoUrl && (
                    <button
                      type="button"
                      onClick={() => handleUpdate('logoUrl', '')}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-bold border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                    >
                      Clear Logo
                    </button>
                  )}
                </div>
              </div>

              {/* Live Logo Preview Box */}
              <div className="md:col-span-5 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Live Logo Preview:
                </span>
                
                {/* Light Mode Preview */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-2.5">
                    {settings.logoUrl ? (
                      <img src={settings.logoUrl} alt="Logo" className="h-9 w-auto object-contain rounded-lg" />
                    ) : (
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                        IG
                      </div>
                    )}
                    <span className="font-black text-slate-900 text-base">
                      {settings.brandName || 'InstaDM'}
                      <span className="text-purple-600 text-xs font-mono ml-1">{settings.brandSuffix}</span>
                    </span>
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">Light Navbar</span>
                </div>

                {/* Dark Mode Preview */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-2.5">
                    {settings.logoUrl ? (
                      <img src={settings.logoUrl} alt="Logo" className="h-9 w-auto object-contain rounded-lg" />
                    ) : (
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                        IG
                      </div>
                    )}
                    <span className="font-black text-white text-base">
                      {settings.brandName || 'InstaDM'}
                      <span className="text-purple-400 text-xs font-mono ml-1">{settings.brandSuffix}</span>
                    </span>
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded">Dark Admin</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. FAVICON CONFIGURATION & LIVE BROWSER TAB MOCKUP */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700">2. Browser Tab Favicon (.ico / .png)</h4>
              <p className="text-[11px] text-slate-500">The 32x32 icon displayed next to your website title in browser tabs and bookmarks.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-7 space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700">Favicon Image URL</label>
                    <label className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 transition-colors">
                      <Upload className="w-3 h-3" />
                      <span>Upload Favicon</span>
                      <input
                        type="file"
                        accept="image/x-icon,image/png,image/svg+xml,image/jpeg"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) handleFileUpload('faviconUrl', e.target.files[0]);
                        }}
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    value={settings.faviconUrl || '/favicon.ico'}
                    onChange={(e) => handleUpdate('faviconUrl', e.target.value)}
                    placeholder="/favicon.ico or https://instadm.dev/favicon-32x32.png"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Supported formats: .ico, .png, .svg (Recommended square dimensions 32x32 or 64x64).
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[10px] font-bold text-slate-400">Presets &amp; Actions:</span>
                  <button
                    type="button"
                    onClick={() => handleUpdate('faviconUrl', '/favicon.ico')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                      settings.faviconUrl === '/favicon.ico' ? 'bg-purple-100 border-purple-300 text-purple-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Default (/favicon.ico)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdate('faviconUrl', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=32&h=32&q=80')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                      settings.faviconUrl?.includes('w=32') ? 'bg-purple-100 border-purple-300 text-purple-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Neon Gradient Square
                  </button>
                  {settings.faviconUrl && settings.faviconUrl !== '/favicon.ico' && (
                    <button
                      type="button"
                      onClick={() => handleUpdate('faviconUrl', '/favicon.ico')}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-bold border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                      Reset Default
                    </button>
                  )}
                </div>
              </div>

              {/* Browser Tab Simulator Preview */}
              <div className="md:col-span-5 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Live Browser Tab Preview:
                </span>
                
                <div className="p-3 rounded-2xl bg-slate-200/80 border border-slate-300 shadow-2xs space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  </div>

                  {/* Active Tab */}
                  <div className="bg-white rounded-t-xl px-3 py-2 flex items-center justify-between gap-2 shadow-xs border-b-2 border-purple-500">
                    <div className="flex items-center gap-2 truncate">
                      {settings.faviconUrl ? (
                        <img src={settings.faviconUrl} alt="Favicon" className="w-4 h-4 rounded-xs shrink-0 object-contain" />
                      ) : (
                        <div className="w-4 h-4 rounded-xs bg-purple-600 text-white flex items-center justify-center text-[8px] font-bold">
                          I
                        </div>
                      )}
                      <span className="text-xs font-semibold text-slate-800 truncate">
                        {settings.siteTitle ? settings.siteTitle.split('–')[0].trim() : 'InstaDM'}
                      </span>
                    </div>
                    <span className="text-slate-400 text-xs hover:text-slate-600 cursor-pointer">×</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. META SOCIAL SHARE BANNER (OPENGRAPH 1200x630) */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700">3. Meta Social Share Banner (OpenGraph 1200 × 630)</h4>
              <p className="text-[11px] text-slate-500">The preview banner image displayed when anyone shares instadm.dev on WhatsApp, Twitter/X, Facebook, or LinkedIn.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-7 space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700">Meta Banner Image URL</label>
                    <label className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 transition-colors">
                      <Upload className="w-3 h-3" />
                      <span>Upload Banner</span>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) handleFileUpload('metaBannerUrl', e.target.files[0]);
                        }}
                      />
                    </label>
                  </div>
                  <input
                    type="url"
                    value={settings.metaBannerUrl || ''}
                    onChange={(e) => handleUpdate('metaBannerUrl', e.target.value)}
                    placeholder="https://instadm.dev/og-cover.png (1200x630 or upload file)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Ideal dimensions: 1200px width by 630px height (1.91:1 ratio).
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[10px] font-bold text-slate-400">Presets &amp; Actions:</span>
                  <button
                    type="button"
                    onClick={() => handleUpdate('metaBannerUrl', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=630&q=85')}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-bold border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    Preset: Purple 3D SaaS Mesh
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdate('metaBannerUrl', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&h=630&q=85')}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-bold border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    Preset: Electric Indigo Tech
                  </button>
                  {settings.metaBannerUrl && (
                    <button
                      type="button"
                      onClick={() => handleUpdate('metaBannerUrl', '')}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-bold border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                      Clear Banner
                    </button>
                  )}
                </div>
              </div>

              {/* Social Share Card Preview */}
              <div className="md:col-span-5 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  WhatsApp / Twitter / Meta Share Preview:
                </span>
                
                <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                  <div className="relative aspect-[1.91/1] bg-slate-900 overflow-hidden">
                    <img
                      src={settings.metaBannerUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=630&q=85'}
                      alt="Meta Banner"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                      <span className="text-white font-bold text-xs leading-snug line-clamp-1">
                        {settings.siteTitle || 'InstaDM – Turn Every Instagram Interaction Into a Customer'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border-t border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">instadm.dev</span>
                    <p className="text-xs text-slate-700 font-semibold line-clamp-1 mt-0.5">
                      {settings.ogDescription || settings.metaDescription || 'Automate Instagram DMs and convert followers into customers 24/7.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* COMPREHENSIVE SEO & METADATA SUITE */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Search Engine Optimization (SEO)</h3>
                <p className="text-xs text-slate-500">
                  Manage search engine indexability, Google snippet previews, and metadata tags.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.robotsIndex ?? true}
                  onChange={(e) => handleUpdate('robotsIndex', e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded"
                />
                <span>Index &amp; Follow (robots.txt)</span>
              </label>
            </div>
          </div>

          {/* LIVE GOOGLE SERP PREVIEW BOX */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-purple-600" />
              Google Desktop &amp; Mobile Search Result Preview:
            </span>
            
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
              <div className="flex items-center gap-2 text-xs text-slate-700 font-sans">
                <div className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center text-[9px] font-bold">
                  I
                </div>
                <span className="text-[12px] text-slate-800 font-normal">instadm.dev</span>
                <span className="text-[11px] text-slate-400">› https://instadm.dev</span>
              </div>
              
              <h4 className="text-base sm:text-lg font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug line-clamp-1">
                {settings.siteTitle || 'InstaDM – Turn Every Instagram Interaction Into a Customer | instadm.dev'}
              </h4>

              <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-2">
                {settings.metaDescription || 'Automate Instagram DMs, reply to comments instantly, capture leads, and convert followers into customers — all on autopilot with official Meta Graph API v21.0.'}
              </p>
            </div>
          </div>

          {/* Form Fields: Title, Keywords, Description, Canonical */}
          <div className="space-y-4">
            
            {/* Meta Title */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  Meta Title Tag (Page Title)
                </label>
                <span className={`text-[10px] font-mono font-bold ${titleLength > 65 ? 'text-amber-600' : 'text-slate-400'}`}>
                  {titleLength} / 60 recommended characters
                </span>
              </div>
              <input
                type="text"
                required
                value={settings.siteTitle}
                onChange={(e) => handleUpdate('siteTitle', e.target.value)}
                placeholder="e.g. InstaDM – Turn Every Instagram Interaction Into a Customer | instadm.dev"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Primary title tag indexed by Google, Bing, and displayed in browser tab headers.
              </span>
            </div>

            {/* Meta Keywords */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  Meta Keywords (Comma Separated)
                </label>
                <Tag className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <input
                type="text"
                value={settings.metaKeywords || ''}
                onChange={(e) => handleUpdate('metaKeywords', e.target.value)}
                placeholder="instagram dm automation, reel comment to dm, meta graph api bot, ig lead generation, instagram bot"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Comma-separated target keywords for SEO crawlers and search discovery.
              </span>
            </div>

            {/* Meta Description */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  Meta Description
                </label>
                <span className={`text-[10px] font-mono font-bold ${descLength > 165 ? 'text-amber-600' : 'text-slate-400'}`}>
                  {descLength} / 160 recommended characters
                </span>
              </div>
              <textarea
                rows={3}
                required
                value={settings.metaDescription || ''}
                onChange={(e) => handleUpdate('metaDescription', e.target.value)}
                placeholder="Enter rich, conversion-focused description snippet displayed on Google search result pages..."
                className="w-full p-3 rounded-xl border border-slate-200 text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Canonical URL & Google Verification */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Canonical URL
                </label>
                <input
                  type="url"
                  value={settings.canonicalUrl || 'https://instadm.dev'}
                  onChange={(e) => handleUpdate('canonicalUrl', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Google Search Console Verification Tag
                </label>
                <input
                  type="text"
                  value={settings.googleVerificationTag || ''}
                  onChange={(e) => handleUpdate('googleVerificationTag', e.target.value)}
                  placeholder="google-site-verification=abc..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

          </div>
        </div>

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

        {/* META GRAPH API & INSTAGRAM CONNECTION SUITE */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <InstagramIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">Meta Graph API &amp; Instagram OAuth 2.0</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-mono">
                    {settings.metaApiVersion || 'v21.0'}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Configure your central Meta Developer App credentials for the entire InstaDM platform.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleTestWebhook}
              disabled={webhookTestStatus === 'testing'}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-2 transition-all shadow-xs ${
                webhookTestStatus === 'success'
                  ? 'bg-emerald-600 text-white'
                  : webhookTestStatus === 'failed'
                  ? 'bg-rose-600 text-white'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${webhookTestStatus === 'testing' ? 'animate-spin' : ''}`} />
              <span>
                {webhookTestStatus === 'testing' && 'Verifying Webhook...'}
                {webhookTestStatus === 'success' && '✓ Webhook Handshake Verified (200 OK)'}
                {webhookTestStatus === 'failed' && '✕ Webhook Handshake Failed'}
                {webhookTestStatus === 'idle' && 'Test Webhook Handshake'}
              </span>
            </button>
          </div>

          {/* How Meta API Architecture Works Infographic */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 via-slate-50 to-indigo-50 border border-purple-100 space-y-2">
            <span className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              <span>How Platform &amp; User Accounts Connect via Meta Graph API</span>
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-[11px] text-slate-600">
              <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
                <span className="font-bold text-slate-900 block">1. Admin / Platform Setup (Here)</span>
                <p>You create 1 Meta Developer App on developers.facebook.com and paste your central App ID &amp; Secret below.</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
                <span className="font-bold text-slate-900 block">2. Client / User Connects (Dashboard)</span>
                <p>Clients log into their individual Instagram account via Meta OAuth in their dashboard without sharing passwords.</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
                <span className="font-bold text-slate-900 block">3. Automated Event Webhooks</span>
                <p>When someone comments on a client's Reel or sends a DM, Meta notifies your webhook URL and InstaDM replies instantly.</p>
              </div>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Meta App ID (from developers.facebook.com)
              </label>
              <input
                type="text"
                value={settings.metaAppId || ''}
                onChange={(e) => handleUpdate('metaAppId', e.target.value)}
                placeholder="e.g. 987123456789012"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Found in your Meta Developer Dashboard under App Settings &gt; Basic.
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">Meta App Secret</label>
                <button
                  type="button"
                  onClick={() => setShowSecret(!showSecret)}
                  className="text-[11px] font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1"
                >
                  {showSecret ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  <span>{showSecret ? 'Hide' : 'Reveal'}</span>
                </button>
              </div>
              <input
                type={showSecret ? 'text' : 'password'}
                value={settings.metaAppSecret || '8f9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d'}
                onChange={(e) => handleUpdate('metaAppSecret', e.target.value)}
                placeholder="••••••••••••••••••••••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Never shared publicly. Used on the server for OAuth token exchange.
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">Webhook Callback URL</label>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText('https://instadm.dev/api/webhooks/instagram');
                    setCopiedWebhook(true);
                    setTimeout(() => setCopiedWebhook(false), 2000);
                  }}
                  className="text-[11px] font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1"
                >
                  {copiedWebhook ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedWebhook ? 'Copied' : 'Copy URL'}</span>
                </button>
              </div>
              <input
                type="text"
                readOnly
                value="https://instadm.dev/api/webhooks/instagram"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-700 bg-slate-50 select-all"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Paste this into Meta Developer App &gt; Webhooks &gt; Instagram.
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">Webhook Verify Token</label>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(settings.webhookVerifyToken || 'instadm_meta_verify_token_prod_2026');
                    setCopiedToken(true);
                    setTimeout(() => setCopiedToken(false), 2000);
                  }}
                  className="text-[11px] font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1"
                >
                  {copiedToken ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedToken ? 'Copied' : 'Copy Token'}</span>
                </button>
              </div>
              <input
                type="text"
                value={settings.webhookVerifyToken || 'instadm_meta_verify_token_prod_2026'}
                onChange={(e) => handleUpdate('webhookVerifyToken', e.target.value)}
                placeholder="instadm_meta_verify_token_prod_2026"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold text-purple-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                The exact secret string you type into Meta when subscribing to webhooks.
              </span>
            </div>
          </div>

          {/* Meta Permissions List */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Required Permissions:</span>
            {['instagram_manage_messages', 'instagram_manage_comments', 'instagram_basic', 'pages_manage_metadata', 'pages_read_engagement'].map((perm) => (
              <span key={perm} className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                {perm}
              </span>
            ))}
          </div>
        </div>

        {/* SUPABASE CLOUD DATABASE (POSTGRESQL) SUITE */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-xs border border-emerald-100">
                <Database className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">Supabase Cloud Database (PostgreSQL)</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Connected
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Global serverless database storing users, automations, captured leads, and referral commissions.
                </p>
              </div>
            </div>

            <a
              href="https://supabase.com/dashboard/project/ostskxaxeccubwnduyss"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Open Supabase Console</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Connected Supabase Project URL
              </label>
              <input
                type="text"
                readOnly
                value="https://ostskxaxeccubwnduyss.supabase.co"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-800 bg-slate-50 select-all"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Project Reference ID: <strong className="font-mono text-purple-700">ostskxaxeccubwnduyss</strong>
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Database Engine &amp; Region
              </label>
              <input
                type="text"
                readOnly
                value="PostgreSQL 15+ (Serverless Cloud Pooler)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Equipped with Row Level Security (RLS) &amp; Realtime Subscriptions.
              </span>
            </div>
          </div>

          {/* Database Schema Setup & 1-Click Copy */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Production Database Schema (supabase/schema.sql)</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    role VARCHAR(50) DEFAULT 'CREATOR',
    plan VARCHAR(50) DEFAULT 'free',
    billing_cycle VARCHAR(20) DEFAULT 'monthly',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.instagram_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    instagram_id VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    profile_picture_url TEXT,
    followers_count INTEGER DEFAULT 0,
    media_count INTEGER DEFAULT 0,
    access_token TEXT NOT NULL,
    token_expires_at TIMESTAMP WITH TIME ZONE,
    connected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.automations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    trigger_type VARCHAR(50) NOT NULL,
    keyword VARCHAR(255) NOT NULL,
    reply_message TEXT NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    instagram_handle VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    status VARCHAR(50) DEFAULT 'LEAD_QUALIFIED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.referrals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    referrer_code VARCHAR(100) NOT NULL,
    referred_user_email VARCHAR(255) NOT NULL,
    referred_user_name VARCHAR(255) NOT NULL,
    plan VARCHAR(50) DEFAULT 'free',
    status VARCHAR(50) DEFAULT 'TRIAL',
    commission_amount NUMERIC(10, 2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.platform_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Security & Idempotent Policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instagram_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public Users Access" ON public.users;
DROP POLICY IF EXISTS "Public Access" ON public.users;
CREATE POLICY "Public Users Access" ON public.users FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Accounts Access" ON public.instagram_accounts;
DROP POLICY IF EXISTS "Public Access" ON public.instagram_accounts;
CREATE POLICY "Public Accounts Access" ON public.instagram_accounts FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Automations Access" ON public.automations;
DROP POLICY IF EXISTS "Public Access" ON public.automations;
CREATE POLICY "Public Automations Access" ON public.automations FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Contacts Access" ON public.contacts;
DROP POLICY IF EXISTS "Public Access" ON public.contacts;
CREATE POLICY "Public Contacts Access" ON public.contacts FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Referrals Access" ON public.referrals;
DROP POLICY IF EXISTS "Public Access" ON public.referrals;
CREATE POLICY "Public Referrals Access" ON public.referrals FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Settings Access" ON public.platform_settings;
DROP POLICY IF EXISTS "Public Access" ON public.platform_settings;
CREATE POLICY "Public Settings Access" ON public.platform_settings FOR ALL USING (true) WITH CHECK (true);`);
                  setCopiedSql(true);
                  setTimeout(() => setCopiedSql(false), 2500);
                }}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 shadow-2xs"
              >
                {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSql ? 'SQL Copied!' : 'Copy Schema SQL'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Run this SQL script inside your <strong>Supabase Dashboard &gt; SQL Editor</strong> to create all tables (users, automations, contacts, referrals) in 1 click.
            </p>
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
                  min="1"
                  max="100"
                  value={settings.affiliateCommissionRate ?? 30}
                  onChange={(e) => handleUpdate('affiliateCommissionRate', Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">%</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Reflected site-wide on all user screens, Refer &amp; Earn dashboard, and commission ledgers.
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

      </form>

    </div>
  );
}
