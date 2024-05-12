import { Tailwind, Html, Body, Container, Hr } from 'jsx-email';
import Header, { type HeaderProps } from '../components/Header';

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
} satisfies HeaderProps;

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
          />
          <Hr />
        </Container>
      </Body>
    </Html>
  </Tailwind>
);
