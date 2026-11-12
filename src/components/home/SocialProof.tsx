import React from 'react';
import { MessageSquareText, TrendingUp, Clock, Zap, Shield, Sparkles } from 'lucide-react';

export function SocialProof() {
  const metrics = [
    {
      label: 'Automated Interactions Processed',
      value: '10M+',
      subtext: 'Comments & story replies converted',
      icon: MessageSquareText,
      color: 'from-purple-600 to-indigo-600',
    },
    {
      label: 'DM Delivery Success Rate',
      value: '99.8%',
      subtext: 'Compliant Meta Graph API routing',
      icon: Shield,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      label: 'Average Lead Capture Lift',
      value: '4.8x',
      subtext: 'Compared to traditional bio links',
      icon: TrendingUp,
      color: 'from-pink-500 to-rose-600',
    },
    {
      label: 'Average Automated Response Time',
      value: '< 2 sec',
      subtext: 'Instant conversational engagement',
      icon: Clock,
      color: 'from-indigo-600 to-purple-700',
    },
  ];

  const badges = [
    'Content Creators & Influencers',
    'E-commerce & Shopify Brands',
    'Coaches & Course Educators',
    'Growth & Marketing Agencies',
    'Digital Product Sellers',
  ];

  return (
    <section className="py-12 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-xs uppercase tracking-widest font-bold text-purple-700 mb-2">
            Engineered for Modern Instagram Growth
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Built for creators and businesses who demand reliable Instagram automation.
          </h2>
        </div>

        {/* 4 Editable Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/80 hover:border-purple-300 shadow-xs hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center shadow-xs`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                    Live Metric
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-1">
                  {item.value}
                </div>
                <h4 className="text-sm font-bold text-slate-800 mb-1">{item.label}</h4>
                <p className="text-xs text-slate-500">{item.subtext}</p>
              </div>
            );
          })}
        </div>

        {/* Target Audience Badges Marquee/Row */}
        <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">
            Trusted Across:
          </span>
          {badges.map((b, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100/80 text-slate-700 text-xs font-medium border border-slate-200/60 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 transition-colors"
            >
              <Zap className="w-3 h-3 text-purple-600" />
              <span>{b}</span>
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
