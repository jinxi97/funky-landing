import React from 'react';
import { Box, FileCode, Link as LinkIcon } from 'lucide-react';

const StepCard = ({ number, icon, title, children }: { number: string, icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <div className="relative p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-lg transition-all duration-300 group">
    <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-md">
      {number}
    </div>
    <div className="h-12 w-12 bg-white rounded-lg flex items-center justify-center text-slate-700 mb-6 group-hover:scale-110 transition-transform shadow-sm border border-slate-100">
      {icon}
    </div>
    <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
    <div className="text-sm text-slate-500 leading-relaxed">
      {children}
    </div>
  </div>
);

const HowItWorks = () => {
  return (
    <section className="py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">How it Works</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Funky sits between your LLM and your infrastructure. It provides a secure, sandboxed runtime where agents can act like developers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <StepCard 
            number="1" 
            icon={<Box className="text-blue-600" size={24} />} 
            title="Initialize Sandbox"
          >
            Spin up a secure, ephemeral workspace in <strong>less than 100ms</strong>. No cold starts, no waiting.
          </StepCard>

          <StepCard 
            number="2" 
            icon={<FileCode className="text-purple-600" size={24} />} 
            title="Equip with Files"
          >
            Use <code>git clone</code> to drop in standard Python scripts, binaries, or .md files directly into the environment.
          </StepCard>

          <StepCard 
            number="3" 
            icon={<LinkIcon className="text-green-600" size={24} />} 
            title="Connect & Run"
          >
            Connect the sandbox with your favorite agent frameworks: <strong>ADK, Agent SDK, LangGraph</strong>, and more.
          </StepCard>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
