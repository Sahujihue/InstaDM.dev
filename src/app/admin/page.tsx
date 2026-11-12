'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  ShieldCheck, 
  DollarSign, 
  ArrowUpRight, 
  Terminal, 
  Settings,
  HelpCircle,
  MessageSquare
} from 'lucide-react';

export default function AdminOverviewPage() {
  const metrics = [
    { label: 'Monthly Recurring Revenue (MRR)', value: '$48,250', change: '+14.2% MoM', icon: DollarSign, color: 'from-purple-600 to-indigo-600' },
    { label: 'Annual Run Rate (ARR)', value: '$579,000', change: '+22.6% YoY', icon: TrendingUp, color: 'from-emerald-500 to-teal-600' },
    { label: 'Total Registered Users', value: '4,921', change: '+184 this week', icon: Users, color: 'from-pink-500 to-rose-600' },
    { label: 'Active Paid Subscriptions', value: '3,810', change: '77.4% conversion', icon: CreditCard, color: 'from-indigo-600 to-purple-700' },
  ];

  const quickActions = [
    { title: 'Pricing & Plans Manager', desc: 'Edit INR/USD prices, change feature limits, and discounts dynamically.', href: '/admin/pricing', icon: CreditCard },
    { title: 'User Management', desc: 'Search users, inspect accounts, upgrade plans, and ban abusers.', href: '/admin/users', icon: Users },
    { title: 'Manage Testimonials', desc: 'Approve, edit, or hide creator testimonials and customer metrics.', href: '/admin/testimonials', icon: MessageSquare },
    { title: 'FAQ & Help Content', desc: 'Add new questions or update platform compliance answers.', href: '/admin/faqs', icon: HelpCircle },
    { title: 'System Logs & Audits', desc: 'Inspect incoming Meta webhook payloads, latency, and status.', href: '/admin/logs', icon: Terminal },
    { title: 'SEO & Site Branding', desc: 'Update announcement bar text, homepage meta titles, and descriptions.', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            SuperAdmin Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Global metrics, subscription performance, and complete content management for InstaDM.dev.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono font-bold bg-white px-3 py-1.5 rounded-xl border border-slate-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Meta API v21.0 Online</span>
        </div>
      </div>

      {/* 4 Financial & User Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{m.label}</span>
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${m.color} text-white flex items-center justify-center shadow-xs`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="text-3xl font-black text-slate-900 tracking-tight">
                {m.value}
              </div>

              <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{m.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Management Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900">Platform Control Modules</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <Link
                key={i}
                href={action.href}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:border-purple-300 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-purple-600 transition-colors mb-1.5">
                    {action.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {action.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-bold text-purple-600 group-hover:translate-x-1 transition-transform">
                  <span>Open Manager</span>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

    </div>
  );
}
