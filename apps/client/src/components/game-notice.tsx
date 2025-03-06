import {
  Page,
  Text,
  View,
  Document,
  Font,
  Image,
  Svg,
  Line,
} from '@react-pdf/renderer';
import { createTw } from 'react-pdf-tailwind';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: '/fonts/Roboto-Bold.ttf?url', fontWeight: 'bold' },
    { src: '/fonts/Roboto-SemiBold.ttf?url', fontWeight: 'semibold' },
    { src: '/fonts/Roboto-Light.ttf?url', fontWeight: 'light' },
    { src: '/fonts/Roboto-Regular.ttf?url', fontWeight: 'normal' },
    { src: '/fonts/Roboto-Medium.ttf?url', fontWeight: 'medium' },
  ],
});

// The 'theme' object is your Tailwind theme config
const tw = createTw({
  theme: {
    fontFamily: {
      sans: ['Roboto'],
    },
    extend: {
      colors: {
        custom: '#bada55',
      },
    },
  },
});

const LOGOS_URL =
  'https://jgalrtznvgegzlshobzj.supabase.co/storage/v1/object/public/logos/';

type HeaderProps = {
  competitionLogo: number;
  homeTeamLogo: number;
  awayTeamLogo: number;
  homeTeamName: string;
  awayTeamName: string;
  stadium: string;
  dateTime: string;
  matchId: number;
};

const GameNoticeHeader = ({
  competitionLogo,
  homeTeamLogo,
  awayTeamLogo,
  homeTeamName,
  awayTeamName,
  stadium,
  dateTime,
  matchId,
}: HeaderProps) => {
  return (
    <>
      {/* Competition logo */}
      <View style={tw('flex flex-row items-center justify-center')}>
        <Svg height='10' width='200'>
          <Line
            x1='0'
            y1='5'
            x2='200'
            y2='5'
            strokeWidth={1}
            stroke='rgb(211,211,211)'
          />
        </Svg>
        <Image
          src={`${LOGOS_URL}competitions/${competitionLogo}.png`}
          style={tw('h-24 w-24')}
        />
        <Svg height='10' width='200'>
          <Line
            x1='0'
            y1='5'
            x2='200'
            y2='5'
            strokeWidth={1}
            stroke='rgb(211,211,211)'
          />
        </Svg>
      </View>

      {/* Teams */}
      <View style={tw('flex flex-row items-center justify-evenly gap-x-6')}>
        <View style={tw('flex flex-row text-xs items-center justify-start')}>
          {/* Home Team Name */}
          <View
            style={tw('h-20 w-36 flex flex-col items-center justify-between')}
          >
            <Text style={tw('text-center pt-4 font-semibold')}>
              {homeTeamName}
            </Text>
            <Text style={tw('text-center pb-4 font-light')}>Home</Text>
          </View>
          {/* Home Team Logo */}
          <Image
            src={`${LOGOS_URL}teams/${homeTeamLogo}.png`}
            style={tw('h-20 w-20')}
          />
        </View>
        <View style={tw('flex flex-row text-xs items-center justify-start')}>
          {/* Away Team Logo */}
          <Image
            src={`${LOGOS_URL}teams/${awayTeamLogo}.png`}
            style={tw('h-20 w-20')}
          />
          {/* Away Team Name */}
          <View
            style={tw('h-20 w-36 flex flex-col items-center justify-between')}
          >
            <Text style={tw('text-center pt-4 font-semibold')}>
              {awayTeamName}
            </Text>
            <Text style={tw('text-center pb-4 font-light')}>Away</Text>
          </View>
        </View>
      </View>
      {/* Match info */}
      <View
        style={tw('mx-auto flex flex-col gap-y-4 items-center justify-center')}
      >
        <Svg height='10' width='500'>
          <Line
            x1='0'
            y1='5'
            x2='500'
            y2='5'
            strokeWidth={1}
            stroke='rgb(211,211,211)'
          />
        </Svg>
        <Text style={tw('text-xs')}>
          {stadium} • {dateTime} ET • Match #{matchId}
        </Text>
        <Svg height='10' width='500'>
          <Line
            x1='0'
            y1='5'
            x2='500'
            y2='5'
            strokeWidth={1}
            stroke='rgb(211,211,211)'
          />
        </Svg>
      </View>
    </>
  );
};

type MatchOfficialProps = {
  name: string;
  role: string;
};

const MatchOfficial = ({ name, role }: MatchOfficialProps) => {
  return (
    <View
      style={tw(
        'border border-solid rounded-lg border-slate-300 h-16 w-48 flex flex-col justify-between p-3',
      )}
    >
      <Text style={tw('font-medium')}>{name}</Text>
      <Text style={tw('capitalize font-light')}>{role}</Text>
    </View>
  );
};

type GameNoticeMatchOfficialsProps = {
  matchOfficials: MatchOfficialProps[];
};

const GameNoticeMatchOfficials = ({
  matchOfficials,
}: GameNoticeMatchOfficialsProps) => {
  return (
    <View
      style={tw(
        'pt-6 flex flex-row items-center justify-between gap-x-2 text-xs text-center',
      )}
    >
      {matchOfficials.map((matchOfficial) => (
        <MatchOfficial
          key={matchOfficial.name}
          name={matchOfficial.name}
          role={matchOfficial.role}
        />
      ))}
    </View>
  );
};

type KitsProps = {
  homeKit: string;
  homeGKKit: string;
  awayKit: string;
  awayGKKit: string;
  refereeKit: string;
};

type KitProp = {
  kit: string;
  description: string;
};

