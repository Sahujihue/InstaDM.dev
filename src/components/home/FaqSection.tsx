'use client';

import React, { useState } from 'react';
import { INITIAL_FAQS } from '@/lib/data';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Everything you need to know about setting up, Meta compliance, and growing your business with InstaDM.
          </p>
        </div>

        {/* 9 FAQs Accordion */}
        <div className="space-y-4">
          {INITIAL_FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-purple-300 bg-purple-50/30 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                      isOpen ? 'bg-purple-600 text-white rotate-180' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-purple-100/60 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-slate-900">Have a custom question about your account setup?</h4>
            <p className="text-xs text-slate-500">Our customer success team responds in under 15 minutes.</p>
          </div>
          <a
            href="mailto:support@instadm.dev"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-sm transition-all flex-shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat With Support</span>
          </a>
        </div>

      </div>
    </section>
  );
}
