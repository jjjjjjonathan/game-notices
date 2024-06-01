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

type MatchTableProps = {
  data: CometMatchData;
};

type MatchRowProps = {
  id: number;
  homeTeamName: string;
  awayTeamName: string;
  competitionName: string;
  dateTime: number;
  homeParentId: number;
  awayParentId: number;
};

const DATE_DISPLAY_FORMAT = 'ddd, MMM D, YYYY • h:mm a';

const convertTimestampToDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return date;
};

const MatchRow = ({
  id,
  homeTeamName,
  awayTeamName,
  competitionName,
  dateTime,
  homeParentId,
  awayParentId,
}: MatchRowProps) => {
  const date = convertTimestampToDate(dateTime);

  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{competitionName}</TableCell>
      <TableCell>{format(date, DATE_DISPLAY_FORMAT, 'en')}</TableCell>
      <TableCell>{homeTeamName}</TableCell>
      <TableCell>{awayTeamName}</TableCell>
      <TableCell>
        <MatchDialog
          matchId={id}
          homeParentId={homeParentId}
          awayParentId={awayParentId}
        />
      </TableCell>
    </TableRow>
  );
};

const MatchTable = ({ data }: MatchTableProps) => {
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
            <TableHead>Something</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((match) => (
            <MatchRow
              key={match.id}
              competitionName={match.competition.name}
              dateTime={match.dateTimeUTC}
              homeTeamName={match.homeTeam.name}
              awayTeamName={match.awayTeam.name}
              id={match.id}
              homeParentId={match.homeTeam.parent?.id || 0}
              awayParentId={match.awayTeam.parent?.id || 0}
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default MatchTable;
