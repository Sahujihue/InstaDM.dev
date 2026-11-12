'use client';

import React, { useState } from 'react';
import { INITIAL_LEADS } from '@/lib/data';
import { ContactLead } from '@/types';
import { 
  Users, 
  Search, 
  Download, 
  Filter, 
  Tag, 
  Plus, 
  Mail, 
  Phone, 
  CheckCircle2, 
  ExternalLink,
  Trash2,
  Calendar
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactsPage() {
  const [leads, setLeads] = useState<ContactLead[]>(INITIAL_LEADS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('ALL');

  // Filter leads
  const filtered = leads.filter((lead) => {
    if (selectedTag !== 'ALL' && !lead.tags.includes(selectedTag)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchHandle = lead.instagramUsername.toLowerCase().includes(q);
      const matchName = lead.name?.toLowerCase().includes(q) || false;
      const matchEmail = lead.email?.toLowerCase().includes(q) || false;
      if (!matchHandle && !matchName && !matchEmail) return false;
    }
    return true;
  });

  // Export to CSV function
  const handleExportCsv = () => {
    const headers = ['Instagram Handle', 'Full Name', 'Email', 'Phone', 'Source Automation', 'Captured At', 'Tags', 'Status'];
    const rows = filtered.map((l) => [
      l.instagramUsername,
      l.name || '',
      l.email || '',
      l.phone || '',
      l.sourceAutomationName,
      l.capturedAt,
      l.tags.join('; '),
      l.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' 
      + [headers.join(','), ...rows.map(e => e.map(cell => `"${cell}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `instadm_leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    try {
      confetti({ particleCount: 35, spread: 50 });
    } catch {}
  };

  const allTags = Array.from(new Set(leads.flatMap(l => l.tags)));

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Contacts &amp; Leads CRM
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Verified email addresses and phone numbers collected through automated Instagram DM conversations.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export {filtered.length} Leads (CSV)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by handle, name, or email..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <span className="text-xs text-slate-400 mr-1 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" /> Tags:
          </span>
          <button
            onClick={() => setSelectedTag('ALL')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
              selectedTag === 'ALL'
                ? 'bg-purple-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All
          </button>
          {allTags.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                selectedTag === t
                  ? 'bg-purple-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              #{t}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-4 px-6">User / Contact</th>
                <th className="py-4 px-6">Email &amp; Phone</th>
                <th className="py-4 px-6">Source Automation</th>
                <th className="py-4 px-6">Tags</th>
                <th className="py-4 px-6">Captured Date</th>
                <th className="py-4 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* User */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                        {lead.instagramUsername.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block text-xs">
                          @{lead.instagramUsername}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {lead.name || 'Anonymous User'}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Email & Phone */}
                  <td className="py-4 px-6 space-y-1">
                    {lead.email ? (
                      <div className="flex items-center gap-1.5 text-slate-700 font-mono">
                        <Mail className="w-3.5 h-3.5 text-purple-600" />
                        <span>{lead.email}</span>
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">No email</span>
                    )}

                    {lead.phone && (
                      <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
                        <Phone className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{lead.phone}</span>
                      </div>
                    )}
                  </td>

                  {/* Source Automation */}
                  <td className="py-4 px-6">
                    <span className="font-semibold text-slate-800 block">
                      {lead.sourceAutomationName}
                    </span>
                    <span className="text-[10px] text-slate-400">Meta Webhook Verified</span>
                  </td>

                  {/* Tags */}
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1">
                      {lead.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[10px] font-bold border border-purple-100"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Date */}
                  <td className="py-4 px-6 text-slate-500 font-mono text-[11px]">
                    {lead.capturedAt}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-6 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{lead.status.replace(/_/g, ' ')}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
