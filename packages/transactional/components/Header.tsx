import { Section, Row, Column, Img, Text } from 'jsx-email';

type HeaderProps = {
  leagueLogo: string;
  competitionName: string;
  dateTime: string;
};

export const Header = ({
  leagueLogo,
  competitionName,
  dateTime,
}: HeaderProps) => (
  <Section className='mx-auto w-full'>
    <Row>
      <Column>
        <Img src={leagueLogo} width='75' />
      </Column>
      <Column>
        <Text className='text-right'>{competitionName}</Text>
        <Text className='text-right'>{dateTime}</Text>
      </Column>
    </Row>
  </Section>
);
