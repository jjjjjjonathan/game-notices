import { Button, Tailwind, Html, Body } from 'jsx-email';

export const Template = () => (
  <Tailwind production={true}>
    <Html lang='en'>
      <Body className='bg-white'>
        <Button className='bg-emerald-500 px-3 py-2 font-medium leading-4 text-white'>
          Click me
        </Button>
      </Body>
    </Html>
  </Tailwind>
);
