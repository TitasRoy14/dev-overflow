import { PropsWithChildren } from 'react';

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex min-h-screen w-full items-center justify-center'>
      {children}
    </div>
  );
};

export default layout;