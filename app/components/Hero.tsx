import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-xs font-medium mb-8 shadow-sm animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          Private Beta • Invitation Only
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight max-w-5xl mx-auto text-slate-900 leading-tight">
          Give agents <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">workspace</span><br />
          instead of tools.
        </h1>
        
        <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          Funky replaces rigid tool chains with a fluid filesystem. <br className="hidden md:block" />
          Give your agents a shell, a directory, and the autonomy to evolve.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
          <button className="group px-8 py-3 rounded-lg font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-px flex items-center justify-center gap-2">
            <span>Request Invitation</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto text-left mb-32">
          
          {/* Left: Legacy */}
          <div className="relative group">
            <div className="absolute inset-0 bg-red-100 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative h-full bg-white backdrop-blur-xl border border-slate-200 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">The Old Way</span>
                <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100 font-medium">High Maintenance</span>
              </div>
              <div className="p-6">
                <p className="text-sm text-slate-500 mb-4">Defining static JSON schemas that break whenever the API changes.</p>
                
                {/* Code Window */}
                <div className="bg-slate-900 rounded-lg border border-slate-700/50 shadow-2xl overflow-hidden font-mono text-xs md:text-sm text-slate-300">
                  <div className="flex items-center px-4 py-3 bg-slate-800/50 border-b border-white/5">
                    <div className="flex gap-2 mr-4">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                    </div>
                    <span className="text-slate-500">config.json</span>
                  </div>
                  <div className="p-4 overflow-x-auto whitespace-nowrap">
                    <div><span className="text-pink-400">const</span> agent = <span className="text-pink-400">new</span> Agent({`{`}</div>
                    <div className="pl-4"><span className="text-sky-300">"name"</span>: <span className="text-sky-300">"CalcBot"</span>,</div>
                    <div className="pl-4"><span className="text-sky-300">"tools"</span>: [</div>
                    <div className="pl-8">{`{`}</div>
                    <div className="pl-12"><span className="text-sky-300">"name"</span>: <span className="text-sky-300">"add"</span>,</div>
                    <div className="pl-12"><span className="text-sky-300">"schema"</span>: {`{`}</div>
                    <div className="pl-16"><span className="text-sky-300">"type"</span>: <span className="text-sky-300">"object"</span>,</div>
                    <div className="pl-16"><span className="text-slate-500 italic">// ... 200 lines of schema</span></div>
                    <div className="pl-12">{`}`}</div>
                    <div className="pl-8">{`}`}</div>
                    <div className="pl-4">]</div>
                    <div>{`}`});</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Funky */}
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-100 blur-xl rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative h-full bg-white backdrop-blur-xl border border-blue-200 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:border-blue-300 transition-all duration-300 shadow-lg shadow-blue-500/5">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-blue-50/30">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">The Funky Way</span>
                <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 font-medium">Native Execution</span>
              </div>
              <div className="p-6">
                <p className="text-sm text-slate-500 mb-4">A simple filesystem. Logic lives in the environment, not the config.</p>
                
                {/* Code Window */}
                <div className="bg-slate-900 rounded-lg border border-blue-500/30 shadow-2xl overflow-hidden font-mono text-xs md:text-sm text-slate-300">
                  <div className="flex items-center px-4 py-3 bg-slate-800/50 border-b border-white/5">
                    <div className="flex gap-2 mr-4">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                    </div>
                    <span className="text-slate-500">terminal</span>
                  </div>
                  <div className="p-4 overflow-x-auto whitespace-nowrap">
                    <div className="text-slate-500 italic mb-1"># The agent simply reads and runs</div>
                    <div><span className="text-blue-400">$</span> cat skills.md</div>
                    <div className="text-slate-400 mb-3">&gt; Use `python add.py` to calculate.</div>

                    <div><span className="text-blue-400">$</span> python add.py 3 5</div>
                    <div className="text-green-400 mb-3">&gt; 8</div>

                    <div className="text-slate-500 italic mb-1"># Agent modifies tool autonomously</div>
                    <div><span className="text-blue-400">$</span> echo "..." &gt; multiply.py</div>
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

export default Hero;
