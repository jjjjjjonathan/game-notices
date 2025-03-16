import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { CometMatchData } from '@game-notices/server/utils/types';
import MatchDialog from '@/components/match-dialog';
import { format } from '@formkit/tempo';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { Checkbox } from './ui/checkbox';

type CometSupportOptions = {
  name: string;
  id: number;
  email: string;
  phoneNumber: string;
  isCometSupport: boolean | null;
};

type MatchTableProps = {
  data: CometMatchData;
  cometSupportOptions: CometSupportOptions[];
};

type MatchRowProps = {
  matchId: number;
  homeTeamName: string;
  awayTeamName: string;
  competitionName: string;
  dateTime: number;
  homeParentId: number;
  awayParentId: number;
  competitionId: number;
  homeTeamId: number;
  awayTeamId: number;
  stadium: string;
  cometSupportOptions: CometSupportOptions[];
};

const DATE_DISPLAY_FORMAT = 'ddd, MMM D, YYYY • h:mm a';

const convertTimestampToDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return date;
};

const MatchRow = ({
  matchId,
  homeTeamName,
  awayTeamName,
  competitionName,
  dateTime,
  homeTeamId,
  awayTeamId,
  competitionId,
  stadium,
  cometSupportOptions,
}: MatchRowProps) => {
  const date = convertTimestampToDate(dateTime);
  const formattedDate = format(date, DATE_DISPLAY_FORMAT, 'en');
  const [cometSupportName, setCometSupportName] = useState('Jonathan Cheng');
  const [isBroadcasted, setIsBroadcasted] = useState(false);

  return (
    <TableRow>
      <TableCell>{matchId}</TableCell>
      <TableCell>{competitionName}</TableCell>
      <TableCell>{formattedDate}</TableCell>
      <TableCell>{homeTeamName}</TableCell>
      <TableCell>{awayTeamName}</TableCell>
      <TableCell>
        <Checkbox
          defaultChecked={false}
          onCheckedChange={() => {
            setIsBroadcasted((previous) => !previous);
          }}
        />
      </TableCell>
      <TableCell>
        <Select onValueChange={setCometSupportName}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select COMET Support' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {cometSupportOptions.map((option) => (
                <SelectItem key={option.name} value={option.name}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>
        <MatchDialog
          matchId={matchId}
          homeTeamId={homeTeamId}
          awayTeamId={awayTeamId}
          competitionId={competitionId}
          homeTeamName={homeTeamName}
          awayTeamName={awayTeamName}
          stadium={stadium}
          dateTime={formattedDate}
          cometSupportName={cometSupportName}
          isBroadcasted={isBroadcasted}
        />
      </TableCell>
    </TableRow>
  );
};

const MatchTable = ({ data, cometSupportOptions }: MatchTableProps) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Match ID</TableHead>
            <TableHead>Competition</TableHead>
            <TableHead>Date/Time</TableHead>
            <TableHead>Home Team</TableHead>
            <TableHead>Away Team</TableHead>
            <TableHead>Broadcasted</TableHead>
            <TableHead>COMET Support</TableHead>
            <TableHead>PDF</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((match) => (
            <MatchRow
              key={match.id}
              competitionName={match.competition.name}
              competitionId={match.competition.id}
              dateTime={match.dateTimeUTC}
              homeTeamName={match.homeTeam.name}
              awayTeamName={match.awayTeam.name}
              homeTeamId={match.homeTeam.id}
              awayTeamId={match.awayTeam.id}
              matchId={match.id}
              homeParentId={match.homeTeam.parent?.id || 0}
              awayParentId={match.awayTeam.parent?.id || 0}
              stadium={match.facility.name || ''}
              cometSupportOptions={cometSupportOptions}
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default MatchTable;
