import pg from 'pg';
import { Connector } from '@google-cloud/cloud-sql-connector';

const { Pool } = pg;

let pool: pg.Pool | null = null;
let connector: Connector | null = null;

export async function getPool() {
  if (pool) {
    return pool;
  }

  const instanceConnectionName = process.env.INSTANCE_CONNECTION_NAME;
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASSWORD;
  const dbName = process.env.DB_NAME;

  if (!instanceConnectionName || !dbUser || !dbPassword) {
    throw new Error('Missing required database configuration. Please check your .env.local file.');
  }

  connector = connector ?? new Connector();

  const clientOpts = await connector.getOptions({
    instanceConnectionName,
  });

  pool = new Pool({
    ...clientOpts,
    user: dbUser,
    password: dbPassword,
    database: dbName,
  });

  return pool;
}
