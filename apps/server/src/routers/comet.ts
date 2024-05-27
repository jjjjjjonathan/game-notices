import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';
import dotenv from 'dotenv';
import axios from 'redaxios';
import type { CometMatchData } from '../../utils/types';

dotenv.config();

export const cometRouter = createTRPCRouter({
  getMatches: publicProcedure
    .input(
      z.object({
        apiDate: z.string(),
        comparisonDate: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const response = await axios({
        url: `${process.env.COMET_LIVE_URL}/${process.env.COMET_LIVE_TENANT}/matchList/${input.apiDate}/-4`,
        method: 'get',
        headers: {
          API_KEY: process.env.COMET_LIVE_API_KEY || '',
        },
        params: {
          organizationIdFilter: process.env.COMET_LIVE_ORGANIZATION_ID,
        },
      });

      return response.data as CometMatchData;
    }),
});
