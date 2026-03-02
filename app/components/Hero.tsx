'use client';

import React, { useState } from 'react';
import { ArrowRight, Copy, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import posthog from 'posthog-js';

const PythonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 256 255" xmlns="http://www.w3.org/2000/svg">
    <path d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z" fill="#387EB8"/>
    <path d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z" fill="#FFE052"/>
  </svg>
);

const TSIcon = () => (
  <svg width="14" height="14" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="400" rx="50" fill="#3178C6"/>
    <path d="M87.7 200.7V217h52v148h36.9V217h52v-16c0-9 0-16.3-.4-16.5-.2-.3-31.7-.4-70-.4l-69.7.3v16.3zM321.4 184c10.2 2.4 18 7 25 14.3 3.7 4 9.2 11 9.6 12.8.1.5-17.3 12.3-27.8 18.9-.4.2-2-1.4-3.6-3.8-5.2-7.4-10.5-10.6-18.8-11.2-12.1-.8-20 5.5-19.9 16 0 3.1.5 4.9 1.8 7.4 2.8 5.6 7.9 9 23.1 15.9 28.6 12.3 40.9 20.4 48.5 32 8.5 13 10.4 33.6 4.7 49-6.3 16.5-22 27.7-44.1 31.4-6.8 1.2-23 1-30.3-.3-16-3-31.2-11-40.5-21.4-3.7-4.2-10.9-15.2-10.4-16 .2-.3 1.9-1.4 3.8-2.4l15.7-9 11.3-6.6 2.3 3.5c3.3 5 10.4 11.9 14.7 14.2 13 6.7 30.7 5.8 39.5-1.9 3.7-3.2 5.3-6.5 5.3-11.3 0-4.3-.6-6.3-3-9.5-3.1-4.1-9.4-7.5-27.1-15.4-20.4-8.8-29.2-14.3-37.5-23-4.7-5-9.1-13-11-20-1.5-5.7-2-19.5-.8-25.2 3.7-17.5 16.3-30.4 34.5-35.7 5.9-1.7 20.7-2.1 27.3-.6z" fill="white"/>
  </svg>
);

