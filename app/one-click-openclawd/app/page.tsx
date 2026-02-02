import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { upsertOpenClawdUser } from '@/app/actions/openclawd-actions';
import { createOrGetUserVm } from '@/app/actions/vm-actions';
import { authOptions } from '@/app/lib/auth';
import ProvisioningStatus from '@/app/one-click-openclawd/app/ProvisioningStatus';
import SignOutButton from '@/app/one-click-openclawd/app/SignOutButton';
import TerminalBox from '@/app/one-click-openclawd/app/TerminalBox';

export default async function OneClickOpenClawdAppPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email || !session.user.name) {
    redirect('/one-click-openclawd/sign-up');
  }

  await upsertOpenClawdUser({
    email: session.user.email,
    fullName: session.user.name
  });

  const vmResult = await createOrGetUserVm(session.user.email);

  return (
    <main className="min-h-screen bg-white px-6 py-10 text-slate-900">
      <div className="mx-auto flex max-w-3xl items-center justify-end">
        <SignOutButton />
      </div>
      <div className="mx-auto mt-10 max-w-3xl">
        <p className="text-sm font-medium text-slate-500">One-click OpenClawd</p>
        <h1 className="mt-3 text-3xl font-semibold">
          Welcome, {session.user.name}.
        </h1>
        <p className="mt-4 text-base text-slate-600">
          Your OpenClawd workspace is ready. More controls will appear here next.
        </p>
        <ProvisioningStatus userId={session.user.email} initialResult={vmResult} />
        <TerminalBox />
      </div>
    </main>
  );
}
