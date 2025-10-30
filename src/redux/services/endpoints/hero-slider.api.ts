import { tmdbApi, withApiKey } from '@redux/services';

import type { ApiFilm, ApiFilms } from '@models';
import type { MediaSourceType, MediaType } from '@types';
import { MediaSource } from '@constants';

const buildUrl = (source: MediaSourceType, mediaType: MediaType) => {
  if (source === MediaSource.Trend)
    return {
      url: `/trending/${mediaType}/week`,
      params: withApiKey()
    };

  return {
    url: `/discover/${mediaType}`,
    params: withApiKey({
      include_adult: false,
      include_video: false,
      page: 1,
      sort_by: 'popularity.desc',
      'vote_average.gte': 8
    })
  };
};

export const heroFilmsApi = tmdbApi.injectEndpoints({
  endpoints: (build) => ({
    getHeroFilms: build.query<
      ApiFilm[],
      { source: MediaSourceType; mediaType: MediaType }
    >({
      query: ({ source, mediaType }) => buildUrl(source, mediaType),
      transformResponse: (resp: ApiFilms) => resp?.results ?? []
    })
  })
});

export const { useGetHeroFilmsQuery } = heroFilmsApi;
