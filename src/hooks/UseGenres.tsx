import { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@redux';
import { genresActions } from '@redux/slices';
import type { ApiGenre } from '@models';
import type { MediaType } from '@types';
import { Media } from '@constants';

export const UseGenres = () => {
  const dispatch = useAppDispatch();
  const itemsByType = useAppSelector((state) => state.genres.itemsByType);

  const mapGenresIdsToNames = (arr: ApiGenre[]) =>
    new Map(arr.map((g) => [g.id, g.name]));

  const genreMaps = useMemo(
    () => ({
      movie: mapGenresIdsToNames(itemsByType.movie),
      tv: mapGenresIdsToNames(itemsByType.tv)
    }),
    [itemsByType.movie, itemsByType.tv]
  );

  const getGenreNames = useCallback(
    (ids: number[] | undefined, type?: MediaType | undefined) => {
      if (!ids?.length) return '';

      const map = type === Media.Tv ? genreMaps.tv : genreMaps.movie;

      return ids
        .map((id) => map.get(id))
        .filter(Boolean)
        .join(', ');
    },
    [genreMaps]
  );

  useEffect(() => {
    dispatch(genresActions.loadGenres({ mediaType: Media.Movie }));
    dispatch(genresActions.loadGenres({ mediaType: Media.Tv }));
  }, [dispatch]);

  return { genreMaps, getGenreNames };
};
