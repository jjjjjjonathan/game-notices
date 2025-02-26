import { createTRPCRouter, publicProcedure } from '../trpc';

export const storageRouter = createTRPCRouter({
  getSignedUrl: publicProcedure.mutation(async ({ ctx }) => {
    const { data, error } = await ctx.supabase.storage
      .from('pdf-notices')
      .createSignedUrl('match-notices/test.pdf', 600);

    if (data) {
      return data.signedUrl;
    } else {
      return error.message;
    }
  }),
});
