import { Tailwind, Html, Body, Container, Hr } from 'jsx-email';
import Header, { type HeaderProps } from '../components/Header';
import Teams from '../components/Teams';
import Referees, { type RefereesProps, Referee } from '../components/Referees';
import Contacts from '../components/Contacts';

type EmailProps = {
  headerProps: HeaderProps;
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
    { role: '2nd Assistant Referee', name: 'BRAD DOUBROUGH' } satisfies Referee,
    { role: 'Fourth Official', name: 'NIVIN RAIZADA' } satisfies Referee,
  ],
} satisfies RefereesProps;

export const PreviewProps = {
  headerProps,
};

export const Template = ({ headerProps }: EmailProps) => (
  <Tailwind production={true}>
    <Html lang='en'>
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
          <Teams />
          <Hr />
          <Referees referees={refereesProps.referees} />
          <Hr />
          <Contacts />
        </Container>
      </Body>
    </Html>
  </Tailwind>
);
