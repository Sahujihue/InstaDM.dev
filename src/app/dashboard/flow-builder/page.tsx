'use client';

import React, { useState } from 'react';
import { 
  Zap, 
  GitFork, 
  Clock, 
  Bot, 
  MessageCircle, 
  UserCheck, 
  Webhook, 
  Play, 
  Save, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Sliders
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface FlowNode {
  id: string;
  type: 'TRIGGER' | 'CONDITION' | 'DELAY' | 'AI_REPLY' | 'DM_MESSAGE' | 'LEAD_CAPTURE' | 'WEBHOOK';
  title: string;
  description: string;
  config: Record<string, string>;
}

const INITIAL_NODES: FlowNode[] = [
  {
    id: 'node-1',
    type: 'TRIGGER',
    title: '1. Reel Comment Trigger',
    description: 'Fires when a user comments keyword on post',
    config: {
      keyword: 'LINK, WEBINAR, FREE',
      matchType: 'CONTAINS',
      postTarget: 'All Active Posts & Reels'
    }
  },
  {
    id: 'node-2',
    type: 'CONDITION',
    title: '2. Check Follower Status',
    description: 'Verify if commenter follows your account',
    config: {
      check: 'Is Following Account',
      ifFalse: 'Ask to follow before link release',
      ifTrue: 'Proceed to direct message'
    }
  },
  {
    id: 'node-3',
    type: 'DELAY',
    title: '3. Smart Human Delay',
    description: 'Simulate natural human response cadence',
    config: {
      delaySeconds: '2 seconds',
      typingIndicator: 'Enabled'
    }
  },
  {
    id: 'node-4',
    type: 'DM_MESSAGE',
    title: '4. Deliver Resource & Link',
    description: 'Send interactive DM with button',
    config: {
      message: 'Hey! Thanks for commenting. Here is your private 2026 Growth Playbook link:',
      buttonText: 'Download PDF Guide',
      buttonUrl: 'https://instadm.dev/resources/guide.pdf'
    }
  },
  {
    id: 'node-5',
    type: 'LEAD_CAPTURE',
    title: '5. Capture Verified Email',
    description: 'Collect email address directly in DM',
    config: {
      prompt: 'What email should we send your VIP updates and bonus templates to?',
      syncDestination: 'Google Sheets + Klaviyo'
    }
  }
];

export default function FlowBuilderPage() {
  const [nodes, setNodes] = useState<FlowNode[]>(INITIAL_NODES);
  const [selectedNode, setSelectedNode] = useState<FlowNode>(INITIAL_NODES[0]);
  const [simulatorOpen, setSimulatorOpen] = useState<boolean>(false);
  const [testComment, setTestComment] = useState<string>('LINK');
  const [simulatedLogs, setSimulatedLogs] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const handleSelectNode = (node: FlowNode) => {
    setSelectedNode(node);
  };

  const handleUpdateConfig = (key: string, value: string) => {
    const updated = nodes.map((n) => {
      if (n.id === selectedNode.id) {
        return {
          ...n,
          config: { ...n.config, [key]: value }
        };
      }
      return n;
    });
    setNodes(updated);
    setSelectedNode({
      ...selectedNode,
      config: { ...selectedNode.config, [key]: value }
    });
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulatedLogs([]);

    const steps = [
      `[0.0s] Incoming webhook received from Meta Graph API.`,
      `[0.2s] Match detected: keyword "${testComment.toUpperCase()}" in comment on Reel #104.`,
      `[0.5s] Executing Node 2: Verified user @sarah_creative is following.`,
      `[1.5s] Delay 1.5s applied with natural typing indicator.`,
      `[1.8s] Node 4 executed: DM sent with button "Download PDF Guide".`,
      `[2.0s] Node 5 executed: Conversational lead prompt dispatched.`,
      `[SUCCESS] Workflow completed successfully with zero API errors.`
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setSimulatedLogs((prev) => [...prev, step]);
        if (idx === steps.length - 1) {
          setIsSimulating(false);
          try {
            confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
          } catch {
            // ignore
          }
        }
      }, (idx + 1) * 350);
    });
  };

  const getNodeColor = (type: FlowNode['type']) => {
    switch (type) {
      case 'TRIGGER': return 'border-purple-400 bg-purple-50 text-purple-700';
      case 'CONDITION': return 'border-indigo-400 bg-indigo-50 text-indigo-700';
      case 'DELAY': return 'border-amber-400 bg-amber-50 text-amber-700';
      case 'DM_MESSAGE': return 'border-pink-400 bg-pink-50 text-pink-700';
      case 'LEAD_CAPTURE': return 'border-emerald-400 bg-emerald-50 text-emerald-700';
      default: return 'border-slate-300 bg-slate-50 text-slate-700';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Visual Flow Builder
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
              Interactive Canvas
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Build complex conversational funnels by connecting triggers, conditions, delays, and lead captures.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setSimulatorOpen(!simulatorOpen)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-purple-300 bg-purple-50 text-purple-700 font-bold text-xs sm:text-sm hover:bg-purple-100 transition-colors"
          >
            <Play className="w-4 h-4 fill-purple-600" />
            <span>Test In Simulator</span>
          </button>

          <button
            onClick={() => {
              try { confetti({ particleCount: 50, spread: 60 }); } catch {}
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save &amp; Deploy Flow</span>
          </button>
        </div>
      </div>

      {/* Main Flow Editor Area: Node Canvas (Left) + Inspector Panel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 8 Cols: Visual Interactive Node Canvas */}
        <div className="lg:col-span-8 bg-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl min-h-[560px] relative overflow-hidden flex flex-col justify-between">
          
          {/* Canvas Background Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Canvas Top Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs text-white z-10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold">Active Flow: Reel Comment to Free PDF Lead Magnet</span>
            </div>
            <span className="font-mono text-[11px] text-slate-400">5 Connected Nodes</span>
          </div>

          {/* Node Sequence List */}
          <div className="space-y-4 py-6 z-10 max-w-xl mx-auto w-full">
            {nodes.map((node, index) => {
              const isSelected = selectedNode.id === node.id;
              return (
                <React.Fragment key={node.id}>
                  <div
                    onClick={() => handleSelectNode(node)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer backdrop-blur-md ${
                      isSelected
                        ? 'border-purple-400 bg-slate-900 shadow-lg shadow-purple-500/20 ring-2 ring-purple-400/30'
                        : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-white flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${node.type === 'TRIGGER' ? 'bg-purple-400' : node.type === 'CONDITION' ? 'bg-indigo-400' : 'bg-emerald-400'}`} />
                        {node.title}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-purple-300 border border-slate-700">
                        {node.type}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mb-2">
                      {node.description}
                    </p>

                    <div className="p-2 rounded-lg bg-slate-950/70 text-[11px] font-mono text-slate-300 border border-slate-800/80 truncate">
                      {Object.entries(node.config)[0] ? `${Object.entries(node.config)[0][0]}: "${Object.entries(node.config)[0][1]}"` : ''}
                    </div>
                  </div>

                  {index < nodes.length - 1 && (
                    <div className="flex justify-center my-1">
                      <div className="w-0.5 h-6 bg-gradient-to-b from-purple-500 to-indigo-500 relative">
                        <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-2.5 h-2.5 rounded-full bg-purple-400" />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div className="text-center z-10 pt-2 border-t border-slate-800 text-slate-400 text-xs">
            <span>Click any node above to edit its parameters in the inspector panel</span>
          </div>
        </div>

        {/* Right 4 Cols: Node Inspector Panel */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 block">
                Node Properties
              </span>
              <h3 className="text-base font-bold text-slate-900">{selectedNode.title}</h3>
            </div>
            <span className="text-xs font-mono bg-purple-50 text-purple-700 px-2 py-0.5 rounded">
              {selectedNode.type}
            </span>
          </div>

          <div className="space-y-4">
            {Object.entries(selectedNode.config).map(([k, v]) => (
              <div key={k}>
                <label className="block text-xs font-bold text-slate-700 mb-1 capitalize">
                  {k.replace(/([A-Z])/g, ' $1')}
                </label>
                {k === 'message' || k === 'prompt' ? (
                  <textarea
                    rows={3}
                    value={v}
                    onChange={(e) => handleUpdateConfig(k, e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 font-sans"
                  />
                ) : (
                  <input
                    type="text"
                    value={v}
                    onChange={(e) => handleUpdateConfig(k, e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 font-sans"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                try { confetti({ particleCount: 30, spread: 50 }); } catch {}
              }}
              className="w-full py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-700 transition-colors shadow-xs"
            >
              Apply Parameter Changes
            </button>
          </div>
        </div>

      </div>

      {/* Simulator Drawer / Modal */}
      {simulatorOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-purple-500/40 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Play className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold">Real-Time Flow Execution Simulator</h3>
              </div>
              <button
                onClick={() => setSimulatorOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                Close
              </button>
            </div>

            <div className="space-y-3">
              <label className="block text-xs text-slate-300 font-semibold">
                Simulated Comment Input
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={testComment}
                  onChange={(e) => setTestComment(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white uppercase focus:outline-none focus:border-purple-500"
                />
                <button
                  onClick={handleRunSimulation}
                  disabled={isSimulating}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-xs font-bold text-white flex-shrink-0 disabled:opacity-50"
                >
                  {isSimulating ? 'Executing...' : 'Run Test'}
                </button>
              </div>
            </div>

            {/* Execution Logs */}
            <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 min-h-[160px] max-h-56 overflow-y-auto space-y-1.5 font-mono text-[11px]">
              {simulatedLogs.length === 0 ? (
                <p className="text-slate-500 italic">Click &quot;Run Test&quot; above to simulate the webhook trigger execution step by step.</p>
              ) : (
                simulatedLogs.map((log, i) => (
                  <div key={i} className={log.includes('SUCCESS') ? 'text-emerald-400 font-bold' : 'text-slate-300'}>
                    {log}
                  </div>
                ))
              )}
            </div>

            <div className="text-right">
              <button
                onClick={() => setSimulatorOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-slate-300 hover:bg-slate-700"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
