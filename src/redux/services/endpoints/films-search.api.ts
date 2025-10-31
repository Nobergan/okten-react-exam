import { tmdbApi, withApiKey } from '@redux/services';
import type { ApiFilms } from '@models';
import type { MediaType } from '@types';

export const filmsSearchApi = tmdbApi.injectEndpoints({
  endpoints: (build) => ({
    searchFilms: build.query<
      ApiFilms,
      { name: string; mediaType: MediaType; page: number }
    >({
      query: ({ name, mediaType, page }) => ({
        url: `/search/${mediaType}`,
        params: withApiKey({
          include_adult: false,
          query: name,
          page
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

export const { useSearchFilmsQuery } = filmsSearchApi;
