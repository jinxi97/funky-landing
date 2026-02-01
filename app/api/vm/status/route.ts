import { NextRequest, NextResponse } from 'next/server';
import { fetchInstanceStatus, getGcpProjectId } from '../../../lib/gce';
import { ensureUserVmsTable, getUserVmByUserId } from '../../../lib/user-vms';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');
    let vmId = searchParams.get('vm_id');
    let zone = searchParams.get('zone');

    if (userId) {
      await ensureUserVmsTable();
      const mapping = await getUserVmByUserId(userId);
      if (!mapping) {
        return NextResponse.json(
          { ready: false, error: 'VM not found for user', status: 'NOT_FOUND' },
          { status: 404 }
        );
      }

      vmId = mapping.vmId;
      zone = mapping.zone;
    }

    if (!vmId || !zone) {
      return NextResponse.json(
        { error: 'vm_id and zone are required (or provide user_id)' },
        { status: 400 }
      );
    }

    const projectId = getGcpProjectId();
    const statusResult = await fetchInstanceStatus({ projectId, zone, vmId });

    if (statusResult.notFound) {
      return NextResponse.json(
        { ready: false, status: statusResult.status, vmId, zone },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ready: statusResult.status === 'RUNNING',
      status: statusResult.status,
      vmId,
      zone,
    });
  } catch (error) {
    console.error('Error fetching VM status:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error occurred' },
      { status: 500 }
    );
  }
}
