import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';
import dotenv from 'dotenv';
import axios from 'redaxios';
import type {
  CometMatchData,
  MatchAdditionalDetails,
  LogoData,
} from '../../utils/types';
import { uploadKit } from '../../utils/supabase';
import { TRPCError } from '@trpc/server';

dotenv.config();

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

  uploadKits: publicProcedure
    .input(
      z.object({
        homeKit: z.object({
          svg: z.string(),
          name: z.string(),
        }),
        homeGKKit: z.object({
          svg: z.string(),
          name: z.string(),
        }),
        awayKit: z.object({
          svg: z.string(),
          name: z.string(),
        }),
        awayGKKit: z.object({
          svg: z.string(),
          name: z.string(),
        }),
        refereeKit: z.object({
          svg: z.string(),
          name: z.string(),
        }),
      }),
    )
    .mutation(async ({ input }) => {
      const [homeKit, homeGKKit, awayKit, awayGKKit, refereeKit] =
        await Promise.all([
          uploadKit(input.homeKit.svg, input.homeKit.name),
          uploadKit(input.homeGKKit.svg, input.homeGKKit.name),
          uploadKit(input.awayKit.svg, input.awayKit.name),
          uploadKit(input.awayGKKit.svg, input.awayGKKit.name),
          uploadKit(input.refereeKit.svg, input.refereeKit.name),
        ]);

      return {
        homeKit,
        homeGKKit,
        awayKit,
        awayGKKit,
        refereeKit,
      };
    }),

  getLogo: publicProcedure
    .input(
      z.object({
        clubParentId: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const url =
        'https://comet.canadasoccer.com/data-backend/api/public/areports/run/0/1000/';
      const { data }: { data: LogoData } = await axios({
        url,
        method: 'get',
        params: {
          API_KEY: process.env.CLUB_LOGO_API_KEY || '',
          id: input.clubParentId,
        },
      });

      return data.results[0].logo;
    }),

  // getLogos: publicProcedure.input(z.object({
  //   competitionId: z.number(),
  //   homeTeamId: z.number(),
  //   awayTeamId: z.number()
  // })).query(async ({ input }) => {

  // })
});

// https://jgalrtznvgegzlshobzj.supabase.co/storage/v1/object/public/logos/competitions/255517628.png
