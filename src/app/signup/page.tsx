'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { InstaLogo } from '@/components/common/InstaLogo';
import { useAuth } from '@/context/AuthContext';
import { ArrowRight, Lock, Mail, User, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { GoogleIcon } from '@/components/common/BrandIcons';

export default function SignupPage() {
  const router = useRouter();
  const { signup, loginWithGoogle } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [referralCode, setReferralCode] = useState<string | null>(null);

  React.useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get('ref') || localStorage.getItem('instadm_active_referrer');
      if (ref) {
        setReferralCode(ref);
        localStorage.setItem('instadm_active_referrer', ref);
      }
    } catch {}
  }, []);

  const handleGoogleSignup = async () => {
    setLoading(true);
    await loginWithGoogle('new.creator@instadm.dev', 'New Creator');
    router.push('/dashboard');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    setLoading(true);

    try {
      await signup(name, email, password);

      // Track referral signup (Free Trial - Commission 0 until subscription purchase)
      try {
        const storedRefs = localStorage.getItem('instadm_referral_records');
        const refs = storedRefs ? JSON.parse(storedRefs) : [];
        const maskedEmail = email.includes('@') 
          ? `${email.slice(0, 2)}***@${email.split('@')[1]}` 
          : email;
        const newRef = {
          id: `ref-${Date.now()}`,
          referredUserName: name,
          referredUserEmail: maskedEmail,
          plan: 'free',
          date: new Date().toISOString().split('T')[0],
          commissionAmount: 0,
          status: 'TRIAL'
        };
        localStorage.setItem('instadm_referral_records', JSON.stringify([newRef, ...refs]));
        window.dispatchEvent(new Event('instadm_settings_updated'));
      } catch {}

      setShowVerificationModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleProceedToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/40 via-white to-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-4">
          <InstaLogo />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Create Your InstaDM Account
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-purple-600 hover:text-purple-500">
            Sign In here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl shadow-purple-500/5 rounded-3xl border border-slate-200/90 sm:px-10">
          
          {/* Referral Partner Badge if referred */}
          {referralCode && (
            <div className="mb-5 p-3 rounded-2xl bg-purple-50 border border-purple-200/80 flex items-center gap-2 text-xs text-purple-800 font-bold">
              <span className="text-base">🎁</span>
              <span>Invited by partner <strong className="text-purple-600 underline font-mono">@{referralCode}</strong></span>
            </div>
          )}

          {/* Continue with Google */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 flex items-center justify-center gap-2.5 transition-all shadow-2xs hover:border-slate-300 mb-5 disabled:opacity-50"
          >
            <GoogleIcon className="w-4 h-4 shrink-0" />
            <span>Continue with Google</span>
          </button>

          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2.5 text-slate-400 font-semibold">Or sign up with email</span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Sarah Jenkins"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 pl-10"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sarah@example.com"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 pl-10"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 pl-10"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="flex items-start">
              <input
                id="terms-check"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                required
                className="h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500 mt-0.5"
              />
              <label htmlFor="terms-check" className="ml-2 block text-xs text-slate-600 leading-relaxed">
                I agree to the{' '}
                <Link href="/terms" className="text-purple-600 font-semibold hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-purple-600 font-semibold hover:underline">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <span>{loading ? 'Creating Account...' : 'Get Started Free'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Social Proof Note */}
          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              No credit card required • Instant access
            </p>
          </div>

        </div>
      </div>

      {/* Email Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-purple-200 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              Welcome to InstaDM, {name}!
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed">
              We&apos;ve sent a confirmation email to <strong className="text-purple-600">{email}</strong>. For your convenience, your account has been pre-activated so you can connect your Instagram account immediately.
            </p>

            <button
              onClick={handleProceedToDashboard}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm shadow-md hover:from-purple-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-2"
            >
              <span>Open My Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
