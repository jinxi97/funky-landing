'use server';

import crypto from 'crypto';
import { createInstance, fetchInstanceStatus, getGceDefaults, getGcpProjectId } from '../lib/gce';
import { ensureUserVmsTable, getUserVmByUserId, upsertUserVmMapping } from '../lib/user-vms';

function buildInstanceName(userId: string) {
  const normalized = userId
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  const prefix = normalized.length ? normalized.slice(0, 30) : 'user';
  const hash = crypto.createHash('sha1').update(userId).digest('hex').slice(0, 8);
  const baseName = `vm-${prefix}-${hash}`.toLowerCase();
  const trimmed = baseName.slice(0, 63);

  return trimmed.endsWith('-') ? trimmed.slice(0, -1) : trimmed;
}

export async function createOrGetUserVm(userId: string) {
  if (!userId || !userId.trim()) {
    return { success: false, error: 'userId is required' };
  }

  try {
    await ensureUserVmsTable();

    const existing = await getUserVmByUserId(userId);
    const projectId = getGcpProjectId();

    if (existing) {
      const statusResult = await fetchInstanceStatus({
        projectId,
        zone: existing.zone,
        vmId: existing.vmId,
      });

      return {
        success: true,
        vmId: existing.vmId,
        zone: existing.zone,
        status: statusResult.status,
      };
    }

    const defaults = getGceDefaults();
    const vmId = buildInstanceName(userId);

    await createInstance({
      name: vmId,
      projectId,
      zone: defaults.zone,
      machineType: defaults.machineType,
      image: defaults.image,
    });

    await upsertUserVmMapping({
      userId,
      vmId,
      zone: defaults.zone,
    });

    return {
      success: true,
      vmId,
      zone: defaults.zone,
      status: 'PROVISIONING',
    };
  } catch (error) {
    console.error('Error creating VM:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
