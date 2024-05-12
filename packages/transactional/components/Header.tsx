import { Section, Row, Column, Img, Text, Heading, Link } from 'jsx-email';

export type HeaderProps = {
  leagueLogo: string;
  competitionName: string;
  dateTime: string;
  matchId: number;
  location: string;
};

const Header = ({
  leagueLogo,
  competitionName,
  dateTime,
  matchId,
  location,
}: HeaderProps) => (
  <Section>
    <Row>
      <Column>
        <Heading as='h1'>
          Match <Link href='https://example.com'>#{matchId}</Link>
        </Heading>
        <Text>{competitionName}</Text>
        <Text>{dateTime}</Text>
        <Text>{location}</Text>
      </Column>
      <Column align='right' className='my-auto pr-1'>
        <Img src={leagueLogo} width='111' />
      </Column>
    </Row>
  </Section>
);

export default Header;
