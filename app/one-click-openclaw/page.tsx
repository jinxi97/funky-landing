'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function OneClickOpenClawdLandingPage() {
  const router = useRouter();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignInClick = () => {
    setIsSigningIn(true);
    router.push('/one-click-openclaw/sign-in');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundSize: '40px 40px',
          backgroundImage:
            'linear-gradient(to right, #f1f5f9 1px, transparent 1px), linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)',
          maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
        }}
      />

      <div
        className="fixed top-[-400px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full pointer-events-none z-0 blur-[80px]"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(255,255,255,0) 70%)'
        }}
      />
      <div
        className="fixed top-[200px] -right-[300px] w-[800px] h-[800px] rounded-full pointer-events-none z-0 blur-[80px]"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, rgba(255,255,255,0) 70%)'
        }}
      />

      <main className="relative z-10">
        <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
          <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-600">
            One-click OpenClaw
            <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold text-emerald-700">
              New
            </span>
          </div>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Launch OpenClaw in a secure, isolated environment.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
            Provision your OpenClaw remotely with a single click. We spin up a private workspace
            that keeps your data isolated, your sessions secure, and your setup effortless.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/one-click-openclaw/sign-up"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
            >
              Get Started
            </Link>
            <button
              type="button"
              onClick={handleSignInClick}
              disabled={isSigningIn}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSigningIn && (
                <span
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700"
                />
              )}
              {isSigningIn ? 'Opening...' : 'Sign In'}
            </button>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Buttons are placeholders while we finish the flow.
          </p>

          <div className="mt-12 grid w-full max-w-3xl gap-6 text-left sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold">Isolated workspace</h3>
              <p className="mt-2 text-sm text-slate-600">
                Each OpenClaw runs in a dedicated environment to keep your data separate.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold">Secure by default</h3>
              <p className="mt-2 text-sm text-slate-600">
                Encrypted connections and locked-down access protect your sessions end to end.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold">Remote, ready fast</h3>
              <p className="mt-2 text-sm text-slate-600">
                Provision a fresh OpenClaw in minutes without managing infrastructure.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
