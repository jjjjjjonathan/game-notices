import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { createTRPCRouter, createContext } from './trpc';
import * as trpcExpress from '@trpc/server/adapters/express';

dotenv.config();

export const appRouter = createTRPCRouter({});
export type AppRouter = typeof appRouter;

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(
  '/trpc/',
  trpcExpress.createExpressMiddleware({ router: appRouter, createContext }),
);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
