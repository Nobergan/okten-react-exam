import { tmdbApi, withApiKey } from '../base.api.ts';
import type { ApiFilms } from '@models';
import type { MediaType } from '@types';

export const filmsListApi = tmdbApi.injectEndpoints({
  endpoints: (build) => ({
    getFilmsList: build.query<
      ApiFilms,
      { mediaType: MediaType; page: number; genreId?: number }
    >({
      query: ({ mediaType, page, genreId }) => ({
        url: `/discover/${mediaType}`,
        params: withApiKey({
          include_adult: false,
          include_video: false,
          sort_by: 'popularity.desc',
          page,
          ...(genreId ? { with_genres: String(genreId) } : {})
        })
      }),
      transformResponse: (response: ApiFilms): ApiFilms => ({
        page: response.page ?? 1,
        results: response.results ?? [],
        total_pages: response.total_pages ?? 1,
        total_results:
          response.total_results ??
          (response.results ? response.results.length : 0)
      })
    })
  })
});

export const { useGetFilmsListQuery } = filmsListApi;
