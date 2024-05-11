import { Section, Row, Column, Img, Text, Heading } from 'jsx-email';

export type HeaderProps = {
  leagueLogo: string;
  competitionName: string;
  dateTime: string;
};

const Header = ({ leagueLogo, competitionName, dateTime }: HeaderProps) => (
  <Section className='mx-auto w-full'>
    <Row>
      <Column className='text-left'>
        <Heading as='h1'>Game Notice</Heading>
        <Text>{competitionName} | matchId</Text>
        <Text>{dateTime} | location</Text>
      </Column>
      <Column>
        <Img src={leagueLogo} width='100' />
      </Column>
    </Row>
  </Section>
);

export default Header;
