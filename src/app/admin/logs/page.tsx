'use client';

import React, { useState } from 'react';
import { 
  Terminal, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  Filter, 
  Code,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LogEntry {
  id: string;
  timestamp: string;
  event: string;
  sender: string;
  account: string;
  latencyMs: number;
  status: '200 OK' | 'IGNORED' | 'RATE_LIMIT_OK';
  payloadSummary: string;
}

const INITIAL_LOGS: LogEntry[] = [
  {
    id: 'evt_91028341',
    timestamp: '12:54:10',
    event: 'comments.create',
    sender: '@sarah_creative',
    account: '@themoderncreator',
    latencyMs: 142,
    status: '200 OK',
    payloadSummary: '{"keyword": "LINK", "post_id": "reel_104", "comment_id": "c_981248"}'
  },
  {
    id: 'evt_91028340',
    timestamp: '12:53:45',
    event: 'messaging.deliveries',
    sender: 'InstaDM Bot',
    account: '@themoderncreator',
    latencyMs: 88,
    status: '200 OK',
    payloadSummary: '{"recipient_id": "usr_9124", "message_id": "mid_8213", "watermark": 1731401625}'
  },
  {
    id: 'evt_91028339',
    timestamp: '12:50:12',
    event: 'story_mentions.create',
    sender: '@claire_travels',
    account: '@zenith_supplements',
    latencyMs: 198,
    status: '200 OK',
    payloadSummary: '{"story_id": "story_9823", "action": "DISCOUNT_COUPON_DM"}'
  },
  {
    id: 'evt_91028338',
    timestamp: '12:48:02',
    event: 'comments.create',
    sender: '@random_bot_spam',
    account: '@themoderncreator',
    latencyMs: 45,
    status: 'IGNORED',
    payloadSummary: '{"comment": "check my bio", "reason": "NO_KEYWORD_MATCH"}'
  }
];

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulateWebhook = () => {
    setIsSimulating(true);

    setTimeout(() => {
      const newLog: LogEntry = {
        id: `evt_${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        event: 'comments.create',
        sender: `@test_user_${Math.floor(Math.random() * 900) + 100}`,
        account: '@themoderncreator',
        latencyMs: Math.floor(Math.random() * 80) + 90,
        status: '200 OK',
        payloadSummary: '{"keyword": "VIP", "post_id": "reel_104", "status": "DM_DISPATCHED"}'
      };

      setLogs([newLog, ...logs]);
      setIsSimulating(false);
      try {
        confetti({ particleCount: 30, spread: 50 });
      } catch {}
    }, 800);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Meta Webhook Telemetry &amp; Logs
            </h1>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              LIVE STREAM
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time audit log of incoming Meta Instagram Graph API webhooks, execution latency, and JSON payloads.
          </p>
        </div>

        <button
          onClick={handleSimulateWebhook}
          disabled={isSimulating}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all self-start sm:self-auto disabled:opacity-50"
        >
          {isSimulating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          <span>Send Test Webhook Event</span>
        </button>
      </div>

      {/* Meta Webhook Verification Endpoint Info */}
      <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
        <div className="space-y-1">
          <span className="text-slate-400 block text-[11px]">ACTIVE WEBHOOK ROUTE:</span>
          <span className="text-purple-300 font-bold">GET / POST /api/webhooks/instagram</span>
        </div>
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Meta Subscription: Subscribed to comments, messages, story_mentions</span>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-4 px-6">Timestamp / ID</th>
                <th className="py-4 px-6">Event Type</th>
                <th className="py-4 px-6">Sender / Account</th>
                <th className="py-4 px-6">Latency</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Payload</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-bold text-slate-800 block">{log.timestamp}</span>
                    <span className="text-[10px] text-slate-400">{log.id}</span>
                  </td>

                  <td className="py-4 px-6 font-bold text-purple-700">
                    {log.event}
                  </td>

                  <td className="py-4 px-6">
                    <span className="text-slate-900 block font-bold">{log.sender}</span>
                    <span className="text-[10px] text-slate-400">{log.account}</span>
                  </td>

                  <td className="py-4 px-6 text-slate-600">
                    {log.latencyMs}ms
                  </td>

                  <td className="py-4 px-6">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.status === '200 OK'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {log.status}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-slate-500 max-w-xs truncate text-[11px]">
                    {log.payloadSummary}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
