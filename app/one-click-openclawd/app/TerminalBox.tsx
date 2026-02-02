'use client';

import dynamic from 'next/dynamic';

const Terminal = dynamic(() => import('@/components/Terminal'), { ssr: false });

export default function TerminalBox() {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-sm">
      <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-2 text-xs text-slate-300">
        <span className="ml-2">OpenClaw Terminal</span>
      </div>
      <div className="h-128 w-full p-3">
        <Terminal />
      </div>
    </div>
  );
}
