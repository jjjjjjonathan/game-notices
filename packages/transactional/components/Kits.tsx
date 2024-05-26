import { Section, Text, Heading, Row, Column, Img } from 'jsx-email';

export type Team = {
  logoSrc: string;
  logoAlt: string;
  playerKit: string;
  goalkeeperKit: string;
};

type RefereeKitProps = {
  kitSrc: string;
};

export type KitsProps = {
  homeLogoSrc: string;
  awayLogoSrc: string;
  homeTeamName: string;
  awayTeamName: string;
  homePlayerKit: string;
  awayPlayerKit: string;
  homeGoalkeeperKit: string;
  awayGoalkeeperKit: string;
  refereeKit: string;
};

const TeamKit = ({ logoSrc, logoAlt, playerKit, goalkeeperKit }: Team) => (
  <Row className='my-2 w-full min-w-full'>
    <Column className='w-1/3'>
      <Img src={logoSrc} width={50} className='mx-auto mt-auto' alt={logoAlt} />
      <Text disableDefaultStyle={true} className='text-center m-0'>
        {logoAlt}
      </Text>
    </Column>
    <Column className='w-1/3 h-full'>
      <Img className='mx-auto' src={playerKit} />
    </Column>
    <Column className='w-1/3 h-full'>
      <Img className='mx-auto' src={goalkeeperKit} />
    </Column>
  </Row>
);

const RefereeKit = ({ kitSrc }: RefereeKitProps) => (
  <Row className='my-2 w-full min-w-full'>
    <Column className='w-1/3 mr-auto'>
      <Text disableDefaultStyle={true} className='text-center mx-auto w-full'>
        Referees
      </Text>
    </Column>
    <Column className='w-1/3 h-full'>
      <Img className='mx-auto' src={kitSrc} />
    </Column>
    <Column className='w-1/3 h-full'>
      <Img
        className='mx-auto'
        src='https://mqraydcreimschkgouyk.supabase.co/storage/v1/object/public/league-logos/transparent1.png?t=2024-05-22T14%3A44%3A47.702Z'
      />
    </Column>
  </Row>
);

const Kits = ({
  homeLogoSrc,
  awayLogoSrc,
  homeTeamName,
  awayTeamName,
  homePlayerKit,
  awayPlayerKit,
  homeGoalkeeperKit,
  awayGoalkeeperKit,
  refereeKit,
}: KitsProps) => (
  <Section>
    <Heading as='h2' disableDefaultStyle={true} className='m-1'>
      Uniforms
    </Heading>
    <Section>
      <TeamKit
        logoSrc={homeLogoSrc}
        logoAlt={homeTeamName}
        playerKit={homePlayerKit}
        goalkeeperKit={homeGoalkeeperKit}
      />
      <TeamKit
        logoSrc={awayLogoSrc}
        logoAlt={awayTeamName}
        playerKit={awayPlayerKit}
        goalkeeperKit={awayGoalkeeperKit}
      />
      <RefereeKit kitSrc={refereeKit} />
    </Section>
  </Section>
);

export default Kits;
