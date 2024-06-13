import { createTRPCRouter, publicProcedure } from '../trpc';
import { transporter } from '../../utils/nodemailer';

export const emailRouter = createTRPCRouter({
  sendEmails: publicProcedure.mutation(async () => {
    const info = await transporter.sendMail({
      from: 'Jonathan Cheng <jonathan.cheng@league1.ca>',
      to: ['jonathanmcheng@gmail.com', 'jonathan.m.cheng@gmail.com'],
      subject: 'hello world',
      html: '<strong>it works!</strong>',
    });

    console.log(`Message sent: ${info.messageId}`);
  }),
});
