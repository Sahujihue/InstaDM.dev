'use client';

import React, { useState } from 'react';
import { INITIAL_ACCOUNTS, INITIAL_INSTAGRAM_POSTS } from '@/lib/data';
import { InstagramAccount, InstagramPost } from '@/types';
import { InstagramIcon, FacebookIcon } from '@/components/common/BrandIcons';
import { 
  CheckCircle2, 
  Plus, 
  RefreshCw, 
  ShieldCheck, 
  AlertCircle, 
  ExternalLink,
  Lock,
  X,
  Trash2,
  Heart,
  MessageCircle,
  HelpCircle,
  Sparkles,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<InstagramAccount[]>(INITIAL_ACCOUNTS);
  const [syncedPosts, setSyncedPosts] = useState<InstagramPost[]>(INITIAL_INSTAGRAM_POSTS);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [connectionMethod, setConnectionMethod] = useState<'FACEBOOK' | 'INSTAGRAM'>('FACEBOOK');
  const [isConnecting, setIsConnecting] = useState(false);
  const [newHandle, setNewHandle] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSimulateOAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHandle) return;

    setIsConnecting(true);

    setTimeout(() => {
      const cleanHandle = newHandle.replace('@', '').toLowerCase();
      const newAcc: InstagramAccount = {
        id: `ig-acc-${Date.now()}`,
        username: cleanHandle,
        name: cleanHandle.charAt(0).toUpperCase() + cleanHandle.slice(1),
        profilePicture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        followersCount: Math.floor(Math.random() * 40000) + 1200,
        accountType: 'CREATOR',
        connectedAt: 'Just now',
        status: 'ACTIVE',
        metaPageId: `page_${Math.floor(Math.random() * 900000000)}`,
        webhookActive: true
      };

      setAccounts([...accounts, newAcc]);
      setIsConnecting(false);
      setShowConnectModal(false);
      setNewHandle('');
      showToast(`@${cleanHandle} connected via Meta OAuth!`);

      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    }, 1200);
  };

  const handleDisconnectAccount = (id: string, name: string) => {
    if (confirm(`Are you sure you want to disconnect @${name}? Active automations on this account will be paused.`)) {
      setAccounts(accounts.filter(a => a.id !== id));
      showToast(`@${name} disconnected successfully.`);
    }
  };

  const handleDeleteSyncedPost = (postId: string) => {
    setSyncedPosts(syncedPosts.filter(p => p.id !== postId));
    showToast('Post removed from active automation library.');
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

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Connected Instagram Accounts
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your eligible Meta Creator &amp; Business accounts connected via the official Instagram Graph API.
          </p>
        </div>

        <button
          onClick={() => setShowConnectModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-500/25 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Connect New Account</span>
        </button>
      </div>

      {/* Meta OAuth Official Policy Notice Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 border border-indigo-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="text-xs text-indigo-950 space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-indigo-950">Official Meta Graph API OAuth Authentication</span>
              <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                100% Ban Safe
              </span>
            </div>
            <p className="text-indigo-900/90 leading-relaxed max-w-3xl">
              <strong>Account kaise connect hota hai?</strong> Meta Platform Security rules ke anusar, sabhi Instagram Business &amp; Creator accounts official <strong>Facebook Page Login</strong> ya <strong>Instagram Business OAuth</strong> ke zariye securely authorize hote hain. InstaDM kabhi bhi aapka direct password nahi maangta, jisse aapka account Meta strikes aur shadowbans se 100% surakshit rehta hai.
            </p>
          </div>
        </div>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accounts.map((acc) => (
          <div
            key={acc.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-5"
          >
            {/* Top row */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3.5">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-purple-200 shadow-xs flex-shrink-0">
                  <img
                    src={acc.profilePicture}
                    alt={acc.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                    {acc.name}
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </h3>
                  <p className="text-xs font-mono text-purple-600 font-semibold">
                    @{acc.username}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {acc.followersCount.toLocaleString()} followers • {acc.accountType}
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> ACTIVE
              </span>
            </div>

            {/* Details table */}
            <div className="bg-slate-50 rounded-xl p-3 divide-y divide-slate-200/60 text-xs">
              <div className="py-1.5 flex justify-between text-slate-600">
                <span>Meta Page ID:</span>
                <span className="font-mono text-slate-800">{acc.metaPageId}</span>
              </div>
              <div className="py-1.5 flex justify-between text-slate-600">
                <span>Webhook Subscription:</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active (Comments, Stories, DMs)
                </span>
              </div>
              <div className="py-1.5 flex justify-between text-slate-600">
                <span>Connected Since:</span>
                <span className="text-slate-800">{acc.connectedAt}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => showToast('Permissions refreshed with Meta Graph API!')}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3 text-slate-400" /> Re-sync
                </button>
                <button
                  type="button"
                  onClick={() => handleDisconnectAccount(acc.id, acc.username)}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3 text-rose-500" /> Disconnect
                </button>
              </div>

              <a
                href={`https://instagram.com/${acc.username}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-purple-600 hover:underline flex items-center gap-1"
              >
                <span>View on Instagram</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* SYNCED POSTS & REELS LIBRARY (WITH OLD POST DELETE OPTION) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 text-xs font-bold mb-1">
              <InstagramIcon className="w-3.5 h-3.5 text-pink-600" />
              <span>Synced Instagram Media Library</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Posts &amp; Reels Connected to InstaDM
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select or delete old posts to manage which media items can trigger comment-to-DM workflows.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              {syncedPosts.length} Synced Posts
            </span>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {syncedPosts.map((post) => (
            <div
              key={post.id}
              className="p-4 rounded-2xl border border-slate-200 hover:border-purple-200 bg-slate-50/40 hover:bg-white transition-all space-y-3 group"
            >
              <div className="flex gap-3">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                  <img
                    src={post.thumbnail}
                    alt="Post"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute bottom-1 left-1 px-1.5 py-0.2 rounded bg-black/75 text-white font-mono text-[9px] font-bold">
                    {post.type}
                  </span>
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                      <span>{post.postedAt}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteSyncedPost(post.id)}
                        title="Delete old post from sync library"
                        className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-800 line-clamp-2 font-medium">
                      {post.caption}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3 text-rose-500" />
                      {post.likesCount.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3 text-purple-600" />
                      {post.commentsCount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Listening for DMs
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteSyncedPost(post.id)}
                  className="text-rose-600 font-bold hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Delete Post
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* META OAUTH CONNECTION MODAL (FACEBOOK & INSTAGRAM) */}
      {showConnectModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-purple-200 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Meta Dialog Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  <InstagramIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Official Meta Authorization</h4>
                  <p className="text-[11px] text-slate-400">Connect Instagram Business &amp; Creator Account</p>
                </div>
              </div>
              <button
                onClick={() => setShowConnectModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Connection Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Choose Connection Method:
              </label>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setConnectionMethod('FACEBOOK')}
                  className={`p-3 rounded-2xl border-2 text-left transition-all ${
                    connectionMethod === 'FACEBOOK'
                      ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <FacebookIcon className="w-4 h-4 text-blue-600" />
                    <span className="font-bold text-xs text-slate-900">Facebook Login</span>
                  </div>
                  <p className="text-[10px] text-slate-500">Official Meta method for Creator &amp; Business Pages</p>
                </button>

                <button
                  type="button"
                  onClick={() => setConnectionMethod('INSTAGRAM')}
                  className={`p-3 rounded-2xl border-2 text-left transition-all ${
                    connectionMethod === 'INSTAGRAM'
                      ? 'border-purple-600 bg-purple-50/50 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <InstagramIcon className="w-4 h-4 text-pink-600" />
                    <span className="font-bold text-xs text-slate-900">Instagram Login</span>
                  </div>
                  <p className="text-[10px] text-slate-500">Direct Instagram Creator OAuth permission flow</p>
                </button>
              </div>
            </div>

            {/* Explanation why Facebook/Instagram is used */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <Info className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Kyun Facebook / Instagram Login se hi connect hota hai?</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Meta ki official policy ke mutabiq third-party apps direct password save nahi kar sakti. Meta OAuth ke zariye ek encrypted token generate hota hai jo 100% legal aur safe hai.
              </p>
            </div>

            <form onSubmit={handleSimulateOAuth} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Enter Instagram Handle / Username
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">@</span>
                  <input
                    type="text"
                    required
                    value={newHandle}
                    onChange={(e) => setNewHandle(e.target.value)}
                    placeholder="yourbrandname"
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Lock className="w-3.5 h-3.5 text-emerald-500" />
                <span>No password required • Graph API permissions only</span>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowConnectModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isConnecting}
                  className={`px-5 py-2.5 rounded-xl text-white text-xs font-bold shadow-md flex items-center gap-2 disabled:opacity-50 ${
                    connectionMethod === 'FACEBOOK'
                      ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'
                      : 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/20'
                  }`}
                >
                  {isConnecting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Verifying with Meta Graph API...</span>
                    </>
                  ) : (
                    <>
                      {connectionMethod === 'FACEBOOK' ? (
                        <FacebookIcon className="w-4 h-4" />
                      ) : (
                        <InstagramIcon className="w-4 h-4" />
                      )}
                      <span>Authorize with {connectionMethod === 'FACEBOOK' ? 'Facebook' : 'Instagram'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
