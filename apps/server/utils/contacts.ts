const names = ['Jonathan Cheng', 'Dino Rossi', 'Chris Keem', 'Lorin Berballa'];

const emails = [
  'test1@league1.ca',
  'test2@league1.ca',
  'test3@league1.ca',
  'test4@league1.ca',
];

export const getContacts = (_matchId: number) => {
  return {
    gameDayManager: {
      role: 'Game Day Manager',
      name: names[Math.floor(Math.random() * names.length)] || '',
      phoneNumber: '(123) 456-7890',
      emailAddress: emails[Math.floor(Math.random() * emails.length)] || '',
    },
    homeTeamContact: {
      role: 'Home Team Contact',
      name: names[Math.floor(Math.random() * names.length)] || '',
      phoneNumber: '(123) 456-7890',
      emailAddress: emails[Math.floor(Math.random() * emails.length)] || '',
    },
    awayTeamContact: {
      role: 'Away Team Contact',
      name: names[Math.floor(Math.random() * names.length)] || '',
      phoneNumber: '(123) 456-7890',
      emailAddress: emails[Math.floor(Math.random() * emails.length)] || '',
    },
    mdoc: {
      role: 'Match Day Coordinator',
      name: names[Math.floor(Math.random() * names.length)] || '',
      phoneNumber: '(123) 456-7890',
      emailAddress: emails[Math.floor(Math.random() * emails.length)] || '',
    },
    cometSupport: {
      role: 'COMET Support',
      name: names[Math.floor(Math.random() * names.length)] || '',
      phoneNumber: '(123) 456-7890',
      emailAddress: emails[Math.floor(Math.random() * emails.length)] || '',
    },
  };
};
