'use client';

import { Suspense, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

function ReferralRedirectContent() {
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const code = params?.code as string;
    if (code) {
      try {
        localStorage.setItem('instadm_active_referrer', code);
      } catch {}
      router.replace(`/signup?ref=${encodeURIComponent(code)}`);
    } else {
      router.replace('/signup');
    }
  }, [params, router]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="text-center space-y-3">
        <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs font-bold text-slate-600">Connecting via referral link...</p>
      </div>
    </div>
  );
}

export default function ReferralRedirectPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      }
    >
      <ReferralRedirectContent />
    </Suspense>
  );
}
