import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { people } from '../db/schema';
import { or, eq, inArray, and } from 'drizzle-orm';
import dotenv from 'dotenv';

dotenv.config();

const BUCKET = 'pdf-notices';

const wait = (ms: number) =>
  new Promise((resolve, _reject) => setTimeout(resolve, ms));

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
        .createSignedUrl(input.filePath, 86400);

      if (data) {
        return data.signedUrl;
      } else {
        return error.message;
      }
    }),

  sendNotice: publicProcedure
    .input(
      z.object({
        id: z.number(),
        homeTeamId: z.number(),
        awayTeamId: z.number(),
        mdocEmail: z.string().optional(),
        cometSupportEmail: z.string().optional(),
        refereeIds: z.number().array(),
        homeTeamName: z.string(),
        awayTeamName: z.string(),
        dateTime: z.string(),
        competitionName: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { data, error } = await ctx.supabase.storage
        .from(BUCKET)
        .createSignedUrl(`match-notices/${input.id}.pdf`, 432000);

      if (data) {
        const peopleToSendNotice = await ctx.db
          .selectDistinctOn([people.email])
          .from(people)
          .where(
            or(
              and(
                inArray(people.teamId, [input.homeTeamId, input.awayTeamId]),
                eq(people.contactRoleId, 6),
              ),
              and(
                inArray(people.teamId, [input.homeTeamId, input.awayTeamId]),
                eq(people.contactRoleId, 2),
              ),
              and(
                eq(people.teamId, input.homeTeamId),
                eq(people.contactRoleId, 1),
              ),
              inArray(people.cometId, input.refereeIds),
            ),
          );
        const emailAddresses = peopleToSendNotice.map((person) =>
          person.email.trim(),
        );

        if (input.mdocEmail) {
          emailAddresses.push(input.mdocEmail);
        }

        console.log(emailAddresses);

        try {
          for (let i = 0; i < emailAddresses.length; i += 5) {
            await wait(5000);
            console.log(emailAddresses.slice(i, i + 5));
            const options = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.PLUNK_API_SECRET_KEY}`,
              },
              body: JSON.stringify({
                to: emailAddresses.slice(i, i + 5),
                subject: `Game Notice for match #${input.id}`,
                body: `<p>A game notice has been generated for a ${input.competitionName} match between ${input.homeTeamName} and ${input.awayTeamName} for ${input.dateTime}. The following download link will expire in 5 days.</p>

                <a href=${data.signedUrl}>${data.signedUrl}</a>

                <p>Please contact Lorin Berballa (lorin.berballa@league1.ca), Chris Keem (chris.keem@league1.ca) and Jonathan Cheng (jonathan.cheng@league1.ca) if you have any questions.</p>`,
              }),
            };
            await fetch('https://api.useplunk.com/v1/send', options)
              .then((response) => response.json())
              .then((response) => console.log(response))
              .catch((error) => console.error(error));
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log(error.message);
        throw new TRPCError({
          message: error.message,
          code: 'BAD_REQUEST',
        });
      }
    }),
});
