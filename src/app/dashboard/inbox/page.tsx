'use client';

import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  Search, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface Conversation {
  id: string;
  handle: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  humanTakeover: boolean;
  messages: {
    id: string;
    sender: 'user' | 'bot' | 'agent';
    text: string;
    timestamp: string;
    button?: { text: string; url: string };
  }[];
}

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    handle: 'sarah_creative',
    name: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    lastMessage: 'Just downloaded! Thanks for the instant link! 🔥',
    timestamp: '2m ago',
    humanTakeover: false,
    messages: [
      {
        id: 'm1',
        sender: 'user',
        text: 'LINK',
        timestamp: '12:50 PM'
      },
      {
        id: 'm2',
        sender: 'bot',
        text: 'Hey Sarah! 👋 Thanks for commenting. Here is your instant access to our 2026 Growth Playbook:',
        timestamp: '12:50 PM',
        button: { text: 'Download Free PDF', url: 'https://instadm.dev/resources/growth-playbook.pdf' }
      },
      {
        id: 'm3',
        sender: 'user',
        text: 'Just downloaded! Thanks for the instant link! 🔥',
        timestamp: '12:52 PM'
      }
    ]
  },
  {
    id: 'conv-2',
    handle: 'alex_ecommerce',
    name: 'Alexandre Mercier',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    lastMessage: 'Coupon applied at checkout, order placed!',
    timestamp: '18m ago',
    humanTakeover: false,
    messages: [
      {
        id: 'm10',
        sender: 'user',
        text: 'VIP',
        timestamp: '12:30 PM'
      },
      {
        id: 'm11',
        sender: 'bot',
        text: 'Exclusive VIP Offer unlocked! 🎉 Use coupon code VIP30 for 30% off your entire order:',
        timestamp: '12:30 PM',
        button: { text: 'Shop VIP 30% Off', url: 'https://instadm.dev/store?discount=VIP30' }
      },
      {
        id: 'm12',
        sender: 'user',
        text: 'Coupon applied at checkout, order placed!',
        timestamp: '12:36 PM'
      }
    ]
  },
  {
    id: 'conv-3',
    handle: 'rohit_fitlife',
    name: 'Rohit Verma',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
    lastMessage: 'Is the 1-on-1 coaching program still open?',
    timestamp: '1h ago',
    humanTakeover: true,
    messages: [
      {
        id: 'm20',
        sender: 'user',
        text: 'COACH',
        timestamp: '11:40 AM'
      },
      {
        id: 'm21',
        sender: 'bot',
        text: 'Hey! Ready to scale your brand? Let’s hop on a free 15-minute strategy call:',
        timestamp: '11:40 AM',
        button: { text: 'Book Free Strategy Call', url: 'https://instadm.dev/calendar/apply' }
      },
      {
        id: 'm22',
        sender: 'user',
        text: 'Is the 1-on-1 coaching program still open?',
        timestamp: '11:45 AM'
      }
    ]
  }
];

export default function InboxPage() {
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState<string>(INITIAL_CONVERSATIONS[0].id);
  const [replyInput, setReplyInput] = useState<string>('');

  const activeConv = conversations.find(c => c.id === activeConvId) || conversations[0];

  const handleToggleTakeover = () => {
    setConversations(conversations.map((c) => {
      if (c.id === activeConv.id) {
        return { ...c, humanTakeover: !c.humanTakeover };
      }
      return c;
    }));
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyInput.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'agent' as const,
      text: replyInput,
      timestamp: 'Just now'
    };

    setConversations(conversations.map((c) => {
      if (c.id === activeConv.id) {
        return {
          ...c,
          lastMessage: replyInput,
          messages: [...c.messages, newMsg]
        };
      }
      return c;
    }));

    setReplyInput('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            DM Live Inbox
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            View automated conversation threads and seamlessly take over with human responses.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Meta Official Direct Webhook Connected</span>
        </div>
      </div>

      {/* 2-Pane Chat Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[620px]">
        
        {/* Left 4 Cols: Conversation Threads */}
        <div className="lg:col-span-4 border-r border-slate-200 flex flex-col justify-between">
          <div>
            <div className="p-4 border-b border-slate-100">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="divide-y divide-slate-100 overflow-y-auto max-h-[520px]">
              {conversations.map((c) => {
                const isSelected = c.id === activeConv.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => setActiveConvId(c.id)}
                    className={`p-4 flex items-start gap-3 cursor-pointer transition-colors ${
                      isSelected ? 'bg-purple-50/70 border-l-4 border-purple-600' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-purple-200 flex-shrink-0">
                      <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs font-bold text-slate-900 truncate">@{c.handle}</span>
                        <span className="text-[10px] text-slate-400">{c.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-500 truncate">{c.lastMessage}</p>
                      
                      {c.humanTakeover && (
                        <span className="inline-block mt-1 text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                          Human Takeover
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 8 Cols: Active Chat History & Response Box */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-slate-50/40">
          
          {/* Thread Header */}
          <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-purple-200">
                <img src={activeConv.avatar} alt={activeConv.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">@{activeConv.handle}</h4>
                <p className="text-[11px] text-slate-500">{activeConv.name}</p>
              </div>
            </div>

            {/* Human Takeover Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleTakeover}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  activeConv.humanTakeover
                    ? 'bg-amber-500 text-white border-amber-600 shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {activeConv.humanTakeover ? 'Human Takeover Active' : 'Switch to Human Takeover'}
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="p-6 space-y-4 overflow-y-auto max-h-[440px]">
            {activeConv.messages.map((m) => {
              const isUser = m.sender === 'user';
              const isBot = m.sender === 'bot';

              return (
                <div
                  key={m.id}
                  className={`flex ${isUser ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-md p-4 rounded-2xl text-xs space-y-2 shadow-2xs ${
                      isUser
                        ? 'bg-white border border-slate-200 text-slate-900 rounded-tl-xs'
                        : isBot
                        ? 'bg-purple-900 text-white rounded-tr-xs'
                        : 'bg-indigo-600 text-white rounded-tr-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] opacity-75 pb-1 border-b border-white/10">
                      <span className="font-bold flex items-center gap-1">
                        {isUser ? <User className="w-3 h-3" /> : isBot ? <Bot className="w-3 h-3 text-purple-300" /> : <Sparkles className="w-3 h-3 text-amber-300" />}
                        {isUser ? `@${activeConv.handle}` : isBot ? 'InstaDM Bot' : 'Human Agent'}
                      </span>
                      <span>{m.timestamp}</span>
                    </div>

                    <p className="leading-relaxed">{m.text}</p>

                    {m.button && (
                      <div className="pt-1">
                        <a
                          href={m.button.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-lg bg-white text-purple-900 font-bold text-xs shadow-xs hover:bg-purple-50"
                        >
                          <span>{m.button.text}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reply Form */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-200 flex gap-2">
            <input
              type="text"
              value={replyInput}
              onChange={(e) => setReplyInput(e.target.value)}
              placeholder={`Send message to @${activeConv.handle}...`}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
