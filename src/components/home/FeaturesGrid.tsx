import React from 'react';
import { 
  MessageSquare, 
  Sparkles, 
  KeyRound, 
  Bot, 
  UserPlus, 
  MailCheck, 
  Clock8, 
  GitFork, 
  Users, 
  BarChart3, 
  Radio, 
  Share2, 
  ArrowUpRight 
} from 'lucide-react';

interface FeatureCardProps {
  number: string;
  title: string;
  description: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  preview: React.ReactNode;
}

export function FeaturesGrid() {
  const features: FeatureCardProps[] = [
    {
      number: '01',
      title: 'Instagram Comment to DM',
      description: 'Automatically send personalized Direct Messages with buttons, download links, and coupons when someone comments on any post or Reel.',
      badge: 'High Conversion',
      icon: MessageSquare,
      accentColor: 'from-purple-600 to-indigo-600',
      preview: (
        <div className="bg-slate-900 rounded-xl p-3 text-xs text-white border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Reel Comment: &quot;SEND PDF&quot;</span>
            <span className="text-emerald-400">Triggered</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200">
            <span className="text-purple-300 font-bold">Auto DM Sent:</span> &quot;Here is your free 45-page blueprint! [Download Link]&quot;
          </div>
        </div>
      ),
    },
    {
      number: '02',
      title: 'Story Reply Automation',
      description: 'Never miss an engaged follower. Automatically respond with custom greetings and rewards whenever someone replies to or mentions your Instagram Story.',
      badge: '24/7 Engagement',
      icon: Sparkles,
      accentColor: 'from-pink-500 to-rose-600',
      preview: (
        <div className="bg-slate-900 rounded-xl p-3 text-xs text-white border border-slate-800 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-pink-500" />
            <span className="text-slate-300">Replied to your Story with 🔥</span>
          </div>
          <div className="p-2 rounded-lg bg-pink-950/40 border border-pink-800/60 text-pink-200">
            &quot;Thanks for watching! Grab a 15% VIP discount code on us.&quot;
          </div>
        </div>
      ),
    },
    {
      number: '03',
      title: 'DM Keyword Automation',
      description: 'Trigger full conversational funnels when followers send specific trigger words like "COACH", "VIP", "PRICE", or "START".',
      badge: 'Intent-Based',
      icon: KeyRound,
      accentColor: 'from-violet-600 to-purple-600',
      preview: (
        <div className="bg-slate-900 rounded-xl p-3 text-xs text-white border border-slate-800 space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono font-bold">KEYWORD: &quot;COACH&quot;</span>
          </div>
          <p className="text-slate-300 text-[11px]">Dispatches application form &amp; calendar booking link within 2s.</p>
        </div>
      ),
    },
    {
      number: '04',
      title: 'AI-Powered DM Assistant',
      description: 'Intelligently answer product inquiries, handle objections, and qualify leads with a conversational OpenAI GPT-4o agent trained on your brand.',
      badge: 'Smart AI',
      icon: Bot,
      accentColor: 'from-indigo-600 to-cyan-600',
      preview: (
        <div className="bg-slate-900 rounded-xl p-3 text-xs text-white border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-cyan-300">
            <Bot className="w-4 h-4" />
            <span className="font-semibold">AI Assistant Active</span>
          </div>
          <p className="text-slate-300 text-[11px]">&quot;Yes! Our Pro plan includes client workspaces. Would you like a demo?&quot;</p>
        </div>
      ),
    },
    {
      number: '05',
      title: 'Follow for Link',
      description: 'Skyrocket your follower growth. Require users to follow your Instagram profile before releasing requested links or downloads.',
      badge: 'Growth Multiplier',
      icon: UserPlus,
      accentColor: 'from-amber-500 to-orange-600',
      preview: (
        <div className="bg-slate-900 rounded-xl p-3 text-xs text-white border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-amber-400 font-bold">Follow Check Gate</span>
            <span className="text-slate-400">Verifying...</span>
          </div>
          <div className="p-1.5 rounded bg-amber-950/40 border border-amber-800 text-amber-200 text-[11px]">
            &quot;Please tap Follow @thecreator to unlock this exclusive link!&quot;
          </div>
        </div>
      ),
    },
    {
      number: '06',
      title: 'Lead Generation',
      description: 'Capture email addresses and phone numbers right in the conversation. Auto-verify formatting and sync directly with your CRM or Google Sheets.',
      badge: 'Data Capture',
      icon: MailCheck,
      accentColor: 'from-emerald-500 to-teal-600',
      preview: (
        <div className="bg-slate-900 rounded-xl p-3 text-xs text-white border border-slate-800 space-y-2">
          <div className="text-[11px] text-emerald-400 font-semibold">✓ Valid Email Captured</div>
          <div className="p-1.5 rounded bg-emerald-950/40 border border-emerald-800 text-slate-200 font-mono text-[10px]">
            sarah.j@creativestudio.io ➔ Synced to Klaviyo &amp; Sheets
          </div>
        </div>
      ),
    },
    {
      number: '07',
      title: 'Automated Follow-ups',
      description: 'Re-engage users who clicked a link but haven’t completed signup, perfectly staying within Meta’s official 24-hour messaging guidelines.',
      badge: 'Meta Permitted',
      icon: Clock8,
      accentColor: 'from-blue-600 to-indigo-600',
      preview: (
        <div className="bg-slate-900 rounded-xl p-3 text-xs text-white border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>2h Reminder:</span>
            <span className="text-blue-400">Scheduled</span>
          </div>
          <p className="text-slate-300 text-[11px]">&quot;Hey! Did you have a chance to look over the guide?&quot;</p>
        </div>
      ),
    },
    {
      number: '08',
      title: 'Visual Flow Builder',
      description: 'Design multifaceted conversational trees with an intuitive visual node canvas. Add triggers, condition branches, delays, and custom webhook calls.',
      badge: 'No Code Canvas',
      icon: GitFork,
      accentColor: 'from-purple-600 to-pink-600',
      preview: (
        <div className="bg-slate-900 rounded-xl p-3 text-xs text-white border border-slate-800 flex items-center justify-between">
          <span className="px-2 py-1 bg-purple-900/60 rounded border border-purple-500 text-purple-200 text-[10px]">[Trigger]</span>
          <span className="text-slate-500">➔</span>
          <span className="px-2 py-1 bg-indigo-900/60 rounded border border-indigo-500 text-indigo-200 text-[10px]">[Condition]</span>
          <span className="text-slate-500">➔</span>
          <span className="px-2 py-1 bg-emerald-900/60 rounded border border-emerald-500 text-emerald-200 text-[10px]">[DM Action]</span>
        </div>
      ),
    },
    {
      number: '09',
      title: 'Contact Management',
      description: 'Segment your leads with custom tags (e.g., #HighIntent, #Purchased, #VIP). View full interaction timelines and export directly to CSV.',
      badge: 'Built-in CRM',
      icon: Users,
      accentColor: 'from-cyan-600 to-blue-600',
      preview: (
        <div className="bg-slate-900 rounded-xl p-3 text-xs text-white border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-200">@sarah_creative</span>
            <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px]">#EcomBuyer</span>
          </div>
          <p className="text-slate-400 text-[10px]">3 interactions • 1 purchase recorded</p>
        </div>
      ),
    },
    {
      number: '10',
      title: 'Analytics Dashboard',
      description: 'Monitor real-time message volume, click-through rates, lead conversion rates, and revenue impact across all your Instagram posts.',
      badge: 'Actionable Insights',
      icon: BarChart3,
      accentColor: 'from-fuchsia-600 to-purple-600',
      preview: (
        <div className="bg-slate-900 rounded-xl p-3 text-xs text-white border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-400">CTR: <strong className="text-emerald-400">42.8%</strong></span>
            <span className="text-slate-400">Conv: <strong className="text-purple-400">31.4%</strong></span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full w-[78%]" />
          </div>
        </div>
      ),
    },
    {
      number: '11',
      title: 'Instagram Live Automation',
      description: 'Keep your live stream viewers engaged. Trigger instant DM resource links when viewers post designated keywords in your Live chat.',
      badge: 'Live Broadcast',
      icon: Radio,
      accentColor: 'from-rose-600 to-orange-600',
      preview: (
        <div className="bg-slate-900 rounded-xl p-3 text-xs text-white border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-1.5 text-rose-400 font-semibold text-[11px]">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" /> Live Chat Trigger
          </div>
          <p className="text-slate-300 text-[11px]">Comment &quot;JOIN&quot; during live to receive private access link.</p>
        </div>
      ),
    },
    {
      number: '12',
      title: 'Facebook Messenger Automation',
      description: 'Unified omnichannel automation. Connect your linked Facebook Business Pages to automate comments, ads, and incoming inbox messages.',
      badge: 'Omnichannel',
      icon: Share2,
      accentColor: 'from-blue-600 to-indigo-600',
      preview: (
        <div className="bg-slate-900 rounded-xl p-3 text-xs text-white border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-2 text-blue-400 font-semibold text-[11px]">
            <span>Facebook Page Connected</span>
          </div>
          <p className="text-slate-300 text-[11px]">Simultaneous reply routing for IG + FB Page comments.</p>
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-28 bg-gradient-to-b from-slate-50/80 via-white to-purple-50/30 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 text-purple-700 text-xs font-bold uppercase tracking-wider mb-3 border border-purple-200/60 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Complete Feature Suite</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Everything You Need to Scale Your Instagram DMs.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Eliminate manual message fatigue. InstaDM provides the most advanced, Meta-compliant toolkit for converting social engagement into measurable revenue.
          </p>
        </div>

        {/* 12 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white/90 backdrop-blur-xs rounded-3xl p-7 border border-slate-200/90 hover:border-purple-400/80 shadow-xs hover:shadow-2xl hover:shadow-purple-500/15 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  {/* Top Bar with Number, Icon, Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feature.accentColor} text-white flex items-center justify-center shadow-md shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-purple-700 bg-purple-50 border border-purple-200/70 px-2.5 py-1 rounded-full">
                        {feature.badge}
                      </span>
                      <span className="font-mono text-xs font-black text-slate-300">
                        {feature.number}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-purple-600 transition-colors mb-2.5">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                    {feature.description}
                  </p>
                </div>

                {/* Card Preview Visual Illustration */}
                <div className="pt-2">
                  {feature.preview}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
