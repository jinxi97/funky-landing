'use client';

import { signOut } from 'next-auth/react';
import { useState } from 'react';

export default function SignOutButton() {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut({ callbackUrl: '/one-click-openclaw' });
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isSigningOut}
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isSigningOut && (
        <span
          aria-hidden="true"
          className="h-3 w-3 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700"
        />
      )}
      {isSigningOut ? 'Signing out...' : 'Sign out'}
    </button>
  );
}
