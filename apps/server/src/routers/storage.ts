import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

const BUCKET = 'pdf-notices';

export const storageRouter = createTRPCRouter({
  storeMatchNotice: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {}),

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
