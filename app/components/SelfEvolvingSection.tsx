import React from 'react';
import { Sparkles } from 'lucide-react';

const SelfEvolvingSection = () => (
  <section className="py-24 bg-white border-t border-slate-200">
    <div className="max-w-7xl mx-auto px-6">

      {/* Heading */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-semibold mb-6">
          <Sparkles size={11} />
          Self-evolving mode
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Or, remove yourself entirely.
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto">
          Set a high-level goal. The agent defines its own metrics, patches the
          workspace, and verifies the result — no human in the loop required.
        </p>
      </div>

      {/* Terminal visualization */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-900 rounded-2xl border border-slate-700/60 shadow-2xl overflow-hidden">

          {/* Terminal bar */}
          <div className="flex items-center gap-1.5 px-5 py-3.5 bg-slate-800/80 border-b border-slate-700/60">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="ml-3 text-slate-500 text-xs font-mono">goal.md</span>
          </div>

          {/* Content */}
          <div className="p-8 font-mono text-sm space-y-6">

            {/* Goal input */}
            <div>
              <div className="text-slate-500 text-xs mb-2 uppercase tracking-widest">Goal</div>
              <div className="text-green-400 text-base leading-snug">
                "Improve customer satisfaction rate."
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-700/60" />

            {/* Agent steps */}
            <div className="space-y-3">
              <div className="text-slate-500 text-xs uppercase tracking-widest mb-3">Agent</div>

              <div className="flex items-start gap-3">
                <span className="text-blue-400 shrink-0 mt-0.5">→</span>
                <div>
                  <span className="text-slate-300">Defines success metrics</span>
                  <span className="text-slate-600 ml-2 text-xs">CSAT score, resolution time, retry rate</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-blue-400 shrink-0 mt-0.5">→</span>
                <div>
                  <span className="text-slate-300">Patches workspace</span>
                  <span className="text-slate-600 ml-2 text-xs">updates skills.md, rewrites handle_error.py</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-blue-400 shrink-0 mt-0.5">→</span>
                <div>
                  <span className="text-slate-300">Verifies via canary</span>
                  <span className="text-slate-600 ml-2 text-xs">runs 200 sessions against baseline</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-700/60" />

            {/* Result */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-green-400 text-base">✓</span>
                <span className="text-green-400 font-semibold">CSAT +12% — deployed</span>
              </div>
              <span className="text-slate-600 text-xs">0 humans involved</span>
            </div>

          </div>
        </div>
      </div>

    </div>
  </section>
);

export default SelfEvolvingSection;
