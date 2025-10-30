import type { MediaType } from '@types';
import type { ApiFilmDetails } from '@models';

import { tmdbApi, withApiKey } from '../base.api.ts';

export const detailsApi = tmdbApi.injectEndpoints({
  endpoints: (build) => ({
    getFilmDetails: build.query<
      ApiFilmDetails,
      { mediaType: MediaType; id: number }
    >({
      query: ({ mediaType, id }) => ({
        url: `/${mediaType}/${id}`,
        params: withApiKey()
      })
    })
  })
});

export const { useGetFilmDetailsQuery } = detailsApi;
