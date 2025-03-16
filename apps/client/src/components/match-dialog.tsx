import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { Button } from './ui/button';
import { trpc } from '@/utils/trpc';
import type { Referee } from '@game-notices/transactional/components/Referees';
import GameNotice from './game-notice';
import { PDFDownloadLink } from '@react-pdf/renderer';

type MatchDialogProps = {
  matchId: number;
  homeTeamId: number;
  awayTeamId: number;
  competitionId: number;
  homeTeamName: string;
  awayTeamName: string;
  stadium: string;
  dateTime: string;
  cometSupportName: string;
};

type MatchOfficial = {
  roleId: number;
  personId: number;
  name: string;
  shortName: string;
  role: string;
  picture?: string;
  flag: string;
  orderNumber: number;
};

const filterMatchOfficials = (matchOfficials: MatchOfficial[]) => {
  const referees = [
    'Referee',
    '1st assistant referee',
    '2nd assistant referee',
    'Fourth official',
  ];

  return matchOfficials
    .filter((matchOfficial) => referees.includes(matchOfficial.role))
    .map(
      (referee) =>
        ({ role: referee.role, name: referee.shortName }) satisfies Referee,
    );
};

const MatchDialog = ({
  matchId,
  competitionId,
  homeTeamId,
  awayTeamId,
  homeTeamName,
  awayTeamName,
  stadium,
  dateTime,
  cometSupportName,
}: MatchDialogProps) => {
  const [open, setOpen] = useState(false);

  const { data: additionalMatchDetails, isSuccess: matchDetailsSuccess } =
    trpc.comet.getAdditionalMatchDetails.useQuery(
      { matchId, homeTeamId, awayTeamId, cometSupportName },
      {
        enabled: open,
      },
    );

  const matchOfficials = filterMatchOfficials(
    additionalMatchDetails?.matchOfficials || [],
  ).map((matchOfficial) => ({
    name: matchOfficial.name,
    role: matchOfficial.role,
  }));

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>Open</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{matchId}</AlertDialogTitle>
          <AlertDialogDescription>
            These are the kits pulled from COMET.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button>
            {additionalMatchDetails && matchDetailsSuccess ? (
              <PDFDownloadLink
                fileName={`${matchId}.pdf`}
                document={
                  <GameNotice
                    startingState={false}
                    header={{
                      competitionLogo: competitionId,
                      homeTeamLogo: homeTeamId,
                      awayTeamLogo: awayTeamId,
                      homeTeamName: homeTeamName,
                      awayTeamName: awayTeamName,
                      stadium: stadium,
                      dateTime: dateTime,
                      matchId: matchId,
                    }}
                    matchOfficials={matchOfficials}
                    kits={{
                      homeKit: additionalMatchDetails?.homeKit || '',
                      homeGKKit: additionalMatchDetails?.homeGKKit || '',
                      awayKit: additionalMatchDetails?.awayKit || '',
                      awayGKKit: additionalMatchDetails?.awayGKKit || '',
                      refereeKit: additionalMatchDetails?.refereeKit || '',
                    }}
                    contacts={{
                      gameDayManager: additionalMatchDetails.gameDayManager,
                      homeTeamContact: additionalMatchDetails.homeTeamContact,
                      awayTeamContact: additionalMatchDetails.awayTeamContact,
                      mdoc: additionalMatchDetails.mdoc,
                      cometSupport: additionalMatchDetails.cometSupport,
                    }}
                  />
                }
              >
                Download PDF
              </PDFDownloadLink>
            ) : null}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MatchDialog;
