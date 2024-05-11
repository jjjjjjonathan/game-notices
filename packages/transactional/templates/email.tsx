import { Tailwind, Html, Body, Container } from 'jsx-email';
import { Header } from '../components/Header';

export const Template = () => (
  <Tailwind production={true}>
    <Html lang='en'>
      <Body className='bg-white'>
        <Container>
          <Header
            leagueLogo={
              'https://mqraydcreimschkgouyk.supabase.co/storage/v1/object/public/league-logos/m-premier.png'
            }
            competitionName={'League1 ON Premier Division'}
            dateTime={'February 4, 2024'}
          />
        </Container>
      </Body>
    </Html>
  </Tailwind>
);
