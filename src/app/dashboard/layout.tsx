'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { InstaLogo } from '@/components/common/InstaLogo';
import { useAuth } from '@/context/AuthContext';
import { InstagramIcon } from '@/components/common/BrandIcons';
import {
  LayoutDashboard,
  Zap,
  GitFork,
  Users,
  MessageSquare,
  BarChart3,
  Sliders,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Bell,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Bot
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Instagram Accounts', href: '/dashboard/accounts', icon: InstagramIcon },
    { label: 'Automations', href: '/dashboard/automations', icon: Zap },
    { label: 'Visual Flow Builder', href: '/dashboard/flow-builder', icon: GitFork, badge: 'Canvas' },
    { label: 'Contacts & Leads', href: '/dashboard/contacts', icon: Users },
    { label: 'DM Live Inbox', href: '/dashboard/inbox', icon: MessageSquare },
    { label: 'AI Assistant', href: '/dashboard/ai-assistant', icon: Bot, badge: 'GPT-4o' },
    { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { label: 'Integrations', href: '/dashboard/integrations', icon: Sliders },
    { label: 'Billing & Plans', href: '/dashboard/billing', icon: CreditCard },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      
      {/* Mobile Top Bar */}
      <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <InstaLogo />
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-xl text-slate-700 hover:bg-slate-100"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transform transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Logo header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <InstaLogo />
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 uppercase tracking-wider">
              {user?.plan || 'PRO'}
            </span>
          </div>

          {/* Connected Instagram quick pill */}
          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center font-bold text-[10px]">
                IG
              </div>
              <div className="truncate flex-1">
                <span className="font-bold text-slate-800 text-[11px] block truncate">@themoderncreator</span>
                <span className="text-[10px] text-emerald-600 flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Connected
                </span>
              </div>
            </div>
          </div>

          {/* Nav links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-280px)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                        isActive ? 'bg-purple-800 text-purple-200' : 'bg-purple-100 text-purple-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: User profile & Logout */}
        <div className="p-4 border-t border-slate-200/90 bg-slate-50/60">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5 truncate">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                {user?.name?.slice(0, 2).toUpperCase() || 'AL'}
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-slate-900 truncate">{user?.name || 'Alex Rivera'}</p>
                <p className="text-[10px] text-slate-500 truncate">{user?.email || 'demo@instadm.dev'}</p>
              </div>
            </div>

            {user?.role === 'admin' && (
              <Link
                href="/admin"
                className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900 text-white hover:bg-slate-800"
                title="Go to Admin Panel"
              >
                ADMIN
              </Link>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Header inside Dashboard */}
        <header className="hidden lg:flex items-center justify-between h-16 px-8 bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-purple-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-slate-800 capitalize">
              {pathname.split('/')[2] || 'Overview'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Meta API status badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Meta Graph API v21.0 Connected</span>
            </div>

            {/* Quick Upgrade */}
            <Link
              href="/dashboard/billing"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-xs hover:from-purple-500 hover:to-indigo-500"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Upgrade Plan</span>
            </Link>

            {/* Notifications */}
            <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 relative">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-purple-600 absolute top-1.5 right-1.5" />
            </button>
          </div>
        </header>

        {/* Child Pages Container */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          {children}
        </main>

      </div>

    </div>
  );
}
