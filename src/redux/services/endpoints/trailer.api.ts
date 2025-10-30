import { tmdbApi, withApiKey } from '../base.api.ts';

import type { ApiVideosResponse, MediaType } from '@types';

export const trailerApi = tmdbApi.injectEndpoints({
  endpoints: (build) => ({
    getFilmTrailer: build.query<
      string | null,
      { mediaType: MediaType; id: number }
    >({
      query: ({ mediaType, id }) => ({
        url: `/${mediaType}/${id}/videos`,
        params: withApiKey({ language: 'uk-UA' })
      }),
      async transformResponse(ua: ApiVideosResponse, _meta, { mediaType, id }) {
        const pick = (response: ApiVideosResponse) =>
          response.results.find(
            (video) =>
              video.site === 'YouTube' &&
              video.type === 'Trailer' &&
              video.official
          ) ||
          response.results.find(
            (video) => video.site === 'YouTube' && video.type === 'Trailer'
          ) ||
          response.results.find((video) => video.site === 'YouTube');

        let video = pick(ua);
        if (!video) {
          const res = await fetch(
            `https://api.themoviedb.org/3/${mediaType}/${id}/videos?${new URLSearchParams(withApiKey({ language: 'en-US' }))}`
          );
          video = pick(await res.json());
        }
        return video ? `https://www.youtube.com/embed/${video.key}` : null;
      }
    })
  })
});

export const { useGetFilmTrailerQuery } = trailerApi;
