'use client';

import React, { useState } from 'react';
import { INITIAL_INSTAGRAM_POSTS, INITIAL_INSTAGRAM_STORIES } from '@/lib/data';
import { Automation, InstagramPost } from '@/types';
import { InstagramIcon } from '@/components/common/BrandIcons';
import {
  X,
  Zap,
  MessageSquare,
  Sparkles,
  KeyRound,
  CheckCircle2,
  ExternalLink,
  Plus,
  Trash2,
  Lock,
  ArrowRight,
  Radio,
  Image as ImageIcon,
  Film,
  Layers,
  Heart,
  MessageCircle,
  Eye,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CreateAutomationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (automation: Automation) => void;
}

export function CreateAutomationModal({ isOpen, onClose, onSave }: CreateAutomationModalProps) {
  // Step 1: Type
  const [triggerType, setTriggerType] = useState<'COMMENT_TO_DM' | 'STORY_REPLY' | 'DM_KEYWORD'>('COMMENT_TO_DM');

  // Step 2: Post / Story Scope Selection
  const [scope, setScope] = useState<'SPECIFIC_POST' | 'ALL_POSTS' | 'NEXT_POST' | 'SPECIFIC_STORY' | 'ALL_STORIES'>('SPECIFIC_POST');
  const [selectedPost, setSelectedPost] = useState<InstagramPost>(INITIAL_INSTAGRAM_POSTS[0]);
  const [selectedStory, setSelectedStory] = useState<InstagramPost>(INITIAL_INSTAGRAM_STORIES[0]);

  // Step 3: Trigger Keywords
  const [keywordMode, setKeywordMode] = useState<'SPECIFIC' | 'ANY'>('SPECIFIC');
  const [keywords, setKeywords] = useState<string>('LINK, GUIDE, FREE');
  const [matchType, setMatchType] = useState<'CONTAINS' | 'EXACT'>('CONTAINS');

  // Step 4: Public Comment Auto-Reply
  const [enablePublicReply, setEnablePublicReply] = useState<boolean>(true);
  const [publicReplies, setPublicReplies] = useState<string[]>([
    'Just sent you the link in your DMs! 📩 Check your inbox!',
    'Check your DM! Sent it over right now. 🙌',
    'Sent! Let me know if you received the download link! ✨'
  ]);
  const [newPublicReply, setNewPublicReply] = useState<string>('');

  // Step 5: Automated Direct Message (DM)
  const [name, setName] = useState<string>('Reel Comment to Free PDF Guide');
  const [dmText, setDmText] = useState<string>('Hey there! 👋 Thanks for commenting on our post. Here is your private download link for the 2026 Growth Playbook:');
  const [buttonText, setButtonText] = useState<string>('Download PDF Guide');
  const [buttonUrl, setButtonUrl] = useState<string>('https://instadm.dev/resources/growth-playbook.pdf');
  const [requireFollow, setRequireFollow] = useState<boolean>(true);
  const [captureLead, setCaptureLead] = useState<boolean>(true);

  if (!isOpen) return null;

  const handleAddPublicReply = () => {
    if (newPublicReply.trim()) {
      setPublicReplies([...publicReplies, newPublicReply.trim()]);
      setNewPublicReply('');
    }
  };

  const handleRemovePublicReply = (index: number) => {
    setPublicReplies(publicReplies.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const targetThumbnail = triggerType === 'STORY_REPLY'
      ? (scope === 'SPECIFIC_STORY' ? selectedStory.thumbnail : undefined)
      : (scope === 'SPECIFIC_POST' ? selectedPost.thumbnail : undefined);

    const targetCaption = triggerType === 'STORY_REPLY'
      ? (scope === 'SPECIFIC_STORY' ? selectedStory.caption : 'All active 24h Instagram stories')
      : (scope === 'SPECIFIC_POST' ? selectedPost.caption : scope === 'NEXT_POST' ? 'Next post to be published' : 'All past and future posts/reels');

    const newAutomation: Automation = {
      id: `auto-${Date.now()}`,
      name: name || 'Custom Instagram Automation',
      type: triggerType,
      targetScope: scope,
      selectedPostId: triggerType === 'COMMENT_TO_DM' && scope === 'SPECIFIC_POST' ? selectedPost.id : undefined,
      selectedPostThumbnail: targetThumbnail,
      selectedPostCaption: targetCaption,
      triggerKeywords: keywordMode === 'SPECIFIC'
        ? keywords.split(',').map(k => k.trim().toUpperCase()).filter(Boolean)
        : ['ANY_COMMENT'],
      matchType: keywordMode === 'SPECIFIC' ? matchType : 'ANY',
      replyMessage: dmText,
      buttonText: buttonText || undefined,
      buttonUrl: buttonUrl || undefined,
      requireFollow,
      captureLead,
      leadFields: captureLead ? ['email'] : [],
      publicCommentReplies: enablePublicReply ? publicReplies : [],
      status: 'ACTIVE',
      totalTriggers: 0,
      totalDelivered: 0,
      linkClicks: 0,
      leadsCollected: 0,
      createdAt: 'Just now',
      instagramAccountId: 'ig-acc-1',
    };

    onSave(newAutomation);
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch {}
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-purple-200/80 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-purple-50/60 to-indigo-50/40 rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-purple-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Create Instagram DM Automation
              </h2>
              <p className="text-xs text-slate-500">
                Choose a specific post or story, set trigger keywords, and configure your automated DM reply.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Scrollable Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-8 space-y-8 overflow-y-auto flex-1">
          
          {/* STEP 1: TRIGGER TYPE SELECTION */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">1</span>
                <span>Select Trigger Event Type</span>
              </label>
              <span className="text-[11px] font-semibold text-slate-400">Where should InstaDM listen?</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'COMMENT_TO_DM',
                  title: 'Post / Reel Comment',
                  desc: 'User comments on your Instagram Post or Reel',
                  icon: MessageSquare,
                  badge: 'Most Popular'
                },
                {
                  id: 'STORY_REPLY',
                  title: 'Story Reply & Mention',
                  desc: 'User replies to or tags your 24h Instagram Story',
                  icon: Sparkles,
                  badge: 'High Intent'
                },
                {
                  id: 'DM_KEYWORD',
                  title: 'Direct Message Keyword',
                  desc: 'User sends a direct DM keyword to your inbox',
                  icon: KeyRound,
                  badge: 'Direct'
                }
              ].map((item) => {
                const Icon = item.icon;
                const active = triggerType === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setTriggerType(item.id as 'COMMENT_TO_DM' | 'STORY_REPLY' | 'DM_KEYWORD');
                      if (item.id === 'STORY_REPLY') {
                        setScope('SPECIFIC_STORY');
                      } else if (item.id === 'COMMENT_TO_DM') {
                        setScope('SPECIFIC_POST');
                      }
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                      active
                        ? 'border-purple-600 bg-purple-50/40 shadow-sm ring-2 ring-purple-500/20'
                        : 'border-slate-200 hover:border-purple-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${active ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${active ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                        {item.badge}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 mb-0.5">{item.title}</h4>
                    <p className="text-[11px] text-slate-500 leading-snug">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 2: POST OR STORY SELECTOR (THE USER'S MAIN REQUEST) */}
          {triggerType === 'COMMENT_TO_DM' && (
            <div className="space-y-4 p-5 rounded-3xl bg-slate-50/80 border border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-xs font-black uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">2</span>
                  <span>Select Which Post / Reel Triggers This DM</span>
                </label>
                
                {/* Scope Switcher */}
                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setScope('SPECIFIC_POST')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      scope === 'SPECIFIC_POST'
                        ? 'bg-purple-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Select Specific Post
                  </button>
                  <button
                    type="button"
                    onClick={() => setScope('ALL_POSTS')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      scope === 'ALL_POSTS'
                        ? 'bg-purple-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All Posts &amp; Reels
                  </button>
                  <button
                    type="button"
                    onClick={() => setScope('NEXT_POST')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      scope === 'NEXT_POST'
                        ? 'bg-purple-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Next Upcoming Post
                  </button>
                </div>
              </div>

              {scope === 'SPECIFIC_POST' && (
                <div className="space-y-2">
                  <p className="text-xs text-slate-500">
                    Click any post or Reel below to link this automation:
                  </p>

                  {/* Visual Grid of Instagram Posts */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto p-1">
                    {INITIAL_INSTAGRAM_POSTS.map((post) => {
                      const isSelected = selectedPost.id === post.id;
                      return (
                        <div
                          key={post.id}
                          onClick={() => setSelectedPost(post)}
                          className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex gap-3 relative ${
                            isSelected
                              ? 'border-purple-600 bg-white shadow-md ring-2 ring-purple-500/20'
                              : 'border-slate-200 bg-white hover:border-purple-200'
                          }`}
                        >
                          {/* Post Thumbnail */}
                          <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-900 flex-shrink-0">
                            <img
                              src={post.thumbnail}
                              alt="Post Thumbnail"
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute bottom-1 left-1 px-1.5 py-0.2 rounded bg-black/70 text-white font-mono text-[9px] font-bold">
                              {post.type}
                            </span>
                          </div>

                          {/* Post Caption & Engagement */}
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                                <span>{post.postedAt}</span>
                                {isSelected && (
                                  <span className="flex items-center gap-1 font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">
                                    <Check className="w-3 h-3" /> Selected
                                  </span>
                                )}
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
                      );
                    })}
                  </div>
                </div>
              )}

              {scope === 'ALL_POSTS' && (
                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-xs text-purple-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <span>This automation will monitor comments across <strong>every existing and future post/reel</strong> on your connected account.</span>
                </div>
              )}

              {scope === 'NEXT_POST' && (
                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>This automation will automatically attach itself to the <strong>very next post or Reel</strong> you publish on Instagram.</span>
                </div>
              )}
            </div>
          )}

          {/* STEP 2 (STORY VERSION): ACTIVE STORY SELECTOR */}
          {triggerType === 'STORY_REPLY' && (
            <div className="space-y-4 p-5 rounded-3xl bg-slate-50/80 border border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-xs font-black uppercase tracking-wider text-pink-700 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-pink-600 text-white flex items-center justify-center text-[10px]">2</span>
                  <span>Select Which Instagram Story Triggers This DM</span>
                </label>

                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setScope('SPECIFIC_STORY')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      scope === 'SPECIFIC_STORY'
                        ? 'bg-pink-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Select Active Story
                  </button>
                  <button
                    type="button"
                    onClick={() => setScope('ALL_STORIES')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      scope === 'ALL_STORIES'
                        ? 'bg-pink-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Any Active Story
                  </button>
                </div>
              </div>

              {scope === 'SPECIFIC_STORY' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {INITIAL_INSTAGRAM_STORIES.map((story) => {
                    const isSelected = selectedStory.id === story.id;
                    return (
                      <div
                        key={story.id}
                        onClick={() => setSelectedStory(story)}
                        className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex gap-3 ${
                          isSelected
                            ? 'border-pink-600 bg-white shadow-md ring-2 ring-pink-500/20'
                            : 'border-slate-200 bg-white hover:border-pink-200'
                        }`}
                      >
                        <div className="w-16 h-20 rounded-xl overflow-hidden bg-slate-900 flex-shrink-0">
                          <img src={story.thumbnail} alt="Story" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between text-[10px] text-pink-600 font-semibold mb-1">
                              <span>{story.postedAt}</span>
                              {isSelected && <span className="font-bold">✓ Selected</span>}
                            </div>
                            <p className="text-xs text-slate-800 line-clamp-2">{story.caption}</p>
                          </div>
                          <span className="text-[10px] text-slate-400">Replies: {story.commentsCount}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* STEP 3: KEYWORD CONFIGURATION */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">3</span>
              <span>Trigger Keyword Settings</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                onClick={() => setKeywordMode('SPECIFIC')}
                className={`p-3.5 rounded-2xl border cursor-pointer flex items-center gap-3 ${
                  keywordMode === 'SPECIFIC' ? 'border-purple-600 bg-purple-50/50' : 'border-slate-200'
                }`}
              >
                <input
                  type="radio"
                  name="kwMode"
                  checked={keywordMode === 'SPECIFIC'}
                  onChange={() => setKeywordMode('SPECIFIC')}
                  className="w-4 h-4 text-purple-600"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Specific Keywords</span>
                  <span className="text-[11px] text-slate-500">Only replies when comment contains designated words</span>
                </div>
              </label>

              <label
                onClick={() => setKeywordMode('ANY')}
                className={`p-3.5 rounded-2xl border cursor-pointer flex items-center gap-3 ${
                  keywordMode === 'ANY' ? 'border-purple-600 bg-purple-50/50' : 'border-slate-200'
                }`}
              >
                <input
                  type="radio"
                  name="kwMode"
                  checked={keywordMode === 'ANY'}
                  onChange={() => setKeywordMode('ANY')}
                  className="w-4 h-4 text-purple-600"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Any Comment</span>
                  <span className="text-[11px] text-slate-500">Sends DM on every single comment received</span>
                </div>
              </label>
            </div>

            {keywordMode === 'SPECIFIC' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Keywords (comma-separated)
                  </label>
                  <input
                    type="text"
                    required
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value.toUpperCase())}
                    placeholder="e.g. LINK, GUIDE, VIP, COACH"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs uppercase font-mono font-bold focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Matching Rule
                  </label>
                  <select
                    value={matchType}
                    onChange={(e) => setMatchType(e.target.value as 'CONTAINS' | 'EXACT')}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="CONTAINS">Contains Keyword</option>
                    <option value="EXACT">Exact Match Only</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* STEP 4: PUBLIC COMMENT AUTO-REPLY (OPTIONAL BUT RECOMMENDED) */}
          {triggerType === 'COMMENT_TO_DM' && (
            <div className="space-y-3 p-5 rounded-3xl bg-slate-50/80 border border-slate-200">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">4</span>
                  <span>Public Comment Auto-Reply</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enablePublicReply}
                    onChange={(e) => setEnablePublicReply(e.target.checked)}
                    className="w-4 h-4 text-purple-600 rounded"
                  />
                  <span>Reply publicly to comment</span>
                </label>
              </div>

              {enablePublicReply && (
                <div className="space-y-2">
                  <p className="text-[11px] text-slate-500">
                    InstaDM rotates between these replies on the post comment to keep responses natural and compliant:
                  </p>

                  <div className="space-y-1.5">
                    {publicReplies.map((reply, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs">
                        <span className="text-slate-700">&quot;{reply}&quot;</span>
                        <button
                          type="button"
                          onClick={() => handleRemovePublicReply(i)}
                          className="text-slate-400 hover:text-rose-600 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-1">
                    <input
                      type="text"
                      value={newPublicReply}
                      onChange={(e) => setNewPublicReply(e.target.value)}
                      placeholder="Add another public reply variation..."
                      className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddPublicReply}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 5: AUTOMATED DIRECT MESSAGE (DM) MESSAGE & ACTION */}
          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">5</span>
              <span>Automated Direct Message (DM) Content</span>
            </label>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Campaign / Automation Title
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Reel #104 Comment to Growth Playbook"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Direct Message Text
              </label>
              <textarea
                rows={3}
                required
                value={dmText}
                onChange={(e) => setDmText(e.target.value)}
                placeholder="Hey there! Thanks for your comment. Here is your private download link:"
                className="w-full p-3.5 rounded-xl border border-slate-200 text-xs text-slate-900 leading-relaxed focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  CTA Button Label
                </label>
                <input
                  type="text"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                  placeholder="e.g. Download Free PDF"
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Button Destination URL
                </label>
                <input
                  type="url"
                  value={buttonUrl}
                  onChange={(e) => setButtonUrl(e.target.value)}
                  placeholder="https://instadm.dev/resources/guide.pdf"
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer bg-slate-50 p-3 rounded-xl border border-slate-200">
                <input
                  type="checkbox"
                  checked={requireFollow}
                  onChange={(e) => setRequireFollow(e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded"
                />
                <span>Follow Gate: Ask user to follow account</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer bg-slate-50 p-3 rounded-xl border border-slate-200">
                <input
                  type="checkbox"
                  checked={captureLead}
                  onChange={(e) => setCaptureLead(e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded"
                />
                <span>Lead Capture: Ask user for email in DM</span>
              </label>
            </div>
          </div>

          {/* Modal Footer / Save Action */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-500/25 flex items-center gap-2 transition-all transform hover:scale-105"
            >
              <span>Save &amp; Turn On Automation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
