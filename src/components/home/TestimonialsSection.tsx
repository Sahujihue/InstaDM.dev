import React from 'react';
import { INITIAL_TESTIMONIALS } from '@/lib/data';
import { Star, CheckCircle2, Quote } from 'lucide-react';
import Image from 'next/image';

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Customer Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Loved by Creators and Fast-Growing Brands.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            See how creators, store owners, and agencies scale their Instagram conversations and capture thousands of qualified leads.
          </p>
          <div className="mt-2 text-xs font-semibold text-slate-400">
            [Sample Beta Case Studies &amp; Performance Reviews]
          </div>
        </div>

        {/* Testimonials 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INITIAL_TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-purple-100 group-hover:text-purple-200 transition-colors pointer-events-none" />

              <div>
                {/* Rating Stars & Metric Pill */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="text-xs font-extrabold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                    {t.metricsResult}
                  </span>
                </div>

                {/* Review Quote */}
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6 font-medium">
                  &quot;{t.review}&quot;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-purple-200 shadow-xs flex-shrink-0">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      {t.name}
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {t.role} • <span className="text-purple-600">{t.businessType}</span>
                    </p>
                  </div>
                </div>

                <span className="text-xs font-mono font-semibold text-slate-400">
                  {t.handle}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
