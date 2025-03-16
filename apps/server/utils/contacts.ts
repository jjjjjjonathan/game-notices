import { eq, or } from 'drizzle-orm';
import { db } from '../src/db';
import { contacts, matchCommissioners } from '../src/db/schema';
const names = ['Jonathan Cheng', 'Dino Rossi', 'Chris Keem', 'Lorin Berballa'];

const emails = [
  'test1@league1.ca',
  'test2@league1.ca',
  'test3@league1.ca',
  'test4@league1.ca',
];

export const getContacts = async (
  homeTeamId: number,
  awayTeamId: number,
  mdocId: number,
) => {
  const [mdoc] = await db
    .select({
      name: matchCommissioners.name,
      email: matchCommissioners.email,
      phone: matchCommissioners.phoneNumber,
    })
    .from(matchCommissioners)
    .where(eq(matchCommissioners.id, mdocId));

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
      name: mdoc.name || '',
      phoneNumber: mdoc.phone || '',
      emailAddress: mdoc.email || '',
    },
    cometSupport: {
      role: 'COMET Support',
      name: names[Math.floor(Math.random() * names.length)] || '',
      phoneNumber: '(123) 456-7890',
      emailAddress: emails[Math.floor(Math.random() * emails.length)] || '',
    },
  };
};
