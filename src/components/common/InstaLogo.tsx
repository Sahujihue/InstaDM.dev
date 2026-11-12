import React from 'react';
import Link from 'next/link';

interface InstaLogoProps {
  className?: string;
  iconOnly?: boolean;
  inverted?: boolean;
}

export function InstaLogo({ className = '', iconOnly = false, inverted = false }: InstaLogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Brand Icon */}
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
          {/* Stylized Paper airplane meets Instagram Camera viewfinder */}
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" />
        </svg>
        <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-r from-amber-400 to-pink-500 rounded-full border-2 border-white dark:border-slate-900" />
      </div>

      {!iconOnly && (
        <div className="flex items-center gap-1.5 font-bold tracking-tight">
          <span className={`text-xl ${inverted ? 'text-white' : 'text-slate-900'}`}>
            Insta<span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">DM</span>
          </span>
          <span className="text-[11px] font-semibold px-1.5 py-0.5 rounded-md bg-purple-100 text-purple-700 tracking-wider font-mono">
            .dev
          </span>
        </div>
      )}
    </Link>
  );
}
