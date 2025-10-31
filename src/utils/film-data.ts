import type { ApiFilm, ApiFilmDetails } from '@models';
import { Media } from '@constants';
import type { MediaType } from '@types';

/**
 * Returns the release year of a film or TV show.
 * Falls back to an empty string if no date is available.
 *
 * @param film - The film or TV show object from the API
 * @returns The first air date or release date year as a string
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
 * Returns formatted runtime string for movie or TV episode length.
 * @param film - The film or TV show object from the API
 * @param mediaType - 'movie' or 'tv'
 * @returns Formatted runtime (e.g. "148 хв" or "42 хв / еп")
 */
export const getRuntime = (
  film: ApiFilmDetails,
  mediaType: MediaType
): string => {
  if (mediaType === Media.Movie && film.runtime) return `${film.runtime} хв`;
  if (mediaType === Media.Tv && film.episode_run_time?.[0])
    return `${film.episode_run_time[0]} хв / еп`;
  return '';
};

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
  size: 'original' | 'w300' | 'w500' | 'w780' | 'w1280' = 'original'
): string => (path ? `https://image.tmdb.org/t/p/${size}/${path}` : '');

/**
 * Returns formatted genre list as comma-separated string.
 */
export const getGenres = (film: ApiFilmDetails): string =>
  film.genres?.map((genre) => genre.name).join(', ') ?? '';
