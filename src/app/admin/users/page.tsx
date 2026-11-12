'use client';

import React, { useState } from 'react';
import { User } from '@/types';
import { 
  Users, 
  Search, 
  ShieldCheck, 
  MoreHorizontal, 
  CheckCircle2, 
  Trash2, 
  Edit 
} from 'lucide-react';
import confetti from 'canvas-confetti';

const SAMPLE_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'Alex Rivera',
    email: 'alex@creatorstudio.co',
    role: 'user',
    plan: 'pro',
    billingCycle: 'monthly',
    currency: 'USD',
    createdAt: '2026-08-20',
    connectedAccountsCount: 2,
    monthlyDmsUsed: 14250,
    monthlyDmsLimit: 25000
  },
  {
    id: 'usr-2',
    name: 'Elena Rostova',
    email: 'elena@designlab.io',
    role: 'user',
    plan: 'agency',
    billingCycle: 'yearly',
    currency: 'USD',
    createdAt: '2026-09-02',
    connectedAccountsCount: 6,
    monthlyDmsUsed: 38920,
    monthlyDmsLimit: 100000
  },
  {
    id: 'usr-3',
    name: 'Marcus Vance',
    email: 'marcus@vancestreetwear.com',
    role: 'user',
    plan: 'starter',
    billingCycle: 'monthly',
    currency: 'USD',
    createdAt: '2026-10-14',
    connectedAccountsCount: 1,
    monthlyDmsUsed: 4210,
    monthlyDmsLimit: 5000
  },
  {
    id: 'usr-4',
    name: 'Priya Sharma',
    email: 'priya@fitlifewellness.in',
    role: 'user',
    plan: 'pro',
    billingCycle: 'yearly',
    currency: 'INR',
    createdAt: '2026-10-22',
    connectedAccountsCount: 2,
    monthlyDmsUsed: 18450,
    monthlyDmsLimit: 25000
  }
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(SAMPLE_USERS);
  const [search, setSearch] = useState('');

  const filtered = users.filter((u) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  });

  const handleChangePlan = (userId: string, newPlan: User['plan']) => {
    setUsers(users.map((u) => {
      if (u.id === userId) {
        return { ...u, plan: newPlan };
      }
      return u;
    }));
    try {
      confetti({ particleCount: 30, spread: 50 });
    } catch {}
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            User &amp; Subscription Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Search registered creator accounts, upgrade or downgrade subscriptions, and inspect usage limits.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by user name or email..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        <span className="text-xs text-slate-400">{filtered.length} total users shown</span>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-4 px-6">User Profile</th>
                <th className="py-4 px-6">Current Plan</th>
                <th className="py-4 px-6">Cycle &amp; Currency</th>
                <th className="py-4 px-6">Accounts</th>
                <th className="py-4 px-6">Monthly DMs Used</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                        {u.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">{u.name}</span>
                        <span className="text-[11px] text-slate-500">{u.email}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <select
                      value={u.plan}
                      onChange={(e) => handleChangePlan(u.id, e.target.value as User['plan'])}
                      className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-bold text-purple-700 bg-purple-50/50 uppercase"
                    >
                      <option value="free">FREE</option>
                      <option value="starter">STARTER</option>
                      <option value="pro">PRO</option>
                      <option value="agency">AGENCY</option>
                    </select>
                  </td>

                  <td className="py-4 px-6">
                    <span className="font-semibold text-slate-800 capitalize block">{u.billingCycle}</span>
                    <span className="text-[10px] text-slate-400">{u.currency}</span>
                  </td>

                  <td className="py-4 px-6 font-bold text-slate-800">
                    {u.connectedAccountsCount} Connected
                  </td>

                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="text-[11px] font-bold text-slate-800">
                        {u.monthlyDmsUsed.toLocaleString()} / {u.monthlyDmsLimit.toLocaleString()}
                      </div>
                      <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-purple-600 h-full"
                          style={{ width: `${Math.min((u.monthlyDmsUsed / u.monthlyDmsLimit) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6 text-right">
                    <span className="text-emerald-600 font-bold text-[11px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Active
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
