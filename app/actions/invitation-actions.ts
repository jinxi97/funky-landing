'use server';

import { getPool } from '../lib/db';

const ensureTableExists = async () => {
  const poolInstance = await getPool();
  await poolInstance.query(`
    CREATE TABLE IF NOT EXISTS invitation_requests (
      email VARCHAR(255) PRIMARY KEY,
      full_name VARCHAR(100) NOT NULL,
      referral_source TEXT,
      requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

export interface InvitationRequest {
  email: string;
  fullName: string;
  referralSource: string;
}

export async function saveInvitationRequest(data: InvitationRequest) {
  try {
    await ensureTableExists();
    const poolInstance = await getPool();
    
    await poolInstance.query(
      `INSERT INTO invitation_requests(email, full_name, referral_source) 
       VALUES($1, $2, $3)
       ON CONFLICT (email) DO UPDATE 
       SET full_name = EXCLUDED.full_name,
           referral_source = EXCLUDED.referral_source,
           requested_at = CURRENT_TIMESTAMP`,
      [data.email, data.fullName, data.referralSource]
    );

    return { success: true };
  } catch (error) {
    console.error('Error saving invitation request:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}

export async function getInvitationRequests() {
  try {
    await ensureTableExists();
    const poolInstance = await getPool();
    
    const { rows } = await poolInstance.query(
      `SELECT email, full_name, referral_source, requested_at 
       FROM invitation_requests 
       ORDER BY requested_at DESC 
       LIMIT 100`
    );

    return { success: true, data: rows };
  } catch (error) {
    console.error('Error fetching invitation requests:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      data: []
    };
  }
}
