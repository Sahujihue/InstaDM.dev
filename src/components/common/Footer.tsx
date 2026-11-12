import React from 'react';
import Link from 'next/link';
import { InstaLogo } from './InstaLogo';
import { 
  InstagramIcon, 
  TwitterIcon, 
  LinkedInIcon, 
  YouTubeIcon 
} from './BrandIcons';
import { 
  ShieldCheck, 
  Lock 
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <InstaLogo inverted />
            
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              InstaDM is the leading Instagram DM automation and lead capture platform for creators, influencers, coaches, and growing businesses worldwide.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-purple-950 hover:text-white flex items-center justify-center text-slate-400 transition-colors border border-slate-800"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-purple-950 hover:text-white flex items-center justify-center text-slate-400 transition-colors border border-slate-800"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-purple-950 hover:text-white flex items-center justify-center text-slate-400 transition-colors border border-slate-800"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-purple-950 hover:text-white flex items-center justify-center text-slate-400 transition-colors border border-slate-800"
                aria-label="YouTube"
              >
                <YouTubeIcon className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>All Systems Operational • Meta API v21.0</span>
            </div>
          </div>

          {/* Col 2: Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/#features" className="hover:text-purple-400 transition-colors">
                  Features Overview
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-purple-400 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/dashboard/flow-builder" className="hover:text-purple-400 transition-colors">
                  Visual Flow Builder
                </Link>
              </li>
              <li>
                <Link href="/#integrations" className="hover:text-purple-400 transition-colors">
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-purple-400 transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-purple-400 transition-colors">
                  User Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Company &amp; Help</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/about" className="hover:text-purple-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-purple-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-purple-400 transition-colors">
                  Help Center &amp; FAQ
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-purple-400 transition-colors">
                  Sign Up Free
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-purple-400 transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Legal &amp; Trust</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/privacy" className="hover:text-purple-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-purple-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-purple-400 transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-purple-400 transition-colors">
                  Disclaimer &amp; API Terms
                </Link>
              </li>
              <li>
                <span className="text-slate-500 text-xs block pt-1">
                  Meta Graph API Compliant. Not affiliated with or endorsed by Meta Platforms, Inc.
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Security Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 InstaDM (instadm.dev). All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Meta Official Messaging Compliant
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <Lock className="w-3.5 h-3.5 text-purple-400" /> End-to-End SSL Encrypted
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
