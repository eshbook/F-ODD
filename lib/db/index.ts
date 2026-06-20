import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn('DATABASE_URL environment variable is not set. Database connections will fail.');
}

// Create a single connection pool
export const poolConnection = mysql.createPool(connectionString || '');

export const db = drizzle(poolConnection, { schema, mode: 'default' });
