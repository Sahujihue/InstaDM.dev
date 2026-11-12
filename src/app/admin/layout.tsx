'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { InstaLogo } from '@/components/common/InstaLogo';
import { useAuth } from '@/context/AuthContext';
import {
  ShieldAlert,
  Users,
  CreditCard,
  MessageSquare,
  HelpCircle,
  Terminal,
  Settings,
  LogOut,
  LayoutDashboard,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Sliders,
  Menu,
  X
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const adminNav = [
    { label: 'Admin Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Payment Gateways', href: '/admin/payments', icon: CreditCard, badge: 'Gateways' },
    { label: 'Pricing & Plans Manager', href: '/admin/pricing', icon: Sliders, badge: 'Live Config' },
    { label: 'User Management', href: '/admin/users', icon: Users, badge: 'Edit/Del' },
    { label: 'Testimonials Manager', href: '/admin/testimonials', icon: MessageSquare },
    { label: 'FAQ Manager', href: '/admin/faqs', icon: HelpCircle },
    { label: 'System Logs & Webhooks', href: '/admin/logs', icon: Terminal, badge: 'Audits' },
    { label: 'Settings & Geo-Currency', href: '/admin/settings', icon: Settings, badge: 'Geo-IP' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row">
      
      {/* Mobile Top Bar */}
      <div className="lg:hidden bg-slate-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <InstaLogo inverted />
          <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-purple-600 text-white font-mono">
            SUPERADMIN
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-xl text-slate-300 hover:bg-slate-800"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Admin Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-950 text-slate-300 border-r border-slate-800 flex flex-col justify-between transform transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Header */}
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <InstaLogo inverted />
            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-purple-600 text-white font-mono">
              ROOT
            </span>
          </div>

          <div className="p-3">
            <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-800/60 text-purple-200 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <span>SaaS Master Control Active</span>
            </div>
          </div>

          {/* Nav */}
          <nav className="p-3 space-y-1">
            {adminNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                      isActive ? 'bg-purple-900 text-purple-200' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/60 space-y-2">
          <Link
            href="/dashboard"
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 border border-slate-700 transition-colors"
          >
            <span>Back to User Dashboard</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => {
              logout();
              router.push('/login');
            }}
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 border border-transparent transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="hidden lg:flex items-center justify-between h-16 px-8 bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-bold text-purple-700">InstaDM Administration</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-slate-800 capitalize">
              {pathname.split('/')[2] || 'Overview'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              ● Database Synced &amp; Connected
            </span>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          {children}
        </main>
      </div>

    </div>
  );
}
