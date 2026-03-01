'use client';

import React from 'react';
import { BarChart2, Wrench, ShieldCheck, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '1',
    icon: <BarChart2 size={20} />,
    iconStyle: 'bg-blue-50 border-blue-100 text-blue-600',
    title: 'Measure',
    description:
      'Define metrics and instrument your workspace. Collect data across agent runs — success rates, latency, task completion, and more.',
  },
  {
    number: '2',
    icon: <Wrench size={20} />,
    iconStyle: 'bg-purple-50 border-purple-100 text-purple-600',
    title: 'Patch',
    description:
      "Extract insights from your metrics. Identify what's failing and apply targeted patches to scripts, prompts, or dependencies.",
  },
  {
    number: '3',
    icon: <ShieldCheck size={20} />,
    iconStyle: 'bg-green-50 border-green-100 text-green-600',
    title: 'Verify',
    description:
      'Validate every improvement before it ships. Compare against historical baselines or run a canary instance side by side.',
  },
];

const EvolutionSection = () => (
  <section className="py-24 bg-slate-50 border-t border-slate-200">
    <div className="max-w-7xl mx-auto px-6">

      <div className="text-center mb-14">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Evolve your workspace. Stay in control.
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto">
          Funky closes the loop between observation and improvement — so your
          workspace evolves as fast as your use cases do.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-stretch gap-6 md:gap-3">
        {steps.map((step, idx) => (
          <React.Fragment key={step.number}>
            <div className="flex-1 relative bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="absolute -top-3.5 left-5 w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shadow-md">
                {step.number}
              </div>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${step.iconStyle} mb-4 mt-1`}>
                {step.icon}
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
            </div>
            {idx < steps.length - 1 && (
              <div className="hidden md:flex items-center justify-center text-slate-300 flex-shrink-0 px-1">
                <ArrowRight size={18} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

    </div>
  </section>
);

export default EvolutionSection;
