import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

const dbUrl = process.env.DB_URL || '';

// for migrations
export const migrationClient = postgres(dbUrl, { max: 1 });

// for query purposes
const queryClient = postgres(dbUrl);
export const db = drizzle(queryClient, { logger: true });
