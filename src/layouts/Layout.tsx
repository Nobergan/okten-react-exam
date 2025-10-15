import { Outlet } from 'react-router';
import { Header } from '@components/shared';

export const Layout = () => {
  return (
    <>
      <Header />
      <main className='min-h-screen bg-black font-sans text-[14px] text-white'>
        <Outlet />
      </main>
    </>
  );
};