const Hero = () => {
  const router = useRouter();
  const [activeLanguage, setActiveLanguage] = useState<'python' | 'typescript'>('python');
  const [copied, setCopied] = useState(false);

  const handleRequestInvitation = () => {
    posthog.capture('cta_clicked', {
      cta_type: 'request_invitation',
      location: 'hero'
    });
    router.push('/request-invitation');
  };

  const installCommand = activeLanguage === 'python'
    ? 'pip install funky-sdk'
    : 'npm install @funkydev/sdk';

  const handleCopy = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          A persistent, pre-configured environment where AI agents work, store state, and fork tasks.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <button
            onClick={handleRequestInvitation}
            className="group px-8 py-3 rounded-lg font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-px flex items-center justify-center gap-2"
          >
            <span>Request Invitation</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Usage Example */}
        <div className="max-w-3xl mx-auto text-left mb-32">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-300 to-purple-300 rounded-xl blur opacity-20"></div>
            <div className="relative bg-slate-900 rounded-xl border border-slate-700/50 shadow-2xl overflow-hidden">

              {/* Tab Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center px-4 py-3 bg-slate-800/80 border-b border-slate-700/50 gap-2 sm:gap-1">

                {/* Traffic lights + Language Tabs */}
                <div className="flex items-center gap-1">
                  <div className="flex gap-1.5 mr-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                  </div>
                  <button
                    onClick={() => setActiveLanguage('python')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      activeLanguage === 'python'
                        ? 'bg-slate-700 text-white'
                        : 'text-slate-500 hover:text-slate-300 hover:bg-slate-700/50'
                    }`}
                  >
                    <PythonIcon />
                    Python
                  </button>
                  <button
                    onClick={() => setActiveLanguage('typescript')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      activeLanguage === 'typescript'
                        ? 'bg-slate-700 text-white'
                        : 'text-slate-500 hover:text-slate-300 hover:bg-slate-700/50'
                    }`}
                  >
                    <TSIcon />
                    TypeScript
                  </button>
                </div>

                {/* Install command — second row on mobile, ml-auto on sm+ */}
                <div className="sm:ml-auto flex items-center gap-2 bg-slate-700/40 border border-slate-600/40 px-3 py-1.5 rounded-md w-full sm:w-auto">
                  <span className="text-slate-500 font-mono text-xs">$</span>
                  <span className="text-slate-300 font-mono text-xs">{installCommand}</span>
                  <button
                    onClick={handleCopy}
                    className="ml-auto sm:ml-1 text-slate-500 hover:text-slate-300 transition-colors"
                    aria-label="Copy install command"
                  >
                    {copied
                      ? <Check size={12} className="text-green-400" />
                      : <Copy size={12} />
                    }
                  </button>
                </div>
              </div>

              {/* Code Content */}
              <div className="p-6 font-mono text-sm text-slate-300 leading-7 overflow-x-auto">
                <div className="whitespace-nowrap">
                {activeLanguage === 'python' ? (
                  <div>
                    <div>
                      <span className="text-pink-400">from</span>
                      {' '}<span className="text-sky-300">google.adk.agents</span>
                      {' '}<span className="text-pink-400">import</span>
                      {' '}<span className="text-white">Agent</span>
                    </div>
                    <div>
                      <span className="text-pink-400">from</span>
                      {' '}<span className="text-sky-300">funky</span>
                      {' '}<span className="text-pink-400">import</span>
                      {' '}<span className="text-white">Workspace</span>
                    </div>

                    <div className="mt-5">
                      <span className="text-slate-500"># Initialize your workspace</span>
                    </div>
                    <div>
                      <span className="text-white">ws</span>
                      {' '}<span className="text-slate-400">=</span>
                      {' '}<span className="text-sky-300">Workspace</span>
                      <span className="text-slate-400">.</span>
                      <span className="text-amber-300">create</span>
                      <span className="text-slate-400">()</span>
                    </div>

                    <div className="mt-5">
                      <span className="text-slate-500"># Define the tool using your simple API</span>
                    </div>
                    <div>
                      <span className="text-pink-400">def</span>
                      {' '}<span className="text-amber-300">run_shell_cmd</span>
                      <span className="text-slate-400">(</span>
                      <span className="text-orange-300">command</span>
                      <span className="text-slate-400">: </span>
                      <span className="text-sky-300">str</span>
                      <span className="text-slate-400">):</span>
                    </div>
                    <div className="pl-8">
                      <span className="text-green-400">{"'"}{"'"}{"'"}Executes bash commands in the Funky workspace.{"'"}{"'"}{"'"}</span>
                    </div>
                    <div className="pl-8">
                      <span className="text-white">result</span>
                      {' '}<span className="text-slate-400">=</span>
                      {' '}<span className="text-white">ws</span>
                      <span className="text-slate-400">.</span>
                      <span className="text-amber-300">execute</span>
                      <span className="text-slate-400">(</span>
                      <span className="text-white">command</span>
                      <span className="text-slate-400">)</span>
                    </div>
                    <div className="pl-8">
                      <span className="text-pink-400">return</span>
                      {' '}<span className="text-white">result</span>
                      <span className="text-slate-400">.</span>
                      <span className="text-sky-300">stdout</span>
                    </div>

                    <div className="mt-5">
                      <span className="text-slate-500"># Attach to Agent</span>
                    </div>
                    <div>
                      <span className="text-white">agent</span>
                      {' '}<span className="text-slate-400">=</span>
                      {' '}<span className="text-sky-300">Agent</span>
                      <span className="text-slate-400">(</span>
                      <span className="text-orange-300">tools</span>
                      <span className="text-slate-400">=[</span>
                      <span className="text-white">run_shell_cmd</span>
                      <span className="text-slate-400">])</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div>
                      <span className="text-pink-400">import</span>
                      {' '}<span className="text-slate-400">{'{ '}</span>
                      <span className="text-white">Agent</span>
                      <span className="text-slate-400">{' }'}</span>
                      {' '}<span className="text-pink-400">from</span>
                      {' '}<span className="text-green-400">'@google-adk/agents'</span>
                      <span className="text-slate-400">;</span>
                    </div>
                    <div>
                      <span className="text-pink-400">import</span>
                      {' '}<span className="text-slate-400">{'{ '}</span>
                      <span className="text-white">Workspace</span>
                      <span className="text-slate-400">{' }'}</span>
                      {' '}<span className="text-pink-400">from</span>
                      {' '}<span className="text-green-400">'@funkydev/sdk'</span>
                      <span className="text-slate-400">;</span>
                    </div>

                    <div className="mt-5">
                      <span className="text-slate-500">// Initialize your workspace</span>
                    </div>
                    <div>
                      <span className="text-pink-400">const</span>
                      {' '}<span className="text-white">ws</span>
                      {' '}<span className="text-slate-400">=</span>
                      {' '}<span className="text-pink-400">await</span>
                      {' '}<span className="text-sky-300">Workspace</span>
                      <span className="text-slate-400">.</span>
                      <span className="text-amber-300">create</span>
                      <span className="text-slate-400">();</span>
                    </div>

                    <div className="mt-5">
                      <span className="text-slate-500">// Define the tool using your simple API</span>
                    </div>
                    <div>
                      <span className="text-pink-400">async function</span>
                      {' '}<span className="text-amber-300">runShellCmd</span>
                      <span className="text-slate-400">(</span>
                      <span className="text-orange-300">command</span>
                      <span className="text-slate-400">: </span>
                      <span className="text-sky-300">string</span>
                      <span className="text-slate-400">): </span>
                      <span className="text-sky-300">Promise</span>
                      <span className="text-slate-400">{'<'}</span>
                      <span className="text-sky-300">string</span>
                      <span className="text-slate-400">{'>'} {'{'}</span>
                    </div>
                    <div className="pl-8">
                      <span className="text-slate-500">{'/** Executes bash commands in the Funky workspace. */'}</span>
                    </div>
                    <div className="pl-8">
                      <span className="text-pink-400">const</span>
                      {' '}<span className="text-white">result</span>
                      {' '}<span className="text-slate-400">=</span>
                      {' '}<span className="text-pink-400">await</span>
                      {' '}<span className="text-white">ws</span>
                      <span className="text-slate-400">.</span>
                      <span className="text-amber-300">execute</span>
                      <span className="text-slate-400">(</span>
                      <span className="text-white">command</span>
                      <span className="text-slate-400">);</span>
                    </div>
                    <div className="pl-8">
                      <span className="text-pink-400">return</span>
                      {' '}<span className="text-white">result</span>
                      <span className="text-slate-400">.</span>
                      <span className="text-sky-300">stdout</span>
                      <span className="text-slate-400">;</span>
                    </div>
                    <div>
                      <span className="text-slate-400">{'}'}</span>
                    </div>

                    <div className="mt-5">
                      <span className="text-slate-500">// Attach to Agent</span>
                    </div>
                    <div>
                      <span className="text-pink-400">const</span>
                      {' '}<span className="text-white">agent</span>
                      {' '}<span className="text-slate-400">=</span>
                      {' '}<span className="text-pink-400">new</span>
                      {' '}<span className="text-sky-300">Agent</span>
                      <span className="text-slate-400">{'({ '}</span>
                      <span className="text-orange-300">tools</span>
                      <span className="text-slate-400">: [</span>
                      <span className="text-white">runShellCmd</span>
                      <span className="text-slate-400">{'] });'}</span>
                    </div>
                  </div>
                )}
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
