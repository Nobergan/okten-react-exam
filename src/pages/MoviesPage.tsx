import { HeroSliderComponent } from '@components/shared';
import { Media, MediaSource } from '@constants';

export const MoviesPage = () => {
  return (
    <>
      <HeroSliderComponent
        source={MediaSource.Popular}
        mediaType={Media.Movie}
      />
    </>
  );
};
