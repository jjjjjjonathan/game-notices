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
  <Row>
    <Column className='w-2/5'>
      <Text disableDefaultStyle={true} className='m-1'>
        {role}
      </Text>
      <Column align='right'>
        <Section disableDefaultStyle={true} className='m-1'>
          <Row align='right'>
            <Column>
              <Text
                disableDefaultStyle={true}
                className='text-right m-1 font-bold'
              >
                <Link href={`mailto:${email}`}>{name}</Link>
              </Text>
            </Column>
            <Column>
              <Text disableDefaultStyle={true} className='text-right m-1'>
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
);

export default Contacts;
