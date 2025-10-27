import { FilmsListComponent, HeroSliderComponent } from '@components/shared';

import { UseGenres } from '@hooks';

import { Media, MediaSource } from '@constants';

export const TvShowsPage = () => {
  const { getGenreNames } = UseGenres();

  return (
    <>
      <HeroSliderComponent
        source={MediaSource.Popular}
        mediaType={Media.Tv}
        getGenreNames={getGenreNames}
      />
      <FilmsListComponent
        mediaType={Media.Tv}
        getGenreNames={getGenreNames}
        title={'Серіали'}
      />
    </>
  );
};
