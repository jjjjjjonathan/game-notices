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
import { people, matchCommissioners } from '../db/schema';
import { asc, eq, and } from 'drizzle-orm';

dotenv.config();

export const cometRouter = createTRPCRouter({
  getMatches: publicProcedure
    .input(
      z.object({
        date: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
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

      const cometSupportOptions = await ctx.db
        .select()
        .from(people)
        .where(
          and(eq(people.isCometSupport, true), eq(people.contactRoleId, 3)),
        )
        .orderBy(asc(people.id));

      return { matches: data, cometSupportOptions };
    }),

  getAdditionalMatchDetails: publicProcedure
    .input(
      z.object({
        matchId: z.number(),
        homeTeamId: z.number(),
        awayTeamId: z.number(),
        cometSupportName: z.string(),
        isLeagueHosted: z.boolean(),
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

      const [matchCommissioner] = data.matchOfficials.filter(
        (matchOfficial) => matchOfficial.role === 'Match coordinator',
      );

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
      } = await getContacts(
        input.homeTeamId,
        input.awayTeamId,
        matchCommissioner ? matchCommissioner.personId : -1,
        input.cometSupportName,
        input.isLeagueHosted,
      );

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
});
