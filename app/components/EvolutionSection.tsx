import React from 'react';
import { BookOpen, Terminal } from 'lucide-react';

const EvolutionSection = () => {
  return (
    <section className="py-24 relative border-t border-slate-200 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Content */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-slate-900">Self-Healing, Self-Evolving.</h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Traditional agents fail when they lack a tool. Funky agents realize the gap, write a Python script to fix it, and execute it immediately.
            </p>
            
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-blue-600 shrink-0 bg-white border border-slate-200 shadow-sm">
                  <BookOpen size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Markdown as Documentation</h3>
                  <p className="text-sm text-slate-500">No system prompts. Agents read `skills.md` like a human developer.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-purple-600 shrink-0 bg-white border border-slate-200 shadow-sm">
                  <Terminal size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Full Shell Access</h3>
                  <p className="text-sm text-slate-500">Real `python`, `curl`, and `grep`. If it runs in linux, your agent can use it.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Code Visual */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-300 to-purple-300 rounded-xl blur opacity-30"></div>
            <div className="relative bg-slate-900 rounded-xl border border-slate-800 shadow-2xl overflow-hidden font-mono text-sm">
              <div className="flex justify-between items-center px-4 py-3 bg-slate-800 border-b border-slate-700">
                <div className="flex gap-4 text-xs font-mono text-slate-500">
                  <span className="text-white border-b-2 border-blue-500 pb-2.5 -mb-3">workspace.py</span>
                  <span>agent.log</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                </div>
              </div>
              <div className="p-6 bg-[#0f172a] text-slate-300">
                <div className="flex gap-4">
                  <div className="text-slate-600 select-none text-right">
                    1<br/>2<br/>3<br/>4<br/>5
                  </div>
                  <div>
                    <span className="text-pink-400">def</span> <span className="text-purple-400">evolve_toolset</span>(task):<br/>
                    &nbsp;&nbsp;<span className="text-pink-400">if</span> <span className="text-pink-400">not</span> has_tool(task):<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500 italic"># Agent writes its own solution</span><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;code = generate_script(task)<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;filesystem.write(<span className="text-sky-300">f"{`{task}`}.py"</span>, code)<br/>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EvolutionSection;
