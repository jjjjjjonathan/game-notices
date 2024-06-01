import { createTRPCRouter, publicProcedure } from '../trpc';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const cometDataRouter = createTRPCRouter({
  sendEmails: publicProcedure.mutation(async () => {
    const { data, error } = await resend.batch.send([
      {
        from: 'Acme <onboarding@resend.dev>',
        to: ['delivered@resend.dev'],
        subject: 'hello world',
        html: '<strong>it works!</strong>',
      },
    ]);
  }),
});
