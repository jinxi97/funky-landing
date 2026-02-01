import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions } from 'next-auth';

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!googleClientId || !googleClientSecret) {
  throw new Error('Missing Google OAuth environment variables.');
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret
    })
  ],
  secret: process.env.NEXTAUTH_SECRET
};
