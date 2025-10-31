import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';

import { logo, emptyAvatar } from '@assets';
import type { ApiFilm } from '@models';
import { useSearchFilmsQuery } from '@redux/services';
import { useDebounce } from '@utils';

import { NavLinks } from './NavLinks.tsx';
import { SearchFilmsList } from './SearchFilmsList.tsx';

export const Header = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  const debouncedQuery = useDebounce(query.trim(), 350);
  const shouldQuery = searchOpen && debouncedQuery.length >= 2;

  const { data, isFetching, isError } = useSearchFilmsQuery(
    { name: debouncedQuery, mediaType: 'multi', page: 1 },
    { skip: !shouldQuery }
  );
  const films: ApiFilm[] = data?.results ?? [];

  const handleNavLinkClick = () => {
    setMenuOpen(false);
    setSearchOpen(false);
    setQuery('');
  };

  const handleClickSearchedFilm = (film: ApiFilm) => {
    if (!film?.id) return;

    navigate(`/${film.media_type}/${film.id}`);

    setSearchOpen(false);
    setMenuOpen(false);
    setQuery('');
  };

  return (
    <header className='fixed inset-x-0 top-0 z-100 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60'>
      <div className='relative mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
        {/* Logo */}
        <div className='flex items-center'>
          <NavLink
            to='/'
            className='logo cursor-pointer'
            onClick={handleNavLinkClick}
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
          <NavLinks
            listClassName='flex items-center gap-8'
            onItemClick={handleNavLinkClick}
          />
        </nav>

        {/* Right block */}
        <div className='flex items-center gap-3 sm:gap-4'>
          {/* Search button */}
          <button
            type='button'
            onClick={() => {
              setSearchOpen((prev) => !prev);
              if (searchOpen) setQuery('');
            }}
            className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-white/80 transition hover:text-white focus:outline-none'
            aria-label={searchOpen ? 'Закрити пошук' : 'Відкрити пошук'}
          >
            {searchOpen ? (
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M18 6L6 18M6 6l12 12'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                />
              </svg>
            ) : (
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                <circle
                  cx='11'
                  cy='11'
                  r='7'
                  stroke='currentColor'
                  strokeWidth='2'
                />
                <path
                  d='M20 20L16.65 16.65'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                />
              </svg>
            )}
          </button>

          {/* Avatar */}
          <NavLink
            to='/'
            className='hidden flex-col items-center text-white transition-opacity hover:opacity-90 sm:flex'
            onClick={handleNavLinkClick}
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
              className={`h-0.5 w-6 rounded bg-current transition-all duration-300 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`}
            />
            <span
              className={`h-0.5 w-6 rounded bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}
            />
            <span
              className={`h-0.5 w-6 rounded bg-current transition-all duration-300 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Search box */}
      {searchOpen && (
        <div className='relative z-100 mx-auto w-full max-w-2xl px-4 pb-4'>
          {/* Search input */}
          <form className='relative' role='search' aria-label='Пошук фільмів'>
            <input
              type='text'
              inputMode='search'
              placeholder='Пошук фільмів...'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className='h-12 w-full rounded-full bg-white/10 pr-12 pl-5 text-[15px] text-white placeholder-white/60 ring-1 ring-white/10 transition outline-none focus:ring-2 focus:ring-white/25'
              autoComplete='off'
            />
            {query && (
              <button
                type='button'
                onClick={() => setQuery('')}
                className='absolute top-1/2 right-3 -translate-y-1/2 text-white/70 hover:text-white'
                aria-label='Очистити пошук'
              >
                <svg width='18' height='18' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M18 6L6 18M6 6l12 12'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                  />
                </svg>
              </button>
            )}
          </form>

          {/* Searched films list */}
          {(isFetching || isError || (shouldQuery && films.length > 0)) && (
            <div className='absolute top-full right-0 left-0 z-100 mt-[-10px]'>
              <div className='z-100 max-h-[60vh] overflow-auto rounded-xl border border-white/10 bg-black/90 shadow-xl backdrop-blur'>
                {isFetching && (
                  <div className='p-4 text-sm text-white/70'>Завантаження…</div>
                )}
                {!isFetching && isError && (
                  <div className='p-4 text-sm text-red-300'>
                    Сталася помилка під час пошуку.
                  </div>
                )}
                {!isFetching && !isError && (
                  <SearchFilmsList
                    films={films}
                    onClick={(item) => handleClickSearchedFilm(item)}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <nav
          className='animate-fadeIn absolute inset-x-0 top-[72px] z-40 border-t border-white/10 bg-black/95 py-5 backdrop-blur-sm md:hidden'
          aria-label='Mobile'
        >
          <NavLinks
            listClassName='flex flex-col items-center gap-4'
            onItemClick={handleNavLinkClick}
          />
          <div className='mt-2'>
            <NavLink
              to='/profile'
              className='flex flex-col items-center text-white transition-opacity hover:opacity-90'
              onClick={handleNavLinkClick}
            >
              <img
                src={emptyAvatar}
                alt='Avatar'
                className='mb-1 h-12 w-12 rounded-full ring-1 ring-white/20'
              />
              <p className='text-sm font-medium tracking-wide'>Volodymyr</p>
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  );
};
