import { trpc } from '../utils/trpc';

export const Test = () => {
  const { data } = trpc.cometData.testRouter.useQuery();
  return <p>{data}</p>;
};