const Kit = ({ kit, description }: KitProp) => {
  return (
    <View style={tw('flex flex-col text-sm items-center gap-y-2 text-center')}>
      <Text>{description}</Text>
      <View style={tw('h-24 w-24')}>
        <Image src={kit} />
      </View>
    </View>
  );
};

const Kits = ({
  homeKit,
  homeGKKit,
  awayKit,
  awayGKKit,
  refereeKit,
}: KitsProps) => {
  return (
    <View style={tw('pt-6 flex flex-row items-center justify-around')}>
      <Kit
        kit={`data:image/png;base64,${homeKit}`}
        description='Home Players'
      />
      <Kit
        kit={`data:image/png;base64,${homeGKKit}`}
        description='Home Goalkeeper'
      />
      <Kit kit={`data:image/png;base64,${refereeKit}`} description='Referees' />
      <Kit
        kit={`data:image/png;base64,${awayKit}`}
        description='Away Players'
      />
      <Kit
        kit={`data:image/png;base64,${awayGKKit}`}
        description='Away Goalkeeper'
      />
    </View>
  );
};

type ContactProps = {
  role: string;
  name: string;
  phoneNumber: string;
  emailAddress: string;
};

const Contact = ({ role, name, phoneNumber, emailAddress }: ContactProps) => {
  return (
    <View style={tw('flex flex-row text-center')}>
      <View style={tw('flex flex-row text-center')}>
        <View style={tw('w-48')}>
          <Text>{role}</Text>
        </View>
        <View style={tw('w-48')}>
          <Text>{name}</Text>
        </View>
        <View style={tw('w-36')}>
          <Text>{phoneNumber}</Text>
        </View>
        <View style={tw('w-48')}>
          <Text>{emailAddress}</Text>
        </View>
      </View>
    </View>
  );
};

const LineBreak = () => {
  return (
    <View>
      <Svg height='10' width='500'>
        <Line
          x1='0'
          y1='5'
          x2='500'
          y2='5'
          strokeWidth={1}
          stroke='rgb(211,211,211)'
        />
      </Svg>
    </View>
  );
};

type ContactsProps = {
  gameDayManager: ContactProps;
  homeTeamContact: ContactProps;
  awayTeamContact: ContactProps;
  mdoc: ContactProps;
  cometSupport: ContactProps;
};

const Contacts = ({
  gameDayManager,
  homeTeamContact,
  awayTeamContact,
  mdoc,
  cometSupport,
}: ContactsProps) => {
  return (
    <View
      style={tw('pt-10 flex flex-col items-center text-xs mx-auto gap-y-3')}
    >
      <View style={tw('flex flex-row text-center font-semibold')}>
        <View style={tw('w-48')}>
          <Text>Match Day Role</Text>
        </View>
        <View style={tw('w-48')}>
          <Text>Name</Text>
        </View>
        <View style={tw('w-36')}>
          <Text>Phone Number</Text>
        </View>
        <View style={tw('w-48')}>
          <Text>Email Address</Text>
        </View>
      </View>
      <LineBreak />
      <Contact
        role={gameDayManager.role}
        name={gameDayManager.name}
        phoneNumber={gameDayManager.phoneNumber}
        emailAddress={gameDayManager.emailAddress}
      />
      <LineBreak />
      <Contact
        role={homeTeamContact.role}
        name={homeTeamContact.name}
        phoneNumber={homeTeamContact.phoneNumber}
        emailAddress={homeTeamContact.emailAddress}
      />
      <LineBreak />
      <Contact
        role={awayTeamContact.role}
        name={awayTeamContact.name}
        phoneNumber={awayTeamContact.phoneNumber}
        emailAddress={awayTeamContact.emailAddress}
      />
      <LineBreak />
      <Contact
        role={mdoc.role}
        name={mdoc.name}
        phoneNumber={mdoc.phoneNumber}
        emailAddress={mdoc.emailAddress}
      />
      <LineBreak />
      <Contact
        role={cometSupport.role}
        name={cometSupport.name}
        phoneNumber={cometSupport.phoneNumber}
        emailAddress={cometSupport.emailAddress}
      />
    </View>
  );
};

type GameNoticeProps = {
  header: HeaderProps;
  matchOfficials: MatchOfficialProps[];
  kits: KitsProps;
  contacts: ContactsProps;
};

export default function GameNotice({
  header,
  matchOfficials,
  kits,
  contacts,
}: GameNoticeProps) {
  return (
    <Document>
      <Page size='LETTER' style={tw('p-12 font-sans')}>
        <GameNoticeHeader
          competitionLogo={header.competitionLogo}
          homeTeamLogo={header.homeTeamLogo}
          awayTeamLogo={header.awayTeamLogo}
          homeTeamName={header.homeTeamName}
          awayTeamName={header.awayTeamName}
          stadium={header.stadium}
          dateTime={header.dateTime}
          matchId={header.matchId}
        />
        <GameNoticeMatchOfficials matchOfficials={matchOfficials} />
        <Kits
          homeKit={kits.homeKit}
          homeGKKit={kits.homeGKKit}
          awayKit={kits.awayKit}
          awayGKKit={kits.awayGKKit}
          refereeKit={kits.refereeKit}
        />
        <Contacts
          gameDayManager={contacts.gameDayManager}
          homeTeamContact={contacts.homeTeamContact}
          awayTeamContact={contacts.awayTeamContact}
          mdoc={contacts.mdoc}
          cometSupport={contacts.cometSupport}
        />
      </Page>
    </Document>
  );
}
