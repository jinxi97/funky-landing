import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/lib/auth';
import { getGcpProjectId, fetchInstancePublicIp } from '@/app/lib/gce';
import { ensureUserVmsTable, getUserVmByUserId } from '@/app/lib/user-vms';

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    if (!userEmail) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const jwtSecret = process.env.JWT_SECRET;
    const gatewayUrl = process.env.NEXT_PUBLIC_GATEWAY_URL;

    if (!jwtSecret || !gatewayUrl) {
      return NextResponse.json(
        { error: 'JWT_SECRET and NEXT_PUBLIC_GATEWAY_URL must be set' },
        { status: 500 }
      );
    }

    await ensureUserVmsTable();
    const mapping = await getUserVmByUserId(userEmail);
    if (!mapping) {
      return NextResponse.json(
        { error: 'No VM mapping found for user.' },
        { status: 404 }
      );
    }

    const projectId = getGcpProjectId();
    const publicIp = await fetchInstancePublicIp({
      projectId,
      zone: mapping.zone,
      vmId: mapping.vmId,
    });

    if (!publicIp) {
      return NextResponse.json(
        { error: 'VM does not have a public IP yet.' },
        { status: 409 }
      );
    }

    const payload = { targetIp: publicIp, username: 'claw' };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1m' });

    return NextResponse.json({ url: `${gatewayUrl}?token=${token}` });
  } catch (error) {
    console.error('Error creating VM connect token:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error occurred' },
      { status: 500 }
    );
  }
}
