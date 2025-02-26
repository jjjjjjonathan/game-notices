import { createTRPCRouter, publicProcedure } from '../trpc';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_API_KEY || '',
);

export const storageRouter = createTRPCRouter({
  getSignedUrl: publicProcedure.mutation(async () => {
    const { data, error } = await supabase.storage
      .from('pdf-notices')
      .createSignedUrl('match-notices/test.pdf', 600);

    if (data) {
      return data.signedUrl;
    } else {
      return error.message;
    }
  }),
});
