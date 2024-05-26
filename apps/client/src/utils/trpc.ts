import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@game-notices/server';

export const trpc = createTRPCReact<AppRouter>();
