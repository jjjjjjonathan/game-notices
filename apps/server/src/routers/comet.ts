import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';
import dotenv from 'dotenv';
import axios from 'redaxios';
import type {
  CometMatchData,
  MatchAdditionalDetails,
  LogoData,
} from '../../utils/types';
import { convertSvgToPng } from '../../utils/kits';
import { uploadKit } from '../../utils/supabase';
import { getContacts } from '../../utils/contacts';
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

      const [homeKit, homeGKKit, awayKit, awayGKKit, refereeKit] =
        await Promise.all([
          convertSvgToPng(data.homeKit),
          convertSvgToPng(data.homeGKKit),
          convertSvgToPng(data.awayKit),
          convertSvgToPng(data.awayGKKit),
          convertSvgToPng(data.refereeKit),
        ]);

      const {
        gameDayManager,
        homeTeamContact,
        awayTeamContact,
        mdoc,
        cometSupport,
      } = getContacts(input.matchId);

      return {
        ...data,
        homeKit,
        homeGKKit,
        awayKit,
        awayGKKit,
        refereeKit,
        gameDayManager,
        homeTeamContact,
        awayTeamContact,
        mdoc,
        cometSupport,
      };
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
});

// https://jgalrtznvgegzlshobzj.supabase.co/storage/v1/object/public/logos/competitions/255517628.png
