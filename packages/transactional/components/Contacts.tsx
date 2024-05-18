import { Section, Text, Row, Column, Heading, Link } from 'jsx-email';

export type Contact = {
  name: string;
  email: string;
  role: string;
  phoneNumber: string;
  id: number;
};

export type ContactsProps = {
  contacts: Contact[];
};

const ContactItem = ({ role, email, name, phoneNumber }: Contact) => (
  <Row className='border border-slate-300 border-solid'>
    <Column className='w-2/7'>
      <Text disableDefaultStyle={true} className='m-1 text-sm'>
        {role}
      </Text>
      <Column align='right'>
        <Section disableDefaultStyle={true} className='m-1'>
          <Row align='right'>
            <Column className='w-3/5'>
              <Text
                disableDefaultStyle={true}
                className='text-right text-sm m-1 font-bold '
              >
                <Link href={`mailto:${email}`}>{name}</Link>
              </Text>
            </Column>
            <Column className='w-2/5'>
              <Text
                disableDefaultStyle={true}
                className='text-right text-sm m-1 pr-1'
              >
                {phoneNumber}
              </Text>
            </Column>
          </Row>
        </Section>
      </Column>
    </Column>
  </Row>
);

const Contacts = ({ contacts }: ContactsProps) => (
  <Section>
    <Heading as='h2' disableDefaultStyle={true} className='m-1'>
      Contacts
    </Heading>
    <Section className='border border-slate-300 border-solid'>
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          name={contact.name}
          email={contact.email}
          phoneNumber={contact.phoneNumber}
          role={contact.role}
          id={contact.id}
        />
      ))}
    </Section>
  </Section>
);

export default Contacts;
