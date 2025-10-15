import type { ApiFilm } from '@models';

/**
 * Returns the release date of a film or TV show.
 * Falls back to an empty string if no date is available.
 *
 * @param film - The film or TV show object from the API
 * @returns The first air date or release date as a string
 */
export const getDate = (film: ApiFilm): string =>
  (film.release_date || film.first_air_date)?.slice(0, 4) ?? '';

/**
 * Returns the title or name of a film or TV show.
 * Falls back to an empty string if neither is available.
 *
 * @param film - The film or TV show object from the API
 * @returns The name or title of the film
 */
export const getTitle = (film: ApiFilm): string =>
  film.name || film.title || '';

/**
 * Builds the full image URL for a poster or backdrop from TMDB.
 * Returns an empty string if the path is not provided.
 *
 * @param path - The image path returned by the API
 * @param size - The desired image size ('original', 'w300', 'w780', 'w1280')
 * @returns The complete image URL or an empty string if the path is missing
 */
export const getImageUrl = (
  path: string | null | undefined,
  size: 'original' | 'w300' | 'w780' | 'w1280' = 'original'
): string => (path ? `https://image.tmdb.org/t/p/${size}/${path}` : '');
