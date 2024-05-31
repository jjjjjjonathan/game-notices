import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';
import dotenv from 'dotenv';
import axios from 'redaxios';
import type { CometMatchData, MatchAdditionalDetails } from '../../utils/types';
import { createClient } from '@supabase/supabase-js';
import { decode } from 'base64-arraybuffer';
import sharp from 'sharp';

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

const uploadKit = async (svgString: string, name: string) => {
  const buffer = await sharp(Buffer.from(svgString))
    .jpeg({
      quality: 80,
    })
    .flatten({
      background: '#fff',
    })
    .resize({
      height: 66,
      width: 42,
    })
    .toBuffer();
  const base64 = buffer.toString('base64');
  const { data, error } = await supabase.storage
    .from('kits')
    .upload(`${name}.jpg`, decode(base64), {
      contentType: 'image/jpeg',
    });

  return `${process.env.SUPABASE_URL}/storage/v1/object/public/kits/${name}.jpg`;
};

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

  uploadMatchKits: publicProcedure
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
