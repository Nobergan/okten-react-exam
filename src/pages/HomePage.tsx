import { HeroSliderComponent } from '@components/shared';
import { MediaSource } from '@constants';

export const HomePage = () => {
  return (
    <>
      <HeroSliderComponent source={MediaSource.Trend} />
    </>
  );
};
