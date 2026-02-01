'use client';

import { signIn } from 'next-auth/react';

export default function OneClickOpenClawdSignUpPage() {
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
        <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-6 py-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-600">
            One-click OpenClawd
          </div>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Create your OpenClawd account
          </h1>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Continue with Google to provision your secure, isolated workspace.
          </p>

          <button
            type="button"
            onClick={() => signIn('google', { callbackUrl: '/one-click-openclawd/app' })}
            className="mt-8 inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Continue with Google
          </button>

          <p className="mt-4 text-xs text-slate-500">
            We only support Google sign-in for now.
          </p>
        </div>
      </main>
    </div>
  );
}
