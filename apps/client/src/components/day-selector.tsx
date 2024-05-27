import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import { addDay, dayStart, format } from '@formkit/tempo';
import { trpc } from '@/utils/trpc';

const formatDate = (date: Date) => ({
  apiDate: format(date, 'YYYYMMDD', 'en'),
  comparisonDate: format(date, 'YYYY-MM-DD', 'en'),
});

const DaySelector = () => {
  const [date, setDate] = useState<Date | undefined>(
    dayStart(addDay(new Date(), 2)),
  );

  const { apiDate, comparisonDate } = formatDate(date || new Date());

  const { data } = trpc.comet.getMatches.useQuery({
    apiDate,
    comparisonDate,
  });

  return (
    <>
      <Calendar
        mode='single'
        selected={date}
        onSelect={setDate}
        className='rounded-md border'
      />
      {date ? <p>date is: {apiDate}</p> : ''}
      {data ? <p>length of data is {data?.length}</p> : ''}
      {data ? <p>{JSON.stringify(data)}</p> : ''}
    </>
  );
};

export default DaySelector;
