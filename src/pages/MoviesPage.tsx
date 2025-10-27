import { FilmsListComponent, HeroSliderComponent } from '@components/shared';

import { UseGenres } from '@hooks';

import { Media, MediaSource } from '@constants';

export const MoviesPage = () => {
  const { getGenreNames } = UseGenres();

  return (
    <>
      <HeroSliderComponent
        source={MediaSource.Popular}
        mediaType={Media.Movie}
        getGenreNames={getGenreNames}
      />
      <FilmsListComponent
        mediaType={Media.Movie}
        getGenreNames={getGenreNames}
        title={'Фільми'}
      />
    </>
  );
};
