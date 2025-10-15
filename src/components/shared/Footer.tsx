import { logo } from '@assets';
import { NavLinks } from './NavLinks.tsx';

export default function Footer() {
  return (
    <footer className='w-full bg-black text-white/90'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center gap-6 pt-[52px] pb-10 md:grid md:grid-cols-3 md:items-center md:gap-8'>
          {/* Logo */}
          <div className='flex w-full items-center justify-center md:justify-start'>
            <a
              href='#'
              className='group inline-flex items-center gap-2'
              aria-label='На головну'
            >
              <img
                src={logo}
                alt='MixMovie'
                className='h-10 w-auto select-none'
              />
            </a>
          </div>

          {/* Socials */}
          <nav
            aria-label='Соціальні мережі'
            className='flex items-center justify-center gap-5'
          >
            <a
              href='#'
              className='rounded-xl border border-white/15 p-3 transition-all hover:scale-105 hover:border-white/30 focus:ring-2 focus:ring-white/40 focus:outline-none'
              aria-label='Facebook'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
                className='lucide lucide-facebook-icon lucide-facebook'
              >
                <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' />
              </svg>
            </a>
            <a
              href='#'
              className='rounded-xl border border-white/15 p-3 transition-all hover:scale-105 hover:border-white/30 focus:ring-2 focus:ring-white/40 focus:outline-none'
              aria-label='Telegram'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
                className='lucide lucide-send-icon lucide-send'
              >
                <path d='M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z' />
                <path d='m21.854 2.147-10.94 10.939' />
              </svg>
            </a>
            <a
              href='#'
              className='rounded-xl border border-white/15 p-3 transition-all hover:scale-105 hover:border-white/30 focus:ring-2 focus:ring-white/40 focus:outline-none'
              aria-label='Instagram'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
                className='lucide lucide-instagram-icon lucide-instagram'
              >
                <rect width='20' height='20' x='2' y='2' rx='5' ry='5' />
                <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
                <line x1='17.5' x2='17.51' y1='6.5' y2='6.5' />
              </svg>
            </a>
          </nav>

          {/* Support */}
          <div className='flex w-full items-center justify-center md:justify-end'>
            <a
              href='#'
              className='inline-flex items-center justify-center rounded-2xl border border-white/25 px-6 py-3 text-base font-medium text-white/90 transition-all hover:border-white hover:bg-white/5 focus:ring-2 focus:ring-white/40 focus:outline-none'
            >
              Напишіть нам
            </a>
          </div>
        </div>

        {/* Nav links */}
        <NavLinks listClassName='pb-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[17px] text-white/85 md:text-lg' />

        {/* Divider */}
        <div className='mx-auto h-px w-11/12 bg-white/10' />

        {/* Copyright */}
        <div className='py-6'>
          <p className='text-center text-sm text-white/60'>
            © 2025 All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
