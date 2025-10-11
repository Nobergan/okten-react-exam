import type { ApiFilms, ApiGenresResponse } from '@models';
import type { MediaType } from '@types';

const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;
const baseUrl = import.meta.env.VITE_TMDB_BASE_URL;

export const getTrendAllFilms = async (): Promise<ApiFilms> => {
  return await fetch(
    `${baseUrl}/trending/all/week?language=uk-UK&api_key=${tmdbApiKey}`
  ).then((response: Response) => response.json());
};

export const getGenresFilmsList = async (
  mediaType: MediaType
): Promise<ApiGenresResponse> => {
  return await fetch(
    `${baseUrl}/genre/${mediaType}/list?language=uk-UK&api_key=${tmdbApiKey}`
  ).then((response: Response) => response.json());
};

export const getPopularFilms = async (
  mediaType: MediaType | undefined
): Promise<ApiFilms> => {
  return await fetch(
    `${baseUrl}/discover/${mediaType}?include_adult=false&include_video=false&language=uk-UK&page=1&sort_by=vote_count.desc&api_key=${tmdbApiKey}`
  ).then((response: Response) => response.json());
};
