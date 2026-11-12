'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Users, 
  Zap, 
  ArrowUpRight, 
  Calendar 
} from 'lucide-react';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30D');

  const topPosts = [
    {
      title: 'Reel #104: 2026 Instagram Growth Blueprint',
      keyword: 'LINK',
      comments: 4820,
      dmsDelivered: 4790,
      leads: 3210,
      conversionRate: '67.0%'
    },
    {
      title: 'Post #89: Black Friday 30% VIP Voucher Drop',
      keyword: 'VIP',
      comments: 9140,
      dmsDelivered: 9120,
      leads: 5840,
      conversionRate: '64.0%'
    },
    {
      title: 'Reel #98: 5 Mistakes Coaches Make on IG',
      keyword: 'COACH',
      comments: 890,
      dmsDelivered: 885,
      leads: 540,
      conversionRate: '61.0%'
    }
  ];

  const hourlyVolume = [
    { hour: '12 AM', volume: 45 },
    { hour: '3 AM', volume: 20 },
    { hour: '6 AM', volume: 90 },
    { hour: '9 AM', volume: 340 },
    { hour: '12 PM', volume: 620 },
    { hour: '3 PM', volume: 510 },
    { hour: '6 PM', volume: 780 },
    { hour: '9 PM', volume: 940 }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Analytics &amp; Conversion Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time telemetry on comment volume, automated DM deliveries, and verified lead conversion.
          </p>
        </div>

        {/* Date Filter */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-slate-200 self-start sm:self-auto text-xs font-bold">
          {['7D', '30D', '90D', 'ALL'].map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                timeRange === r
                  ? 'bg-purple-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Analytics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Total DM Volume</span>
          <div className="text-3xl font-black text-slate-900">28,490</div>
          <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3.5 h-3.5" /> +21.4% vs last period
          </span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Delivery Success Rate</span>
          <div className="text-3xl font-black text-slate-900">99.8%</div>
          <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Official Graph API Safe
          </span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Avg Lead Conversion</span>
          <div className="text-3xl font-black text-purple-600">64.5%</div>
          <span className="text-xs text-slate-400 mt-1 block">Comment to verified email</span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Avg Automated Response</span>
          <div className="text-3xl font-black text-indigo-600">1.4s</div>
          <span className="text-xs text-slate-400 mt-1 block">Instant follower gratification</span>
        </div>
      </div>

      {/* Hourly Activity Bar Chart */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Hourly Message Traffic</h3>
            <p className="text-xs text-slate-500">Peak automation volume throughout the day</p>
          </div>
          <span className="text-xs font-mono font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
            Peak: 9:00 PM EST
          </span>
        </div>

        {/* Visual Bar Graph */}
        <div className="pt-4 grid grid-cols-8 gap-2 sm:gap-4 items-end h-48">
          {hourlyVolume.map((item) => (
            <div key={item.hour} className="flex flex-col items-center gap-2 h-full justify-end">
              <div
                className="w-full bg-gradient-to-t from-purple-600 to-indigo-500 rounded-xl transition-all hover:opacity-90 relative group"
                style={{ height: `${(item.volume / 1000) * 100}%` }}
              >
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.volume}
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-mono truncate">{item.hour}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performing Instagram Posts */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900">Top Performing Instagram Posts &amp; Reels</h3>
          <p className="text-xs text-slate-500">Posts generating the highest comment volume and lead conversion</p>
        </div>

        <div className="divide-y divide-slate-100">
          {topPosts.map((p, idx) => (
            <div key={idx} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">{p.title}</h4>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>Trigger Keyword:</span>
                  <span className="px-2 py-0.2 rounded bg-purple-100 text-purple-700 font-mono font-bold text-[11px]">
                    &quot;{p.keyword}&quot;
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6 sm:gap-8 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Comments</span>
                  <span className="font-bold text-slate-900 text-sm">{p.comments.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Leads</span>
                  <span className="font-bold text-purple-600 text-sm">{p.leads.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Conversion</span>
                  <span className="font-bold text-emerald-600 text-sm">{p.conversionRate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
