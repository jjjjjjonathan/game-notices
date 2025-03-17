import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

const BUCKET = 'pdf-notices';

export const storageRouter = createTRPCRouter({
  storeMatchNotice: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { data, error } = await ctx.supabase.storage
        .from(BUCKET)
        .createSignedUploadUrl(`match-notices/${input.id}.pdf`);

      if (data) {
        return data.token;
      } else {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error.message,
        });
      }
    }),

  getSignedUrl: publicProcedure
    .input(
      z.object({
        filePath: z.string().startsWith('match-notices/'),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { data, error } = await ctx.supabase.storage
        .from(BUCKET)
        .createSignedUrl(input.filePath, 60);

      if (data) {
        return data.signedUrl;
      } else {
        return error.message;
      }
    }),
});
