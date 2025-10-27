import { MediaSource } from './media-source.constant.ts';
import { Media } from './media.constant.ts';
import type { GroupBase, StylesConfig } from 'react-select';
import type { GenreOption } from '@types';

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
// Genres select styles
export const GENRES_SELECT_STYLES: StylesConfig<
  GenreOption,
  false,
  GroupBase<GenreOption>
> = {
  control: (base, state) => ({
    ...base,
    backgroundColor: '#111315',
    border: 'none',
    boxShadow: state.isFocused ? '0 0 0 2px #1f2937' : 'none',
    minHeight: 56,
    borderRadius: 16,
    paddingLeft: 14,
    paddingRight: 6,
    cursor: 'pointer',
    color: '#fff'
  }),
  placeholder: (base) => ({
    ...base,
    color: '#E5E7EB',
    fontWeight: 600,
    fontSize: 18
  }),
  singleValue: (base) => ({
    ...base,
    color: '#FFFFFF',
    fontWeight: 600,
    fontSize: 18
  }),
  valueContainer: (base) => ({
    ...base,
    padding: '0 4px'
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: '#E5E7EB',
    paddingRight: 12,
    ':hover': { color: '#FFFFFF' }
  }),
  indicatorSeparator: () => ({ display: 'none' }),

  menu: (base) => ({
    ...base,
    marginTop: 10,
    backgroundColor: '#0F1113',
    borderRadius: 20,
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0,0,0,.45), 0 2px 10px rgba(0,0,0,.4)'
  }),
  menuList: (base) => ({
    ...base,
    padding: 8,
    maxHeight: 360
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused
      ? '#1A1D21'
      : state.isSelected
        ? '#1F2328'
        : 'transparent',
    color: '#FFFFFF',
    borderRadius: 12,
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 14,
    paddingRight: 14,
    margin: '2px 6px',
    fontSize: 20,
    lineHeight: '24px',
    cursor: 'pointer'
  })
};
