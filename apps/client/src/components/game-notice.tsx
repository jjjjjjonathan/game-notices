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

type GameNoticeProps = {
  competitionLogo: number;
};

type HeaderProps = {
  competitionLogo: number;
  homeTeamLogo: number;
  awayTeamLogo: number;
};

const GameNoticeHeader = ({ competitionLogo }: HeaderProps) => {
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
            <Text style={tw('text-center pt-4')}>
              SIMCOE COUNTY ROVERS U-20 WOMEN
            </Text>
            <Text style={tw('text-center pb-4')}>Home</Text>
          </View>
          {/* Home Team Logo */}
          <Image
            src={`${LOGOS_URL}competitions/${competitionLogo}.png`}
            style={tw('h-20 w-20')}
          />
        </View>
        <View style={tw('flex flex-row text-xs items-center justify-start')}>
          {/* Away Team Logo */}
          <Image
            src={`${LOGOS_URL}competitions/${competitionLogo}.png`}
            style={tw('h-20 w-20')}
          />
          {/* Away Team Name */}
          <View
            style={tw('h-20 w-36 flex flex-col items-center justify-between')}
          >
            <Text style={tw('text-center pt-4')}>SIMCOE COUNTY ROVERS</Text>
            <Text style={tw('text-center pb-4')}>Away</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default function GameNotice({ competitionLogo }: GameNoticeProps) {
  return (
    <Document>
      <Page size='LETTER' style={tw('p-12 font-sans')}>
        <GameNoticeHeader
          competitionLogo={competitionLogo}
          homeTeamLogo={competitionLogo}
          awayTeamLogo={competitionLogo}
        />
      </Page>
    </Document>
  );
}
