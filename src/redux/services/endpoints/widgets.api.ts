import { MediaSource } from '@constants';
import type { MediaSourceType, MediaType } from '@types';
import type { ApiFilm, ApiFilms } from '@models';

import { tmdbApi, withApiKey } from '../base.api';

const buildUrl = (source: MediaSourceType, mediaType: MediaType) => {
  if (source === MediaSource.Trend)
    return {
      url: `/trending/${mediaType}/week`,
      params: withApiKey()
    };
  if (source === MediaSource.Popular)
    return {
      url: `/${mediaType}/popular`,
      params: withApiKey()
    };
  return { url: `/movie/upcoming`, params: withApiKey() };
};

export const widgetsApi = tmdbApi.injectEndpoints({
  endpoints: (build) => ({
    getWidgetFilms: build.query<
      ApiFilm[],
      { source: MediaSourceType; mediaType: MediaType }
    >({
      query: ({ source, mediaType }) => buildUrl(source, mediaType),
      transformResponse: (response: ApiFilms) => response?.results ?? []
    })
  })
});

export const { useGetWidgetFilmsQuery } = widgetsApi;
