import type { ApiFilms, ApiGenresResponse } from '@models';
import type { MediaType } from '@types';

const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;
const baseUrl = import.meta.env.VITE_TMDB_BASE_URL;

export const getTrendFilms = async (
  mediaType: MediaType
): Promise<ApiFilms> => {
  return await fetch(
    `${baseUrl}/trending/${mediaType}/week?language=uk-UK&api_key=${tmdbApiKey}`
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
  mediaType: MediaType
): Promise<ApiFilms> => {
  return await fetch(
    `${baseUrl}/discover/${mediaType}?include_adult=false&include_video=false&language=uk-UK&page=1&sort_by=vote_count.desc&api_key=${tmdbApiKey}`
  ).then((response: Response) => response.json());
};

export const getPopularFilmsWidget = async (
  mediaType: MediaType
): Promise<ApiFilms> => {
  return await fetch(
    `${baseUrl}/discover/${mediaType}?language=uk-UK&page=1&sort_by=popularity.desc&vote_average.gte=8&with_origin_country=US&api_key=${tmdbApiKey}`
  ).then((response: Response) => response.json());
};

export const getUpcomingFilmsWidget = async (): Promise<ApiFilms> => {
  return await fetch(
    `${baseUrl}/movie/upcoming?language=uk-UK&page=1&api_key=${tmdbApiKey}`
  ).then((response: Response) => response.json());
};
