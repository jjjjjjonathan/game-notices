import { Tailwind, Html, Body, Container, Hr, Preview } from 'jsx-email';
import Header, { type HeaderProps } from '../components/Header';
import Kits, { type KitsProps } from '../components/Kits';
import Referees, { type RefereesProps, Referee } from '../components/Referees';
import Contacts, { type ContactsProps, Contact } from '../components/Contacts';

export type EmailProps = {
  headerProps: HeaderProps;
  refereesProps: RefereesProps;
  contactsProps: ContactsProps;
  kitsProps: KitsProps;
};

const headerProps = {
  leagueLogo:
    'https://mqraydcreimschkgouyk.supabase.co/storage/v1/object/public/league-logos/m-premier.png',
  competitionName: 'League1 ON Premier Division',
  dateTime: 'Sat, Feb 24, 2024 • 3:00 PM',
  matchId: 123456,
  location: 'J.C. Massie Field',
  matchUrl: 'https://example.com',
} satisfies HeaderProps;

const refereesProps = {
  referees: [
    { role: 'Referee', name: 'AMANDA KWAN' } satisfies Referee,
    { role: '1st Assistant Referee', name: 'JOEY FILIPIC' } satisfies Referee,
    {
      role: '2nd Assistant Referee',
      name: 'ADAM CHORAZYCZEWSKI',
    } satisfies Referee,
    { role: 'Fourth Official', name: 'NIVIN RAIZADA' } satisfies Referee,
  ],
} satisfies RefereesProps;

const contactsProps = {
  contacts: [
    {
      role: 'Home Team',
      name: 'JONATHAN CHENG',
      email: 'example@email.ca',
      phoneNumber: '(123) 456-7890',
      id: 123456,
    } satisfies Contact,
    {
      role: 'Away Team',
      name: 'JONATHAN CHENG',
      email: 'example@email.ca',
      phoneNumber: '(123) 456-7890',
      id: 123457,
    } satisfies Contact,
    {
      role: 'Game day manager',
      name: 'JONATHAN CHENG',
      email: 'example@email.ca',
      phoneNumber: '(123) 456-7890',
      id: 123458,
    } satisfies Contact,
    {
      role: 'Match day coordinator',
      name: 'JONATHAN CHENG',
      email: 'example@email.ca',
      phoneNumber: '(123) 456-7890',
      id: 123459,
    } satisfies Contact,
  ],
} satisfies ContactsProps;

const kitsProps = {
  homePlayerKit:
    'https://mqraydcreimschkgouyk.supabase.co/storage/v1/object/public/league-logos/ref.jpg',
  homeGoalkeeperKit:
    'https://mqraydcreimschkgouyk.supabase.co/storage/v1/object/public/league-logos/ref.jpg',
  awayPlayerKit:
    'https://mqraydcreimschkgouyk.supabase.co/storage/v1/object/public/league-logos/ref.jpg',
  awayGoalkeeperKit:
    'https://mqraydcreimschkgouyk.supabase.co/storage/v1/object/public/league-logos/ref.jpg',
  refereeKit:
    'https://mqraydcreimschkgouyk.supabase.co/storage/v1/object/public/league-logos/ref.jpg',
  homeLogoSrc:
    'https://mqraydcreimschkgouyk.supabase.co/storage/v1/object/public/team-logos/tecumseh.png',
  awayLogoSrc:
    'https://mqraydcreimschkgouyk.supabase.co/storage/v1/object/public/team-logos/tecumseh.png',
  homeTeamName: 'SIMCOE COUNTY ROVERS FC U20 WOMEN',
  awayTeamName: 'UNIONVILLE MILLIKEN U20 WOMEN',
} satisfies KitsProps;

export const PreviewProps = {
  headerProps,
  refereesProps,
  contactsProps,
  kitsProps,
};

export const Template = ({
  headerProps,
  refereesProps,
  contactsProps,
  kitsProps,
}: EmailProps) => (
  <Tailwind production={true}>
    <Html lang='en'>
      <Preview>preview text goes here!</Preview>
      <Body className='bg-white'>
        <Container>
          <Header
            leagueLogo={headerProps.leagueLogo}
            competitionName={headerProps.competitionName}
            dateTime={headerProps.dateTime}
            matchId={headerProps.matchId}
            location={headerProps.location}
            matchUrl={headerProps.matchUrl}
          />
          <Hr />
          <Kits
            homeLogoSrc={kitsProps.homeLogoSrc}
            awayLogoSrc={kitsProps.awayLogoSrc}
            homeTeamName={kitsProps.homeTeamName}
            awayTeamName={kitsProps.awayTeamName}
            homePlayerKit={kitsProps.homePlayerKit}
            awayPlayerKit={kitsProps.awayPlayerKit}
            homeGoalkeeperKit={kitsProps.homeGoalkeeperKit}
            awayGoalkeeperKit={kitsProps.awayGoalkeeperKit}
            refereeKit={kitsProps.refereeKit}
          />
          <Hr />
          <Referees referees={refereesProps.referees} />
          <Hr />
          <Contacts contacts={contactsProps.contacts} />
        </Container>
      </Body>
    </Html>
  </Tailwind>
);
