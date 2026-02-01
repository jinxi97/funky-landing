import { getPool } from './db';

export interface UserVmMapping {
  userId: string;
  vmId: string;
  zone: string;
}

export async function ensureUserVmsTable() {
  const pool = await getPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS user_vms (
      user_id VARCHAR(255) PRIMARY KEY,
      vm_id VARCHAR(255) UNIQUE NOT NULL,
      zone VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export async function getUserVmByUserId(userId: string): Promise<UserVmMapping | null> {
  const pool = await getPool();
  const { rows } = await pool.query(
    `SELECT user_id, vm_id, zone FROM user_vms WHERE user_id = $1 LIMIT 1`,
    [userId]
  );

  if (!rows.length) {
    return null;
  }

  return {
    userId: rows[0].user_id,
    vmId: rows[0].vm_id,
    zone: rows[0].zone,
  };
}

export async function upsertUserVmMapping(mapping: UserVmMapping) {
  const pool = await getPool();
  await pool.query(
    `INSERT INTO user_vms (user_id, vm_id, zone)
     VALUES ($1, $2, $3)
     ON CONFLICT (user_id) DO UPDATE
     SET vm_id = EXCLUDED.vm_id,
         zone = EXCLUDED.zone`,
    [mapping.userId, mapping.vmId, mapping.zone]
  );
}
