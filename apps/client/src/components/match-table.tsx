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
  homeParentId,
  awayParentId,
  homeTeamId,
  awayTeamId,
  competitionId,
  stadium,
}: MatchRowProps) => {
  const date = convertTimestampToDate(dateTime);
  const formattedDate = format(date, DATE_DISPLAY_FORMAT, 'en');

  return (
    <TableRow>
      <TableCell>{matchId}</TableCell>
      <TableCell>{competitionName}</TableCell>
      <TableCell>{formattedDate}</TableCell>
      <TableCell>{homeTeamName}</TableCell>
      <TableCell>{awayTeamName}</TableCell>
      <TableCell>
        <MatchDialog
          matchId={matchId}
          homeParentId={homeParentId}
          awayParentId={awayParentId}
          homeTeamId={homeTeamId}
          awayTeamId={awayTeamId}
          competitionId={competitionId}
          homeTeamName={homeTeamName}
          awayTeamName={awayTeamName}
          stadium={stadium}
          dateTime={formattedDate}
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
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default MatchTable;
