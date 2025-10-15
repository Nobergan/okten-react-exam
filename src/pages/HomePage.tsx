import { HeroSliderComponent } from '@components/shared';
import { FilmsWidgetComponent } from '@components';

import { UseGenres } from '@hooks';

import { homeWidgetSections, Media, MediaSource } from '@constants';

export const HomePage = () => {
  const { getGenreNames } = UseGenres();

  return (
    <>
      <HeroSliderComponent
        source={MediaSource.Trend}
        mediaType={Media.All}
        getGenreNames={getGenreNames}
      />
      <div className='container'>
        {homeWidgetSections.map(({ key, title, source, mediaType }) => (
          <FilmsWidgetComponent
            title={title}
            source={source}
            mediaType={mediaType}
            getGenreNames={getGenreNames}
            key={key}
          />
        ))}
      </div>
    </>
  );
};
