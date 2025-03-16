import { eq, or } from 'drizzle-orm';
import { db } from '../src/db';
import { contacts, matchCommissioners } from '../src/db/schema';

export const getContacts = async (
  homeTeamId: number,
  awayTeamId: number,
  mdocId: number,
  cometSupportName: string,
) => {
  const cometPeople = await db
    .select()
    .from(matchCommissioners)
    .where(
      or(
        eq(matchCommissioners.id, mdocId),
        eq(matchCommissioners.name, cometSupportName),
      ),
    );

  const mdoc = cometPeople.find((person) => person.id === mdocId);

  const cometSupport = cometPeople.find(
    (person) => person.name === cometSupportName,
  );

  const teamContacts = await db
    .select()
    .from(contacts)
    .where(
      or(eq(contacts.teamId, homeTeamId), eq(contacts.teamId, awayTeamId)),
    );

  const gameDayManager = teamContacts.find(
    (contact) => contact.contactRoleId === 1 && contact.teamId === homeTeamId,
  );

  const homeTeamContact = teamContacts.find(
    (contact) => contact.contactRoleId === 2 && contact.teamId === homeTeamId,
  );

  const awayTeamContact = teamContacts.find(
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
      role: 'COMET Support',
      name: cometSupport?.name || '',
      phoneNumber: cometSupport?.phoneNumber || '',
      emailAddress: cometSupport?.email || '',
    },
  };
};
