import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';
import dotenv from 'dotenv';
import axios from 'redaxios';
import type { CometMatchData, MatchAdditionalDetails } from '../../utils/types';
import { convertSvg } from '../../utils/svg-to-jpg';
import { createClient } from '@supabase/supabase-js';
import { decode } from 'base64-arraybuffer';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_API_KEY || '',
  {
    global: {
      headers: {
        Authorization: process.env.SUPABASE_SERVICE_KEY || '',
      },
    },
  },
);

export const cometRouter = createTRPCRouter({
  getMatches: publicProcedure
    .input(
      z.object({
        date: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const url = `${process.env.COMET_LIVE_URL}/${process.env.COMET_LIVE_TENANT}/matchList/${input.date}/-4`;

      const { data }: { data: CometMatchData } = await axios({
        url,
        method: 'get',
        headers: {
          API_KEY: process.env.COMET_LIVE_API_KEY || '',
        },
        params: {
          organizationIdFilter: process.env.COMET_LIVE_ORGANIZATION_ID,
        },
      });

      return data;
    }),

  getAdditionalMatchDetails: publicProcedure
    .input(
      z.object({
        matchId: z.number(),
      }),
    )
    .query(async ({ input }) => {
      console.log(`fetching kits for ${input.matchId}`);
      const url = `${process.env.COMET_LIVE_URL}/${process.env.COMET_LIVE_TENANT}/match/${input.matchId}/info`;

      const { data }: { data: MatchAdditionalDetails } = await axios({
        url,
        method: 'get',
        headers: {
          API_KEY: process.env.COMET_LIVE_API_KEY || '',
        },
        params: {
          organizationIdFilter: process.env.COMET_LIVE_ORGANIZATION_ID,
        },
      });

      return data;
    }),

  uploadMatchKits: publicProcedure
    .input(
      z.object({
        homeKit: z.object({
          svg: z.string(),
          name: z.string(),
        }),
      }),
    )
    .mutation(async ({ input }) => {
      const base64 = await convertSvg(input.homeKit.svg);
      const { data, error } = await supabase.storage
        .from('kits')
        .upload(`${input.homeKit.name}.jpg`, decode(base64), {
          contentType: 'image/jpeg',
        });
      console.log(error);
    }),
});
