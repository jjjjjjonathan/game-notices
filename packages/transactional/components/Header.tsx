import { Section, Row, Column, Img, Text, Heading, Link } from 'jsx-email';

export type HeaderProps = {
  leagueLogo: string;
  competitionName: string;
  dateTime: string;
  matchId: number;
  location: string;
  matchUrl: string;
};

const Header = ({
  leagueLogo,
  competitionName,
  dateTime,
  matchId,
  location,
  matchUrl,
}: HeaderProps) => (
  <Section>
    <Row>
      <Column>
        <Heading as='h1' disableDefaultStyle={true} className='m-1'>
          Match <Link href={matchUrl}>#{matchId}</Link>
        </Heading>
        <Text disableDefaultStyle={true} className='m-1'>
          {competitionName}
        </Text>
        <Text disableDefaultStyle={true} className='m-1'>
          {dateTime}
        </Text>
        <Text disableDefaultStyle={true} className='m-1'>
          {location}
        </Text>
      </Column>
      <Column align='right' className='my-auto pr-1'>
        <Img src={leagueLogo} width='75' />
      </Column>
    </Row>
  </Section>
);

export default Header;
