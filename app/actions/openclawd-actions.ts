'use server';

import { getPool } from '../lib/db';

const ensureTableExists = async () => {
  const poolInstance = await getPool();
  await poolInstance.query(`
    CREATE TABLE IF NOT EXISTS openclawd (
      email VARCHAR(255) PRIMARY KEY,
      full_name VARCHAR(150) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

export interface OpenClawdUser {
  email: string;
  fullName: string;
}

export async function upsertOpenClawdUser(data: OpenClawdUser) {
  try {
    await ensureTableExists();
    const poolInstance = await getPool();

    await poolInstance.query(
      `INSERT INTO openclawd(email, full_name)
       VALUES($1, $2)
       ON CONFLICT (email) DO UPDATE
       SET full_name = EXCLUDED.full_name`,
      [data.email, data.fullName]
    );

    return { success: true };
  } catch (error) {
    console.error('Error saving OpenClawd user:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}
