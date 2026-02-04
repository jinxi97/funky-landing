'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

import type { TerminalConnectionStatus } from '@/components/Terminal';

const Terminal = dynamic(() => import('@/components/Terminal'), { ssr: false });

export default function TerminalBox() {
  const [status, setStatus] = useState<TerminalConnectionStatus>('connecting');
  const statusLabel =
    status === 'connected'
      ? 'Connected'
      : status === 'disconnected'
        ? 'Disconnected'
        : 'Connecting';
  const statusColor =
    status === 'connected'
      ? 'bg-emerald-400'
      : status === 'disconnected'
        ? 'bg-rose-400'
        : 'bg-amber-400';

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-sm">
      <div className="flex items-center justify-between gap-2 border-b border-slate-800 px-4 py-2 text-xs text-slate-300">
        <span className="ml-2">OpenClaw Terminal</span>
        <span className="mr-2 inline-flex items-center gap-2 text-[11px] text-slate-300">
          <span className={`h-2 w-2 rounded-full ${statusColor}`} />
          {statusLabel}
        </span>
      </div>
      <div className="h-128 w-full p-3">
        <Terminal onStatusChange={setStatus} />
      </div>
    </div>
  );
}
