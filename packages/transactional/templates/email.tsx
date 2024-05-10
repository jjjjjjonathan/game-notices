import { Button, Tailwind } from 'jsx-email';

export const Template = () => (
  <Tailwind production={true}>
    <Button className="bg-emerald-500 px-3 py-2 font-medium leading-4 text-white">
      Click me
    </Button>
  </Tailwind>
);
