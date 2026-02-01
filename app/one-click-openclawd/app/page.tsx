import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { upsertOpenClawdUser } from '@/app/actions/openclawd-actions';
import { authOptions } from '@/app/lib/auth';

export default async function OneClickOpenClawdAppPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email || !session.user.name) {
    redirect('/one-click-openclawd/sign-up');
  }

  await upsertOpenClawdUser({
    email: session.user.email,
    fullName: session.user.name
  });

  return (
    <main className="min-h-screen bg-white px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-medium text-slate-500">One-click OpenClawd</p>
        <h1 className="mt-3 text-3xl font-semibold">
          Welcome, {session.user.name}.
        </h1>
        <p className="mt-4 text-base text-slate-600">
          Your OpenClawd workspace is ready. More controls will appear here next.
        </p>
      </div>
    </main>
  );
}
