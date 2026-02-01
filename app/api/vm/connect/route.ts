import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST() {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    const gatewayUrl = process.env.NEXT_PUBLIC_GATEWAY_URL;

    if (!jwtSecret || !gatewayUrl) {
      return NextResponse.json(
        { error: 'JWT_SECRET and NEXT_PUBLIC_GATEWAY_URL must be set' },
        { status: 500 }
      );
    }

    const payload = { targetIp: '34.57.44.79', username: 'claw' };
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
