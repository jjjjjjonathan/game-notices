import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import { addDay, dayStart, format } from '@formkit/tempo';
import { trpc } from '@/utils/trpc';

const formatDate = (date: Date) => format(date, 'short', 'al');

const DaySelector = () => {
  const [date, setDate] = useState<Date | undefined>(
    dayStart(addDay(new Date(), 2)),
  );

  const { data } = trpc.comet.getMatches.useQuery({
    date: date ? format(date) : format(new Date()),
  });

  return (
    <>
      <Calendar
        mode='single'
        selected={date}
        onSelect={setDate}
        className='rounded-md border'
      />
      {date ? <p>date is: {formatDate(date)}</p> : ''}
      {data ? <p>length of data is {data?.results.length}</p> : ''}
    </>
  );
};

export default DaySelector;
