'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { InstaLogo } from '@/components/common/InstaLogo';
import { useAuth } from '@/context/AuthContext';
import { ArrowRight, Lock, Mail, ShieldCheck, CheckCircle2, User, KeyRound } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginAsDemoUser, loginAsDemoAdmin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      if (email.toLowerCase().includes('admin')) {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } catch {
      setError('Invalid credentials. You can use the 1-click Demo buttons below.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoUser = () => {
    loginAsDemoUser();
    router.push('/dashboard');
  };

  const handleDemoAdmin = () => {
    loginAsDemoAdmin();
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/40 via-white to-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-4">
          <InstaLogo />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Sign In to Your Account
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Or{' '}
          <Link href="/signup" className="font-bold text-purple-600 hover:text-purple-500">
            create a new InstaDM account free
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl shadow-purple-500/5 rounded-3xl border border-slate-200/90 sm:px-10">
          
          {/* Quick Demo Access Bar */}
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200/80">
            <p className="text-xs font-bold text-purple-900 mb-2 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-purple-600" /> 1-Click Instant Demo Access:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleDemoUser}
                className="px-3 py-2 rounded-xl text-xs font-bold bg-white text-purple-700 hover:bg-purple-100/70 border border-purple-200 shadow-2xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <User className="w-3.5 h-3.5" /> Demo User
              </button>
              <button
                type="button"
                onClick={handleDemoAdmin}
                className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 border border-slate-700 shadow-2xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-purple-300" /> Admin Portal
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 pl-10"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-purple-600 hover:text-purple-500"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 pl-10"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-xs text-slate-600">
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <span>{loading ? 'Signing in...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Compliance & Meta Security Badge */}
          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Meta Official Graph API compliant &amp; SSL encrypted
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
