import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';
import dotenv from 'dotenv';
import type { CometMatchData } from '../../utils/types';
import { addDay, format } from '@formkit/tempo';

dotenv.config();

export const cometRouter = createTRPCRouter({
  getMatches: publicProcedure
    .input(
      z.object({
        date: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const response = await fetch(
        `https://comet.canadasoccer.com/data-backend/api/public/areports/run/0/25/?API_KEY=${process.env.COMET_DATA_API_KEY}`,
      );

      const beginning = Date.parse(input.date);
      const end = Date.parse(
        format(addDay(new Date(input.date)), 'short', 'al'),
      );

      console.log(beginning, end);

      const data = (await response.json()) as CometMatchData;
      return {
        results: data.results.filter(
          (match) =>
            match.matchDate > Date.parse(input.date) &&
            match.matchDate <
              Date.parse(format(addDay(new Date(input.date)), 'short', 'al')),
        ),
      };
    }),
});
