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
  { to: '/movies', label: 'Фільми' },
  { to: '/tv', label: 'Серіали' }
];
