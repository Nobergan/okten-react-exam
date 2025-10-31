import type { MediaType } from '@types';
import type { ApiGenresResponse } from '@models';

import { tmdbApi, withApiKey } from '../base.api.ts';

export const genresApi = tmdbApi.injectEndpoints({
  endpoints: (build) => ({
    getGenres: build.query<Record<number, string>, MediaType>({
      query: (mediaType) => ({
        url: `/genre/${mediaType}/list`,
        params: withApiKey()
      }),
      transformResponse: (resp: ApiGenresResponse) => {
        const map: Record<number, string> = {};

        resp.genres?.forEach((genre) => {
          map[genre.id] = genre.name;
        });

        return map;
      }
    })
  })
});

export const { useGetGenresQuery } = genresApi;
