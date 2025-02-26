import { initTRPC, inferAsyncReturnType } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_API_KEY || '',
  );

  return { supabase };
};
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create({});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
