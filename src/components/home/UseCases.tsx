import React from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  GraduationCap, 
  Briefcase, 
  Video, 
  Laptop, 
  Megaphone,
  Check
} from 'lucide-react';

export function UseCases() {
  const cases = [
    {
      title: 'Content Creators',
      tag: 'Audience Monetization',
      icon: Video,
      color: 'from-purple-600 to-indigo-600',
      description: 'Deliver downloadable cheat sheets, presets, affiliate links, and exclusive YouTube unlisted videos directly through comments.',
      perks: ['Automate comment-to-link triggers', 'Build an email list without link-in-bio', 'Boost algorithmic reel engagement']
    },
    {
      title: 'Influencers',
      tag: 'Brand Partnerships',
      icon: Sparkles,
      color: 'from-pink-500 to-rose-600',
      description: 'Give sponsor campaigns measurable ROI. Send discount codes and product links whenever followers comment on your sponsored posts.',
      perks: ['Track exact DM link click-throughs', 'Auto-reward story replies & mentions', 'Deliver custom discount coupons']
    },
    {
      title: 'E-commerce Stores',
      tag: 'Shopify & Direct Sales',
      icon: ShoppingBag,
      color: 'from-emerald-500 to-teal-600',
      description: 'Convert Instagram browsers into buyers. Send discount codes, abandoned cart re-engagement, and flash sale product links.',
      perks: ['Send checkout discount vouchers', 'Capture phone numbers for SMS drops', 'Recover hesitant shoppers in 24h']
    },
    {
      title: 'Digital Product Sellers',
      tag: 'Instant Delivery',
      icon: Laptop,
      color: 'from-blue-600 to-cyan-600',
      description: 'Deliver Notion templates, design assets, eBooks, and software license keys straight into your customer’s Instagram inbox.',
      perks: ['Instant PDF / file delivery', 'Gated follow-for-download requirement', 'Sync leads to email newsletter']
    },
    {
      title: 'Coaches & Consultants',
      tag: 'High-Ticket Booking',
      icon: GraduationCap,
      color: 'from-indigo-600 to-purple-700',
      description: 'Qualify client applicants automatically. Ask discovery questions, filter serious prospects, and share your private Calendly booking link.',
      perks: ['Interactive conversational intake', 'AI answers to program pricing', 'Book discovery calls automatically']
    },
    {
      title: 'Marketing Agencies',
      tag: 'Client Retainers',
      icon: Megaphone,
      color: 'from-violet-600 to-purple-800',
      description: 'Manage multiple client accounts from a unified agency workspace. Deliver comprehensive monthly lead reports and white-labeled funnels.',
      perks: ['Separate client permissions', 'Consolidated billing & volume discounts', 'Export client conversion metrics']
    },
    {
      title: 'Online Businesses',
      tag: 'Lead Gen & Support',
      icon: Briefcase,
      color: 'from-amber-500 to-orange-600',
      description: 'Provide 24/7 customer support, answer common questions, collect support inquiries, and route VIP clients to live human staff.',
      perks: ['AI customer service responses', 'Lead capture directly to CRM', 'Cut manual response time to under 2s']
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Tailored Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Built for High Performers Across Every Industry.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Whether you are a solo creator growing an audience or an enterprise agency scaling dozens of client accounts, InstaDM is customized for your workflow.
          </p>
        </div>

        {/* 7 Use Case Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cases.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className="bg-slate-50/70 hover:bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-purple-300 shadow-xs hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${c.color} text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                      {c.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors mb-2">
                    {c.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {c.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/70 space-y-1.5 text-xs text-slate-700 font-medium">
                  {c.perks.map((p, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className="truncate">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
