'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { createOrGetUserVm } from '../actions/vm-actions';

export default function OpenClawdPage() {
  const [userId, setUserId] = useState('');
  const [result, setResult] = useState<{
    success: boolean;
    vmId?: string;
    zone?: string;
    status?: string;
    error?: string;
  } | null>(null);
  const [pollStatus, setPollStatus] = useState<string | null>(null);
  const [pollError, setPollError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleTest = () => {
    setResult(null);
    setPollStatus(null);
    setPollError(null);
    startTransition(async () => {
      const response = await createOrGetUserVm(userId.trim());
      setResult(response);
    });
  };

  useEffect(() => {
    if (!result?.success || !result.vmId || !result.zone) {
      return;
    }

    let isMounted = true;
    const interval = setInterval(async () => {
      try {
        const response = await fetch(
          `/api/vm/status?user_id=${encodeURIComponent(userId.trim())}`
        );
        const data = await response.json();
        if (!isMounted) {
          return;
        }
        if (response.ok) {
          setPollStatus(data.status ?? 'UNKNOWN');
          setPollError(null);
          if (data.ready) {
            clearInterval(interval);
          }
        } else {
          setPollStatus(data.status ?? 'ERROR');
          setPollError(data.error ?? 'Unable to fetch status');
        }
      } catch (error) {
        if (isMounted) {
          setPollError(error instanceof Error ? error.message : 'Unable to fetch status');
        }
      }
    }, 4000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [result, userId]);

  const progress = useMemo(() => {
    const status = (pollStatus ?? result?.status ?? '').toUpperCase();
    if (status === 'RUNNING') {
      return 100;
    }
    if (status === 'PROVISIONING') {
      return 30;
    }
    if (status === 'STAGING') {
      return 60;
    }
    if (status === 'NOT_FOUND') {
      return 0;
    }
    if (result?.success) {
      return 20;
    }
    return 0;
  }, [pollStatus, result]);

  return (
    <main className="min-h-screen bg-white px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">VM Provisioning Test</h1>
          <p className="mt-2 text-sm text-slate-600">
            Enter a user ID to create or reuse a GCE VM for that user.
          </p>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700" htmlFor="user-id">
            User ID
          </label>
          <input
            id="user-id"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
            placeholder="user-123"
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
          />
        </div>

        <button
          type="button"
          onClick={handleTest}
          disabled={!userId.trim() || isPending}
          className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isPending ? 'Creating VM...' : 'Test createOrGetUserVm'}
        </button>

        {result?.success && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>VM status: {pollStatus ?? result.status ?? 'UNKNOWN'}</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-200">
              <div
                className="h-2 rounded-full bg-slate-900 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            {pollError && <p className="text-xs text-red-600">{pollError}</p>}
          </div>
        )}

        {result && (
          <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm">
            <div className="font-medium text-slate-800">
              {result.success ? 'Success' : 'Failed'}
            </div>
            <pre className="mt-2 whitespace-pre-wrap text-slate-700">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
