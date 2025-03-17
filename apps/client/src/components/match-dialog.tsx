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
import Dropzone from 'shadcn-dropzone';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://jgalrtznvgegzlshobzj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnYWxydHpudmdlZ3psc2hvYnpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2MzY3NTIsImV4cCI6MjA1NTIxMjc1Mn0.nBZxe68xUTkiB5edzhHEk7NJZvYaJ33z2sJerhuAfxI',
);

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
  isBroadcasted: boolean;
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
  isBroadcasted,
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

  const [fileToUpload, setFileToUpload] = useState<File | null>(null);

  const { mutate } = trpc.storage.storeMatchNotice.useMutation({
    onSuccess: async (token) => {
      const { data } = await supabase.storage
        .from('pdf-notices')
        .uploadToSignedUrl(
          `match-notices/${matchId}.pdf`,
          token,
          fileToUpload as File,
        );

      console.log(data);
    },
  });

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
        <Dropzone
          onDrop={(acceptedFiles) => {
            setFileToUpload(acceptedFiles[0] as File);
          }}
        />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button disabled={!additionalMatchDetails || !matchDetailsSuccess}>
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
                      isBroadcasted,
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
            ) : (
              'Creating PDF'
            )}
          </Button>
          <Button
            disabled={!fileToUpload}
            onClick={() => {
              mutate({ id: matchId });
            }}
          >
            Upload PDF
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MatchDialog;
