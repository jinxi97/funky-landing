import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { upsertOpenClawdUser } from '@/app/actions/openclaw-actions';
import { manageSubscription } from '@/app/actions/subscription-actions';
import { createOrGetUserVm } from '@/app/actions/vm-actions';
import { authOptions } from '@/app/lib/auth';
import { getPool } from '@/app/lib/db';
import SignOutButton from '@/app/one-click-openclaw/app/SignOutButton';
import WorkspacePanel from '@/app/one-click-openclaw/app/WorkspacePanel';

export default async function OneClickOpenClawdAppPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email || !session.user.name) {
    redirect('/one-click-openclaw/sign-up');
  }

  await upsertOpenClawdUser({
    email: session.user.email,
    fullName: session.user.name
  });

  const vmResult = await createOrGetUserVm(session.user.email);
  const pool = await getPool();
  const { rows: subscriptionRows } = await pool.query(
    `SELECT subscribed, expired_at
     FROM user_subscriptions
     WHERE email = $1
     LIMIT 1`,
    [session.user.email]
  );
  const subscriptionRow = subscriptionRows[0];
  const isSubscribed = Boolean(subscriptionRow?.subscribed);
  const expiredAt = subscriptionRow?.expired_at
    ? new Date(subscriptionRow.expired_at)
    : null;
  const daysRemaining = expiredAt
    ? Math.max(
        0,
        Math.ceil(
          (expiredAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        )
      )
    : null;

  return (
    <main className="min-h-screen bg-white px-6 py-10 text-slate-900">
      <div className="mx-auto flex max-w-3xl items-start justify-end gap-3">
        <a
          href="https://discord.gg/uuYSaAUZc9"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Customer support
        </a>
        <div className="flex flex-col items-end">
          <form action={manageSubscription}>
            <button
              type="submit"
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Manage subscription
            </button>
          </form>
          {!isSubscribed && daysRemaining !== null ? (
            <span className="mt-1 text-xs font-medium text-red-600">
              Subscription ends in {daysRemaining} days
            </span>
          ) : null}
        </div>
        <SignOutButton />
      </div>
      <div className="mx-auto mt-10 max-w-3xl">
        <p className="text-sm font-medium text-slate-500">One-click OpenClaw</p>
        <h1 className="mt-3 text-3xl font-semibold">
          Welcome, {session.user.name}.
        </h1>
        <p className="mt-4 text-base text-slate-600">
          Your OpenClaw workspace is ready. More controls will appear here next.
        </p>
        <WorkspacePanel userId={session.user.email} initialResult={vmResult} />
      </div>
    </main>
  );
}
