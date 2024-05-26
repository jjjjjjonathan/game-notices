import { createTRPCRouter, publicProcedure } from '../trpc';

export const cometDataRouter = createTRPCRouter({
  testRouter: publicProcedure.query(() => {
    return 'Hello from tRPC!';
  }),
});
