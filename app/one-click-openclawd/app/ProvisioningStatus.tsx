'use client';

import { useEffect, useMemo, useState } from 'react';

type VmResult = {
  success: boolean;
  vmId?: string;
  zone?: string;
  status?: string;
  error?: string;
};

interface ProvisioningStatusProps {
  userId: string;
  initialResult: VmResult;
}

export default function ProvisioningStatus({
  userId,
  initialResult,
}: ProvisioningStatusProps) {
  const [pollStatus, setPollStatus] = useState<string | null>(null);
  const [pollError, setPollError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialResult?.success || !initialResult.vmId || !initialResult.zone) {
      return;
    }

    let isMounted = true;
    const interval = setInterval(async () => {
      try {
        const response = await fetch(
          `/api/vm/status?user_id=${encodeURIComponent(userId)}`
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
  }, [initialResult, userId]);

  const progress = useMemo(() => {
    const status = (pollStatus ?? initialResult?.status ?? '').toUpperCase();
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
    if (initialResult?.success) {
      return 20;
    }
    return 0;
  }, [pollStatus, initialResult]);

  if (!initialResult?.success) {
    return (
      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
        <p className="font-medium text-slate-900">Workspace provisioning failed</p>
        <p className="mt-1">{initialResult?.error ?? 'Unknown error'}</p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
      <div className="flex items-center justify-between text-xs text-slate-600">
        <span>VM status: {pollStatus ?? initialResult.status ?? 'UNKNOWN'}</span>
        <span>{progress}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-200">
        <div
          className="h-2 rounded-full bg-slate-900 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      {pollError && <p className="text-xs text-red-600">{pollError}</p>}
      {initialResult.vmId && <p className="text-xs text-slate-500">VM ID: {initialResult.vmId}</p>}
    </div>
  );
}
