import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const withApiKey = (params?: Record<string, unknown>) => ({
  api_key: TMDB_API_KEY,
  language: 'uk-UA',
  ...(params ?? {})
});

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: TMDB_BASE_URL }),
  keepUnusedDataFor: 3600,
  endpoints: () => ({})
});
