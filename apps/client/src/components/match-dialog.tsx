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
import { Button } from './ui/button';
import { trpc } from '@/utils/trpc';
import { toast } from 'sonner';

type MatchDialogProps = {
  matchId: number;
};

type TeamKitRowProps = {
  playerKit: string;
  goalkeeperKit: string;
  isHome: boolean;
};

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

const TeamKitRow = ({ playerKit, goalkeeperKit, isHome }: TeamKitRowProps) => (
  <section className='flex flex-row items-center justify-center'>
    <div className='flex flex-col items-center'>
      <SVG src={playerKit} />
      <p>{isHome ? 'Home' : 'Away'} - Player</p>
    </div>
    <div className='flex flex-col items-center'>
      <SVG src={goalkeeperKit} />
      <p>{isHome ? 'Home' : 'Away'} - Goalkeeper</p>
    </div>
  </section>
);

const MatchDialog = ({ matchId }: MatchDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const { data, isSuccess, fetchStatus } =
    trpc.comet.getAdditionalMatchDetails.useQuery(
      { matchId },
      {
        enabled: open,
      },
    );

  const readyToSend = isSuccess && fetchStatus === 'idle';

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>Open</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{matchId}</AlertDialogTitle>
          <AlertDialogDescription>
            These are the kits pulled from COMET.
          </AlertDialogDescription>
          {readyToSend && (
            <>
              <TeamKitRow
                isHome={true}
                playerKit={data.homeKit}
                goalkeeperKit={data.homeGKKit}
              />
              <TeamKitRow
                isHome={false}
                playerKit={data.awayKit}
                goalkeeperKit={data.awayGKKit}
              />
              <section className='flex flex-row items-center justify-center'>
                <div className='flex flex-col items-center'>
                  <SVG src={data.refereeKit} />
                  <p>Referee</p>
                </div>
              </section>
            </>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setIsSending(true);
              wait().then(() => {
                setOpen(!open);
                setIsSending(false);
                toast('Game notice sent!');
              });
            }}
          >
            <Button
              disabled={!readyToSend || isSending}
              variant='default'
              type='submit'
            >
              {readyToSend ? 'Send game notices' : 'Waiting...'}
            </Button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MatchDialog;
