'use server';

import pg from 'pg';
import { AuthTypes, Connector } from '@google-cloud/cloud-sql-connector';
import { GoogleAuth } from 'google-auth-library';

const auth = new GoogleAuth();
const { Pool } = pg;

let pool: pg.Pool | null = null;

async function getPool() {
  if (pool) {
    return pool;
  }

  const projectId = await auth.getProjectId();
  const connector = new Connector();
  
  // Get the instance connection name from environment variable or construct it
  const instanceConnectionName = process.env.INSTANCE_CONNECTION_NAME || 
    `${projectId}:us-central1:quickstart-instance`;
  
  const serviceAccountEmail = process.env.SERVICE_ACCOUNT_EMAIL ||
    `quickstart-service-account@${projectId}.iam`;
  
  const databaseName = process.env.DATABASE_NAME || 'quickstart_db';

  const clientOpts = await connector.getOptions({
    instanceConnectionName,
    authType: AuthTypes.IAM,
  });

  pool = new Pool({
    ...clientOpts,
    user: serviceAccountEmail,
    database: databaseName,
  });

  return pool;
}

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
