import { HeroSliderComponent } from '@components/shared';
import { Media, MediaSource } from '@constants';

export const TvShowsPage = () => {
  return (
    <>
      <HeroSliderComponent source={MediaSource.Popular} mediaType={Media.Tv} />
    </>
  );
};
