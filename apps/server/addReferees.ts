import { db } from './src/db';
import { referees } from './src/db/schema';
import readXlsxFile from 'read-excel-file/node';

readXlsxFile('./2025_L1ON_referees.xlsx').then(async (rows) => {
  const matchOfficials = rows.map((referee) => ({
    id: referee[6] as number,
    email: referee[5] as string,
  }));

  const addedReferees = await db
    .insert(referees)
    .values(matchOfficials)
    .returning();

  console.log('These referees were added to the db:', addedReferees);
});
