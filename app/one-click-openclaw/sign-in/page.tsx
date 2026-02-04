import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { getOpenClawdUserByEmail, upsertOpenClawdUser } from '@/app/actions/openclaw-actions';
import { authOptions } from '@/app/lib/auth';
import SignInPanel from '@/app/one-click-openclaw/sign-in/SignInPanel';

async function completeSignup() {
  'use server';

  const session = await getServerSession(authOptions);
  if (!session?.user?.email || !session.user.name) {
    redirect('/one-click-openclaw/sign-in');
  }

  await upsertOpenClawdUser({
    email: session.user.email,
    fullName: session.user.name
  });

  redirect('/one-click-openclaw/app');
}

export default async function OneClickOpenClawdSignInPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email || !session.user.name) {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
        <SignInPanel />
      </div>
    );
  }

  const existingUser = await getOpenClawdUserByEmail(session.user.email);

  if (existingUser) {
    redirect('/one-click-openclaw/app');
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <div className="fixed inset-0 z-0 bg-black/40" />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-xl">
          <h1 className="text-xl font-semibold">No account found</h1>
          <p className="mt-2 text-sm text-slate-600">
            We couldn’t find an OpenClaw account for {session.user.email}. Would you like to sign
            up with Google?
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <form action={completeSignup}>
              <button
                type="submit"
                className="w-full rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Sign up with Google
              </button>
            </form>
            <a
              href="/one-click-openclaw"
              className="w-full rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Not now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
