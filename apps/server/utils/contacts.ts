import { eq, or } from 'drizzle-orm';
import { db } from '../src/db';
import { people } from '../src/db/schema';

export const getContacts = async (
  homeTeamId: number,
  awayTeamId: number,
  mdocId: number | undefined,
  cometSupportName: string,
  isLeagueHosted: boolean,
) => {
  const cometPeople = await db
    .select()
    .from(people)
    .where(
      or(
        eq(people.cometId, mdocId || 0),
        eq(people.name, cometSupportName),
        eq(people.teamId, homeTeamId),
        eq(people.teamId, awayTeamId),
        eq(people.name, 'Jonathan Cheng'),
      ),
    );

  const mdoc = cometPeople.find((person) => person.cometId === mdocId);

  const cometSupport = cometPeople.find(
    (person) => person.name === cometSupportName,
  );

  const gameDayManager = isLeagueHosted
    ? cometPeople.find((contact) => contact.name === 'Jonathan Cheng')
    : cometPeople.find(
        (contact) =>
          contact.contactRoleId === 1 && contact.teamId === homeTeamId,
      );

  const homeTeamContact = cometPeople.find(
    (contact) => contact.contactRoleId === 2 && contact.teamId === homeTeamId,
  );

  const awayTeamContact = cometPeople.find(
    (contact) => contact.contactRoleId === 2 && contact.teamId === awayTeamId,
  );

  return {
    gameDayManager: {
      role: 'Game Day Manager',
      name: gameDayManager?.name || '',
      phoneNumber: gameDayManager?.phoneNumber || '',
      emailAddress: gameDayManager?.email || '',
    },
    homeTeamContact: {
      role: 'Home Team Contact',
      name: homeTeamContact?.name || '',
      phoneNumber: homeTeamContact?.phoneNumber || '',
      emailAddress: homeTeamContact?.email || '',
    },
    awayTeamContact: {
      role: 'Away Team Contact',
      name: awayTeamContact?.name || '',
      phoneNumber: awayTeamContact?.phoneNumber || '',
      emailAddress: awayTeamContact?.email || '',
    },
    mdoc: {
      role: 'Match Day Coordinator',
      name: mdoc?.name || '',
      phoneNumber: mdoc?.phoneNumber || '',
      emailAddress: mdoc?.email || '',
    },
    cometSupport: {
      role: 'MDOC/COMET Support',
      name: cometSupport?.name || '',
      phoneNumber: cometSupport?.phoneNumber || '',
      emailAddress: cometSupport?.email || '',
    },
  };
};
