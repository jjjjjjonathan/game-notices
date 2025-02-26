// import { Calendar } from '@/components/ui/calendar';
// import MatchTable from '@/components/match-table';
import { useState } from 'react';
// import { addDay, dayStart, format } from '@formkit/tempo';
import { trpc } from '@/utils/trpc';
import { Button } from './ui/button';

const DaySelector = () => {
  // const [date, setDate] = useState<Date | undefined>(
  //   dayStart(addDay(new Date(), 2)),
  // );

  const [signedUrl, setSignedUrl] = useState('');

  // const { data, isSuccess } = trpc.comet.getMatches.useQuery({
  //   date: format(date || new Date(), 'YYYYMMDD', 'en'),
  // });

  const { mutate } = trpc.storage.getSignedUrl.useMutation({
    onSuccess: (data) => {
      setSignedUrl(data);
    },
  });

  return (
    <>
      {/* <Calendar
        mode='single'
        selected={date}
        onSelect={setDate}
        className='rounded-md border'
      />
      {isSuccess && <MatchTable data={data} />} */}
      <Button onClick={() => mutate()}>Test signedUrl</Button>
      <p>
        Signed URL:{' '}
        <span>
          <a href={signedUrl}>{signedUrl}</a>
        </span>
      </p>
    </>
  );
};

export default DaySelector;
