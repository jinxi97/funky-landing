'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function SignInPanel() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    await signIn('google', { callbackUrl: '/one-click-openclawd/sign-in' });
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-600">
        One-click OpenClawd
      </div>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Sign in</h1>
      <p className="mt-3 text-sm text-slate-600 sm:text-base">
        Continue with Google to access your OpenClawd workspace.
      </p>
      <button
        type="button"
        onClick={handleSignIn}
        disabled={isLoading}
        className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading && (
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700"
          />
        )}
        {isLoading ? 'Connecting...' : 'Continue with Google'}
      </button>
    </div>
  );
}
