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
import SVG from 'react-inlinesvg';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { Button } from './ui/button';
import { trpc } from '@/utils/trpc';
import { toast } from 'sonner';
// import { render } from 'jsx-email';
// import { Template } from '@game-notices/transactional/templates/email';
import type { Referee } from '@game-notices/transactional/components/Referees';
import GameNotice from './game-notice';
import { PDFDownloadLink } from '@react-pdf/renderer';

type MatchDialogProps = {
  matchId: number;
  homeParentId: number;
  awayParentId: number;
  homeTeamId: number;
  awayTeamId: number;
  competitionId: number;
  homeTeamName: string;
  awayTeamName: string;
  stadium: string;
  dateTime: string;
};

type TeamKitRowProps = {
  playerKit: string;
  goalkeeperKit: string;
  isHome: boolean;
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

const KitItem = ({ children }: { children: ReactNode }) => {
  return <div className='flex flex-col items-center'>{children}</div>;
};

const TeamKitRow = ({ playerKit, goalkeeperKit, isHome }: TeamKitRowProps) => (
  <section className='flex flex-row items-center justify-center'>
    <KitItem>
      <SVG src={playerKit} />
      <p>{isHome ? 'Home' : 'Away'} - Players</p>
    </KitItem>
    <KitItem>
      <SVG src={goalkeeperKit} />
      <p>{isHome ? 'Home' : 'Away'} - Goalkeepers</p>
    </KitItem>
  </section>
);

const MatchDialog = ({
  matchId,
  homeParentId,
  awayParentId,
  competitionId,
  homeTeamId,
  awayTeamId,
  homeTeamName,
  awayTeamName,
  stadium,
  dateTime,
}: MatchDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const {
    data: additionalMatchDetails,
    isSuccess: matchDetailsSuccess,
    fetchStatus: matchDetailsStatus,
  } = trpc.comet.getAdditionalMatchDetails.useQuery(
    { matchId },
    {
      enabled: open,
    },
  );

  // const {
  //   data: homeLogo,
  //   isSuccess: homeLogoSuccess,
  //   fetchStatus: homeLogoFetchStatus,
  // } = trpc.comet.getLogo.useQuery(
  //   { clubParentId: homeParentId },
  //   { enabled: open },
  // );

  // const {
  //   data: awayLogo,
  //   isSuccess: awayLogoSuccess,
  //   fetchStatus: awayLogoFetchStatus,
  // } = trpc.comet.getLogo.useQuery(
  //   { clubParentId: awayParentId },
  //   { enabled: open },
  // );

  const matchDetailsReady =
    matchDetailsSuccess && matchDetailsStatus === 'idle';
  // const homeLogoReady = homeLogoSuccess && homeLogoFetchStatus === 'idle';
  // const awayLogoReady = awayLogoSuccess && awayLogoFetchStatus === 'idle';
  // const readyToSend = matchDetailsReady && homeLogoReady && awayLogoReady;

  const { mutate: uploadKits } = trpc.comet.uploadKits.useMutation({
    onSuccess: (data) => {
      console.log(
        data.homeKit,
        data.awayKit,
        data.homeGKKit,
        data.awayGKKit,
        data.refereeKit,
      );
      setOpen(!open);
      setIsSending(false);
      toast('Game notices sent!');
    },
  });

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
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setIsSending(true);
              if (additionalMatchDetails) {
                uploadKits({
                  homeKit: {
                    svg: additionalMatchDetails.homeKit,
                    name: additionalMatchDetails.homeKitPng,
                  },
                  homeGKKit: {
                    svg: additionalMatchDetails.homeGKKit,
                    name: additionalMatchDetails.homeGKKitPng,
                  },
                  awayKit: {
                    svg: additionalMatchDetails.awayKit,
                    name: additionalMatchDetails.awayKitPng,
                  },
                  awayGKKit: {
                    svg: additionalMatchDetails.awayGKKit,
                    name: additionalMatchDetails.awayGKKitPng,
                  },
                  refereeKit: {
                    svg: additionalMatchDetails.refereeKit,
                    name: additionalMatchDetails.refereeKitPng,
                  },
                });
              }
            }}
          >
            <Button disabled={true} variant='default' type='submit'>
              placeholder
            </Button>
          </form>
          {additionalMatchDetails && matchDetailsSuccess ? (
            <PDFDownloadLink
              fileName={`${matchId}.pdf`}
              document={
                <GameNotice
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
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MatchDialog;
