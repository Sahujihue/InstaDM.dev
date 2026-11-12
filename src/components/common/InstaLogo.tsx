'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface InstaLogoProps {
  className?: string;
  iconOnly?: boolean;
  inverted?: boolean;
}

export function InstaLogo({ className = '', iconOnly = false, inverted = false }: InstaLogoProps) {
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [brandName, setBrandName] = useState<string>('InstaDM');
  const [brandSuffix, setBrandSuffix] = useState<string>('.dev');

  useEffect(() => {
    const loadSettings = () => {
      try {
        const stored = localStorage.getItem('instadm_admin_settings');
        if (stored) {
          const parsed = JSON.parse(stored);
          setLogoUrl(parsed.logoUrl || '');
          if (parsed.brandName) setBrandName(parsed.brandName);
          if (parsed.brandSuffix !== undefined) setBrandSuffix(parsed.brandSuffix);
        }
      } catch {
        // ignore
      }
    };

    loadSettings();
    window.addEventListener('instadm_settings_updated', loadSettings);
    window.addEventListener('storage', loadSettings);
    return () => {
      window.removeEventListener('instadm_settings_updated', loadSettings);
      window.removeEventListener('storage', loadSettings);
    };
  }, []);

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {logoUrl ? (
        <div className="relative flex items-center justify-center h-10 w-auto rounded-xl overflow-hidden shadow-xs">
          <img src={logoUrl} alt={brandName} className="h-10 w-auto object-contain" />
        </div>
      ) : (
        /* Default Brand Icon */
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 shadow-md shadow-purple-500/25 group-hover:shadow-lg group-hover:shadow-purple-500/35 transition-all duration-300 transform group-hover:scale-105">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          >
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
          <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-r from-amber-400 to-pink-500 rounded-full border-2 border-white dark:border-slate-900" />
        </div>
      )}

      {!iconOnly && (
        <div className="flex items-center gap-1.5 font-bold tracking-tight">
          <span className={`text-xl ${inverted ? 'text-white' : 'text-slate-900'}`}>
            {brandName.length >= 7 ? (
              <>
                {brandName.slice(0, 5)}
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  {brandName.slice(5)}
                </span>
              </>
            ) : (
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {brandName}
              </span>
            )}
          </span>
          {brandSuffix && (
            <span className="text-[11px] font-semibold px-1.5 py-0.5 rounded-md bg-purple-100 text-purple-700 tracking-wider font-mono">
              {brandSuffix}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
