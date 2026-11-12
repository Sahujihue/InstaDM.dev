'use client';

import React, { useState, useEffect } from 'react';
import { User } from '@/types';
import { 
  Users, 
  Search, 
  ShieldCheck, 
  MoreHorizontal, 
  CheckCircle2, 
  Trash2, 
  Edit3, 
  UserPlus, 
  AlertTriangle, 
  X, 
  Mail, 
  CreditCard, 
  ShieldAlert,
  Save,
  Filter
} from 'lucide-react';
import { InstagramIcon } from '@/components/common/BrandIcons';
import confetti from 'canvas-confetti';

const INITIAL_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'Alex Rivera',
    email: 'alex@creatorstudio.co',
    role: 'user',
    plan: 'pro',
    billingCycle: 'monthly',
    currency: 'USD',
    status: 'ACTIVE',
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
    status: 'ACTIVE',
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
    status: 'ACTIVE',
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
    status: 'ACTIVE',
    createdAt: '2026-10-22',
    connectedAccountsCount: 2,
    monthlyDmsUsed: 18450,
    monthlyDmsLimit: 25000
  },
  {
    id: 'usr-5',
    name: 'Vikram Mehta',
    email: 'vikram@growthaccelerate.in',
    role: 'user',
    plan: 'agency',
    billingCycle: 'monthly',
    currency: 'INR',
    status: 'ACTIVE',
    createdAt: '2026-11-01',
    connectedAccountsCount: 5,
    monthlyDmsUsed: 62400,
    monthlyDmsLimit: 100000
  },
  {
    id: 'usr-6',
    name: 'Sarah Jenkins',
    email: 'sarah@boutiquestyle.com',
    role: 'user',
    plan: 'starter',
    billingCycle: 'monthly',
    currency: 'USD',
    status: 'SUSPENDED',
    createdAt: '2026-09-18',
    connectedAccountsCount: 1,
    monthlyDmsUsed: 5000,
    monthlyDmsLimit: 5000
  }
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'SUSPENDED' | 'BANNED'>('ALL');
  const [planFilter, setPlanFilter] = useState<string>('ALL');

  // Modal states
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New user form state
  const [newUser, setNewUser] = useState<Partial<User>>({
    name: '',
    email: '',
    role: 'user',
    plan: 'pro',
    billingCycle: 'monthly',
    currency: 'INR',
    status: 'ACTIVE',
    connectedAccountsCount: 1,
    monthlyDmsLimit: 25000
  });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('instadm_admin_users');
      if (saved) {
        setUsers(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage on change
  const saveUsersList = (updated: User[]) => {
    setUsers(updated);
    try {
      localStorage.setItem('instadm_admin_users', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter users
  const filteredUsers = users.filter((u) => {
    if (search) {
      const q = search.toLowerCase();
      const match = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.id.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (statusFilter !== 'ALL' && (u.status || 'ACTIVE') !== statusFilter) {
      return false;
    }
    if (planFilter !== 'ALL' && u.plan !== planFilter) {
      return false;
    }
    return true;
  });

  // Handle Edit User Save
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    const updated = users.map((u) => (u.id === editingUser.id ? editingUser : u));
    saveUsersList(updated);
    setEditingUser(null);
    showToast(`User "${editingUser.name}" successfully updated!`);
    try {
      confetti({ particleCount: 25, spread: 45 });
    } catch {}
  };

  // Handle Delete User
  const handleConfirmDelete = () => {
    if (!userToDelete) return;
    const updated = users.filter((u) => u.id !== userToDelete.id);
    saveUsersList(updated);
    showToast(`User "${userToDelete.name}" deleted permanently.`);
    setUserToDelete(null);
  };

  // Handle Create User
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;

    const created: User = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role || 'user',
      plan: newUser.plan || 'pro',
      billingCycle: newUser.billingCycle || 'monthly',
      currency: newUser.currency || 'INR',
      status: newUser.status || 'ACTIVE',
      createdAt: new Date().toISOString().split('T')[0],
      connectedAccountsCount: Number(newUser.connectedAccountsCount) || 1,
      monthlyDmsUsed: 0,
      monthlyDmsLimit: Number(newUser.monthlyDmsLimit) || 25000
    };

    const updated = [created, ...users];
    saveUsersList(updated);
    setIsCreateOpen(false);
    setNewUser({
      name: '',
      email: '',
      role: 'user',
      plan: 'pro',
      billingCycle: 'monthly',
      currency: 'INR',
      status: 'ACTIVE',
      connectedAccountsCount: 1,
      monthlyDmsLimit: 25000
    });
    showToast(`User "${created.name}" created successfully!`);
    try {
      confetti({ particleCount: 40, spread: 60 });
    } catch {}
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'SUSPENDED':
        return (
          <span className="inline-flex items-center gap-1 text-amber-700 font-bold text-[10px] bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Suspended
          </span>
        );
      case 'BANNED':
        return (
          <span className="inline-flex items-center gap-1 text-rose-700 font-bold text-[10px] bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            Banned
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[10px] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Active
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold mb-2">
            <Users className="w-3.5 h-3.5" />
            SuperAdmin User Management
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Users &amp; Subscriptions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage creator profiles, edit subscription plans, control access, or remove accounts.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 transition-all hover:-translate-y-0.5"
        >
          <UserPlus className="w-4 h-4" />
          Add New User
        </button>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Total Users</span>
          <div className="text-2xl font-black text-slate-900">{users.length}</div>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 inline-block">Registered creators</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Active Accounts</span>
          <div className="text-2xl font-black text-emerald-600">
            {users.filter(u => (u.status || 'ACTIVE') === 'ACTIVE').length}
          </div>
          <span className="text-[10px] text-slate-500 mt-1 inline-block">Healthy automations</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Pro &amp; Agency</span>
          <div className="text-2xl font-black text-purple-600">
            {users.filter(u => u.plan === 'pro' || u.plan === 'agency').length}
          </div>
          <span className="text-[10px] text-purple-600 font-semibold mt-1 inline-block">High tier subscribers</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Suspended / Banned</span>
          <div className="text-2xl font-black text-rose-600">
            {users.filter(u => u.status === 'SUSPENDED' || u.status === 'BANNED').length}
          </div>
          <span className="text-[10px] text-slate-400 mt-1 inline-block">Restricted accounts</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:max-w-sm">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or user ID..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold uppercase text-slate-400">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active Only</option>
              <option value="SUSPENDED">Suspended</option>
              <option value="BANNED">Banned</option>
            </select>
          </div>

          {/* Plan Filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold uppercase text-slate-400">Plan:</span>
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Plans</option>
              <option value="free">Free</option>
              <option value="starter">Starter</option>
              <option value="pro">Pro</option>
              <option value="agency">Agency</option>
            </select>
          </div>

          <span className="text-xs text-slate-400 ml-auto md:ml-0 font-medium">
            {filteredUsers.length} of {users.length} users
          </span>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-4 px-6">User Profile</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Plan &amp; Cycle</th>
                <th className="py-4 px-6">Currency</th>
                <th className="py-4 px-6">Connected IG</th>
                <th className="py-4 px-6">Monthly DMs Usage</th>
                <th className="py-4 px-6 text-right">Actions (Edit / Delete)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 text-xs font-medium">
                    No users found matching your search or filters.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                          {u.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">{u.name}</span>
                            {u.role === 'admin' && (
                              <span className="bg-purple-100 text-purple-700 text-[9px] font-black px-1.5 py-0.2 rounded uppercase">
                                Admin
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-500 font-mono block">{u.email}</span>
                          <span className="text-[10px] text-slate-400">ID: {u.id}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      {getStatusBadge(u.status)}
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                          u.plan === 'agency' 
                            ? 'bg-purple-100 text-purple-700' 
                            : u.plan === 'pro' 
                            ? 'bg-indigo-100 text-indigo-700' 
                            : u.plan === 'starter' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {u.plan}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-600 capitalize">
                          ({u.billingCycle})
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Joined {u.createdAt}</span>
                    </td>

                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 font-bold text-slate-800 text-xs">
                        {u.currency === 'INR' ? '🇮🇳 INR' : '🌐 USD'}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs">
                        <InstagramIcon className="w-3.5 h-3.5 text-pink-600" />
                        <span>{u.connectedAccountsCount} Account{u.connectedAccountsCount > 1 ? 's' : ''}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="space-y-1 w-32">
                        <div className="flex justify-between text-[10px] font-bold text-slate-700">
                          <span>{u.monthlyDmsUsed.toLocaleString()}</span>
                          <span className="text-slate-400">/ {u.monthlyDmsLimit.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              (u.monthlyDmsUsed / u.monthlyDmsLimit) > 0.9 
                                ? 'bg-rose-500' 
                                : (u.monthlyDmsUsed / u.monthlyDmsLimit) > 0.7 
                                ? 'bg-amber-500' 
                                : 'bg-purple-600'
                            }`}
                            style={{ width: `${Math.min((u.monthlyDmsUsed / u.monthlyDmsLimit) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setEditingUser({ ...u })}
                          title="Edit User"
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-purple-600 hover:border-purple-300 hover:bg-purple-50 transition-all"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setUserToDelete(u)}
                          title="Delete User"
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-300 hover:bg-rose-50 transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT USER MODAL */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Edit User Profile</h3>
                  <p className="text-xs text-slate-400 font-mono">{editingUser.email}</p>
                </div>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Plan Tier</label>
                  <select
                    value={editingUser.plan}
                    onChange={(e) => setEditingUser({ ...editingUser, plan: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none uppercase font-bold text-purple-700"
                  >
                    <option value="free">FREE</option>
                    <option value="starter">STARTER</option>
                    <option value="pro">PRO</option>
                    <option value="agency">AGENCY</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Billing Cycle</label>
                  <select
                    value={editingUser.billingCycle}
                    onChange={(e) => setEditingUser({ ...editingUser, billingCycle: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none font-semibold text-slate-800"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Currency</label>
                  <select
                    value={editingUser.currency}
                    onChange={(e) => setEditingUser({ ...editingUser, currency: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none font-semibold text-slate-800"
                  >
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Account Status</label>
                  <select
                    value={editingUser.status || 'ACTIVE'}
                    onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none font-bold"
                  >
                    <option value="ACTIVE">ACTIVE (Normal)</option>
                    <option value="SUSPENDED">SUSPENDED (Frozen)</option>
                    <option value="BANNED">BANNED (Blocked)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Connected IGs</label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={editingUser.connectedAccountsCount}
                    onChange={(e) => setEditingUser({ ...editingUser, connectedAccountsCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Monthly DM Limit</label>
                  <input
                    type="number"
                    min="500"
                    step="1000"
                    value={editingUser.monthlyDmsLimit}
                    onChange={(e) => setEditingUser({ ...editingUser, monthlyDmsLimit: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE USER MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Create New Creator Account</h3>
                  <p className="text-xs text-slate-400">Manually onboard a creator or agency workspace</p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="rahul@domain.com"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Plan Tier</label>
                  <select
                    value={newUser.plan}
                    onChange={(e) => setNewUser({ ...newUser, plan: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none uppercase font-bold text-purple-700"
                  >
                    <option value="free">FREE</option>
                    <option value="starter">STARTER</option>
                    <option value="pro">PRO</option>
                    <option value="agency">AGENCY</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Billing Cycle</label>
                  <select
                    value={newUser.billingCycle}
                    onChange={(e) => setNewUser({ ...newUser, billingCycle: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none font-semibold text-slate-800"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Currency</label>
                  <select
                    value={newUser.currency}
                    onChange={(e) => setNewUser({ ...newUser, currency: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none font-semibold text-slate-800"
                  >
                    <option value="INR">INR (₹ India)</option>
                    <option value="USD">USD ($ Global)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 transition-colors"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden p-6 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-lg">Delete User Account?</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Are you sure you want to permanently delete <strong className="text-slate-800">{userToDelete.name}</strong> ({userToDelete.email})?
              </p>
              <div className="mt-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-[11px] text-rose-700 space-y-1">
                <p className="font-bold">This destructive action cannot be undone:</p>
                <ul className="list-disc pl-4 space-y-0.5">
                  <li>Disconnects {userToDelete.connectedAccountsCount} Instagram account(s)</li>
                  <li>Terminates all active comment &amp; story automations</li>
                  <li>Removes all captured leads from the CRM database</li>
                </ul>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setUserToDelete(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
              >
                Keep Account
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-500/20 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Yes, Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
