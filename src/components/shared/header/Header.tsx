import { useState } from 'react';
import { NavLink } from 'react-router';
import './Header.css';

import { logo, emptyAvatar } from '@assets';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const baseLink =
    'relative inline-flex items-center gap-2 px-2 py-1 text-base sm:text-lg tracking-wide text-gray-300 transition-colors duration-200 hover:text-white cursor-pointer group';

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const navLinks = (
    <>
      <li>
        <NavLink to='/' end className={baseLink} onClick={handleLinkClick}>
          Main
          <span className='absolute -bottom-1 left-0 h-[2px] w-0 bg-red-600 transition-all duration-200 group-hover:w-full' />
        </NavLink>
      </li>
      <li>
        <NavLink to='/movies' className={baseLink} onClick={handleLinkClick}>
          Movies
          <span className='absolute -bottom-1 left-0 h-[2px] w-0 bg-red-600 transition-all duration-200 group-hover:w-full' />
        </NavLink>
      </li>
      <li>
        <NavLink to='/tv' className={baseLink} onClick={handleLinkClick}>
          TV Shows
          <span className='absolute -bottom-1 left-0 h-[2px] w-0 bg-red-600 transition-all duration-200 group-hover:w-full' />
        </NavLink>
      </li>
    </>
  );

  return (
    <header className='fixed inset-x-0 top-0 z-50 h-20 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60'>
      <div className='mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
        {/* Left: Logo */}
        <div className='flex items-center'>
          <NavLink
            to='/'
            className='logo cursor-pointer'
            onClick={handleLinkClick}
          >
            <img
              src={logo}
              alt='MixMovie'
              className='h-10 w-auto select-none'
            />
          </NavLink>
        </div>

        {/* Desktop nav */}
        <nav className='hidden md:flex' aria-label='Main'>
          <ul className='flex items-center gap-8'>{navLinks}</ul>
        </nav>

        {/* Right: Avatar */}
        <div className='flex items-center gap-4'>
          <NavLink
            to='/profile'
            className='hidden flex-col items-center text-white transition-opacity hover:opacity-90 sm:flex'
            onClick={handleLinkClick}
          >
            <img
              src={emptyAvatar}
              alt='Avatar'
              className='mb-1 h-10 w-10 rounded-full ring-1 ring-white/20'
            />
            <p className='text-xs font-medium tracking-wide'>Volodymyr</p>
          </NavLink>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className='flex h-8 w-8 flex-col items-center justify-center gap-[5px] text-gray-300 transition hover:text-white md:hidden'
            aria-label='Toggle menu'
          >
            <span
              className={`h-0.5 w-6 rounded bg-current transition-all duration-300 ease-in-out ${
                menuOpen ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`h-0.5 w-6 rounded bg-current transition-all duration-300 ease-in-out ${
                menuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`h-0.5 w-6 rounded bg-current transition-all duration-300 ease-in-out ${
                menuOpen ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <nav
          className='animate-fadeIn absolute inset-x-0 top-[72px] z-40 border-t border-white/10 bg-black/95 backdrop-blur-sm md:hidden'
          aria-label='Mobile'
        >
          <ul className='flex flex-col items-center gap-4 py-4 text-gray-300'>
            {navLinks}
            <li className='mt-2'>
              <NavLink
                to='/profile'
                className='flex flex-col items-center text-white transition-opacity hover:opacity-90'
                onClick={handleLinkClick}
              >
                <img
                  src={emptyAvatar}
                  alt='Avatar'
                  className='mb-1 h-12 w-12 rounded-full ring-1 ring-white/20'
                />
                <p className='text-sm font-medium tracking-wide'>Volodymyr</p>
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};
