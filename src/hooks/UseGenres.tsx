import { useCallback, useMemo } from 'react';

import { useGetGenresQuery } from '@redux/services';

import { Media } from '@constants';
import type { MediaType } from '@types';

export const UseGenres = () => {
  const { data: movieMap } = useGetGenresQuery(Media.Movie);
  const { data: tvMap } = useGetGenresQuery(Media.Tv);

  const genreMaps = useMemo(
    () => ({
      movie: new Map(
        Object.entries(movieMap ?? {}).map(([id, name]) => [Number(id), name])
      ),
      tv: new Map(
        Object.entries(tvMap ?? {}).map(([id, name]) => [Number(id), name])
      )
    }),
    [movieMap, tvMap]
  );

  const getGenreNames = useCallback(
    (ids: number[] | undefined, type: MediaType = Media.Movie) => {
      if (!ids?.length) return '';
      const map = type === Media.Tv ? genreMaps.tv : genreMaps.movie;
      return ids
        .map((id) => map.get(id))
        .filter(Boolean)
        .join(', ');
    },
    [genreMaps]
  );

  return { genreMaps, getGenreNames };
};
