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
  src: 'https://fonts.gstatic.com/s/roboto/v16/zN7GBFwfMP4uA6AR0HCoLQ.ttf',
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
  date: string;
  time: string;
  matchId: number;
};

type GameNoticeProps = {
  header: HeaderProps;
};

const GameNoticeHeader = ({
  competitionLogo,
  homeTeamLogo,
  awayTeamLogo,
  homeTeamName,
  awayTeamName,
  stadium,
  date,
  time,
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
            <Text style={tw('text-center pt-4')}>{homeTeamName}</Text>
            <Text style={tw('text-center pb-4')}>Home</Text>
          </View>
          {/* Home Team Logo */}
          <Image
            src={`${LOGOS_URL}competitions/${homeTeamLogo}.png`}
            style={tw('h-20 w-20')}
          />
        </View>
        <View style={tw('flex flex-row text-xs items-center justify-start')}>
          {/* Away Team Logo */}
          <Image
            src={`${LOGOS_URL}competitions/${awayTeamLogo}.png`}
            style={tw('h-20 w-20')}
          />
          {/* Away Team Name */}
          <View
            style={tw('h-20 w-36 flex flex-col items-center justify-between')}
          >
            <Text style={tw('text-center pt-4')}>{awayTeamName}</Text>
            <Text style={tw('text-center pb-4')}>Away</Text>
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
          {stadium} • {date} • {time} ET • Match #{matchId}
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

export default function GameNotice({ header }: GameNoticeProps) {
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
          date={header.date}
          time={header.time}
          matchId={header.matchId}
        />
      </Page>
    </Document>
  );
}
