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
    <Column disableDefaultStyle={true} className='w-1/3'>
      <Section>
        <Text disableDefaultStyle={true} className='m-1'>
          {role}
        </Text>
      </Section>
    </Column>
    <Column align='right'>
      <Section disableDefaultStyle={true} className='text-right ml-auto'>
        <Text disableDefaultStyle={true} className='font-bold m-1 text-right'>
          {name}
        </Text>
      </Section>
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
