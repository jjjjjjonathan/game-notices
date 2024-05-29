import { Calendar } from '@/components/ui/calendar';
import MatchTable from '@/components/match-table';
import { useState } from 'react';
import { addDay, dayStart, format } from '@formkit/tempo';
import { trpc } from '@/utils/trpc';

const DaySelector = () => {
  const [date, setDate] = useState<Date | undefined>(
    dayStart(addDay(new Date(), 2)),
  );

  const { data, isSuccess } = trpc.comet.getMatches.useQuery({
    date: format(date || new Date(), 'YYYYMMDD', 'en'),
  });

  return (
    <>
      <Calendar
        mode='single'
        selected={date}
        onSelect={setDate}
        className='rounded-md border'
      />
      {isSuccess && <MatchTable data={data} />}
    </>
  );
};

export default DaySelector;
