import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { CometMatchData } from '@game-notices/server/utils/types';

type MatchTableProps = {
  data: CometMatchData;
};

type MatchRowProps = {
  id: number;
  homeTeamName: string;
  awayTeamName: string;
  competitionName: string;
  dateTime: number;
};

const MatchRow = ({
  id,
  homeTeamName,
  awayTeamName,
  competitionName,
  dateTime,
}: MatchRowProps) => {
  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{competitionName}</TableCell>
      <TableCell>{dateTime}</TableCell>
      <TableCell>{homeTeamName}</TableCell>
      <TableCell>{awayTeamName}</TableCell>
      <TableCell>button</TableCell>
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
            />
          ))}
        </TableBody>
      </Table>
      <p>length of data is {data?.length}</p>
      <p>{JSON.stringify(data)}</p>
    </>
  );
};

export default MatchTable;
