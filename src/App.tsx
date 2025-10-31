import { Outlet } from 'react-router';

import { Footer, Header } from '@components/shared';

import './App.css';

export const App = () => {
  return (
    <>
      <Header />
      <main className='min-h-screen bg-black font-sans text-[14px] text-white'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
