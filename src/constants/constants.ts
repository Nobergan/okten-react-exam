import { MediaSource } from './media-source.constant.ts';
import { Media } from './media.constant.ts';

export const TTL_MS = 5 * 60 * 1000;
export const HOME_WIDGET_SECTIONS = [
  {
    key: 'trend-movies',
    title: 'Фільми в тренді',
    source: MediaSource.Trend
  },
  {
    key: 'trend-tv',
    title: 'Серіали в тренді',
    source: MediaSource.Trend,
    mediaType: Media.Tv
  },
  {
    key: 'popular-movies',
    title: 'Популярні фільми',
    source: MediaSource.Popular
  },
  {
    key: 'popular-tv',
    title: 'Популярні серіали',
    source: MediaSource.Popular,
    mediaType: Media.Tv
  },
  {
    key: 'upcoming',
    title: 'В очікуванні',
    source: MediaSource.Upcoming
  }
];
export const NAV_LINKS = [
  { to: '/', label: 'Головна', end: true },
  { to: '/movies', label: 'Фільми', match: ['/movies', '/movie'] },
  { to: '/tv', label: 'Серіали' }
];
// Pagination
export const FILMS_LIST_MAX_PAGE_COUNT = 500;
export const FILMS_LIST_STORAGE_KEY_PREFIX = 'filmsPage:';
export const PAGINATION_LABELS = {
  next: 'Наступна',
  previous: 'Попередня',
  break: '…'
};
export const PAGINATION_CLASSES = {
  container:
    'w-full flex flex-nowrap items-center justify-between gap-1 sm:gap-1.5 md:gap-2',
  pageLink:
    'cursor-pointer inline-flex items-center justify-center h-8 sm:h-9 md:h-10 px-2 sm:px-3 md:px-4 rounded-lg md:rounded-xl border border-white/30 text-white text-[11px] sm:text-sm md:text-base leading-none hover:!bg-red-600 hover:border-transparent transition',
  navLink:
    'cursor-pointer inline-flex items-center justify-center h-8 sm:h-9 md:h-10 px-2 sm:px-3 md:px-4 rounded-lg md:rounded-xl border border-white/30 text-white text-[11px] sm:text-sm md:text-base leading-none hover:!bg-red-600 hover:border-transparent transition',
  breakLink:
    'cursor-pointer inline-flex items-center justify-center h-8 sm:h-9 md:h-10 px-1.5 sm:px-2 text-white/70 text-[11px] sm:text-sm leading-none',
  activeLink: 'cursor-pointer !bg-red-600 !text-white border-transparent',
  disabledLink:
    'cursor-pointer opacity-50 cursor-not-allowed hover:!bg-transparent hover:!border-white/30'
};
