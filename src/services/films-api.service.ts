import type { ApiFilmDetails, ApiFilms, ApiGenresResponse } from '@models';
import type { MediaType, TmdbVideo } from '@types';

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

export const getMediaByType = async (
  mediaType: MediaType,
  page: number
): Promise<ApiFilms> => {
  return await fetch(
    `${baseUrl}/discover/${mediaType}?include_adult=false&include_video=false&language=uk-UK&page=${page}&sort_by=vote_count.desc&vote_average.gte=6&api_key=${tmdbApiKey}`
  ).then((response: Response) => response.json());
};

export const getFilmDetails = async (
  mediaType: MediaType,
  filmId: number
): Promise<ApiFilmDetails> => {
  return await fetch(
    `${baseUrl}/${mediaType}/${filmId}?language=uk-UK&api_key=${tmdbApiKey}`
  ).then((response: Response) => response.json());
};

export const getFilmTrailer = async (
  mediaType: MediaType,
  filmId: number
): Promise<string | null> => {
  const lang =
    navigator.language.startsWith('uk') || navigator.language === 'uk-UK'
      ? 'uk-UK'
      : 'en-US';

  const url = `${baseUrl}/${mediaType}/${filmId}/videos?language=${lang}&api_key=${tmdbApiKey}`;

  try {
    const res = await fetch(url);
    const data: { results: TmdbVideo[] } = await res.json();

    if (!data.results?.length) return null;

    const video = pickVideo(data.results);

    return video ? `https://www.youtube.com/embed/${video.key}` : null;
  } catch {
    return null;
  }
};

export const getFilmsByGenre = async (
  mediaType: MediaType,
  genreId: number,
  page = 1
): Promise<ApiFilms> => {
  return await fetch(
    `${baseUrl}/discover/${mediaType}?with_genres=${genreId}&page=${page}&language=uk-UK&api_key=${tmdbApiKey}`
  ).then((response: Response) => response.json());
};

const pickVideo = (videos: TmdbVideo[]): TmdbVideo | undefined =>
  videos.find((v) => v?.key && v.site === 'YouTube' && v.type === 'Trailer') ??
  videos.find((v) => v?.key && v.site === 'YouTube') ??
  videos.find((v) => !!v?.key);
