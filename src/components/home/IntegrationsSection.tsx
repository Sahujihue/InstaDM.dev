'use client';

import React, { useState } from 'react';
import { 
  Share2, 
  Table, 
  Zap, 
  Workflow, 
  Webhook, 
  Bot, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { InstagramIcon } from '@/components/common/BrandIcons';
import Link from 'next/link';

export function IntegrationsSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'live' | 'upcoming'>('all');

  const integrations = [
    {
      name: 'Instagram Graph API',
      category: 'Core Social',
      icon: InstagramIcon,
      color: 'from-purple-600 via-pink-500 to-orange-400',
      description: 'Official Meta Graph API messaging partner integration. Safely connects eligible Creator & Business accounts.',
      status: 'LIVE',
      badge: 'Official Meta API',
    },
    {
      name: 'Facebook Messenger',
      category: 'Omnichannel',
      icon: Share2,
      color: 'from-blue-600 to-indigo-600',
      description: 'Sync conversations and automated comment responses across your connected Facebook Business Pages.',
      status: 'LIVE',
      badge: 'Active & Verified',
    },
    {
      name: 'Google Sheets',
      category: 'Spreadsheets',
      icon: Table,
      color: 'from-emerald-600 to-teal-500',
      description: 'Stream verified email addresses, telephone numbers, and timestamps directly into your designated spreadsheets in real time.',
      status: 'LIVE',
      badge: 'Instant Sync',
    },
    {
      name: 'Zapier',
      category: 'Automation',
      icon: Zap,
      color: 'from-orange-500 to-amber-500',
      description: 'Connect InstaDM to 5,000+ business applications including HubSpot, ActiveCampaign, Mailchimp, and Notion.',
      status: 'LIVE',
      badge: 'Native App',
    },
    {
      name: 'Make (Integromat)',
      category: 'Automation',
      icon: Workflow,
      color: 'from-purple-600 to-indigo-700',
      description: 'Trigger complex multi-branch scenarios in Make when new leads are captured or specific keywords are received.',
      status: 'LIVE',
      badge: 'Webhook Ready',
    },
    {
      name: 'Custom Webhooks',
      category: 'Developer API',
      icon: Webhook,
      color: 'from-slate-700 to-slate-900',
      description: 'Send custom HMAC-signed JSON payloads to your own backend servers or custom CRM endpoints within milliseconds.',
      status: 'LIVE',
      badge: 'REST API & Webhooks',
    },
    {
      name: 'OpenAI GPT-4o',
      category: 'Artificial Intelligence',
      icon: Bot,
      color: 'from-teal-600 to-cyan-600',
      description: 'Power your AI DM Assistant with custom instructions, prompt guardrails, and knowledge retrieval.',
      status: 'LIVE',
      badge: 'GPT-4o Engine',
    },
    {
      name: 'Klaviyo & Shopify',
      category: 'E-commerce',
      icon: ExternalLink,
      color: 'from-violet-600 to-pink-500',
      description: 'Direct 1-click cart creation, discount voucher syncing, and customer profile enrichment.',
      status: 'UPCOMING',
      badge: 'Q1 Roadmap',
    },
  ];

  const filtered = integrations.filter((item) => {
    if (activeTab === 'live') return item.status === 'LIVE';
    if (activeTab === 'upcoming') return item.status === 'UPCOMING';
    return true;
  });

  return (
    <section id="integrations" className="py-20 lg:py-28 bg-slate-50/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Seamless Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Connects With Your Favorite Tools.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            InstaDM fits cleanly into your existing tech stack. Stream captured leads, trigger downstream workflows, and sync customer data instantly.
          </p>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-purple-50'
              }`}
            >
              All Integrations ({integrations.length})
            </button>
            <button
              onClick={() => setActiveTab('live')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'live'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-purple-50'
              }`}
            >
              Live &amp; Ready (7)
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'upcoming'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-purple-50'
              }`}
            >
              Coming Soon (1)
            </button>
          </div>
        </div>

        {/* Integration Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-purple-300 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.status === 'LIVE'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-600 transition-colors mb-1.5">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mb-3">
                    {item.category}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Status</span>
                  <span className={`font-semibold flex items-center gap-1 ${item.status === 'LIVE' ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {item.status === 'LIVE' ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Ready to Connect
                      </>
                    ) : (
                      'In Development'
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom banner for developers & custom webhooks */}
        <div className="mt-12 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
              <Webhook className="w-5 h-5 text-purple-400" /> Need a Custom API or Private Webhook?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              InstaDM supports inbound and outbound webhooks with HMAC signature verification on all plans.
            </p>
          </div>
          <Link
            href="/dashboard/integrations"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-900 bg-white hover:bg-slate-100 shadow-sm flex-shrink-0 transition-all"
          >
            <span>Configure Webhooks</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
