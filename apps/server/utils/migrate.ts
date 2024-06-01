import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { migrationClient } from '../src/db';
import { drizzle } from 'drizzle-orm/postgres-js';

const runMigration = async () => {
  const db = drizzle(migrationClient);
  await migrate(db, { migrationsFolder: 'drizzle' });

  await migrationClient.end();
};

runMigration();
