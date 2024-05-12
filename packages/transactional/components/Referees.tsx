import { Section, Heading, Row, Column, Text } from 'jsx-email';

export type Referee = {
  role: string;
  name: string;
};

export type RefereesProps = {
  referees: Referee[];
};

const RefereeItem = ({ role, name }: Referee) => (
  <Row>
    <Column>
      <Text disableDefaultStyle={true} className='m-1'>
        {role}
      </Text>
    </Column>
    <Column>
      <Text disableDefaultStyle={true} className='font-bold m-1 text-right'>
        {name}
      </Text>
    </Column>
  </Row>
);

const Referees = ({ referees }: RefereesProps) => (
  <Section>
    <Heading as='h2' disableDefaultStyle={true} className='m-1'>
      Match Officials
    </Heading>
    {referees.map((referee) => (
      <RefereeItem role={referee.role} name={referee.name} key={referee.role} />
    ))}
  </Section>
);

export default Referees;
