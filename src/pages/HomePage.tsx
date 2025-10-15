import { HeroSliderComponent } from '@components/shared';
import { FilmsWidgetComponent } from '@components';

import { UseGenres } from '@hooks';

import { HOME_WIDGET_SECTIONS, Media, MediaSource } from '@constants';

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
        <div className='mt-13 h-[2px] w-full bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,#f80032_50%,rgba(0,0,0,0)_100%)]' />

        {HOME_WIDGET_SECTIONS.map(({ key, title, source, mediaType }) => (
          <FilmsWidgetComponent
            title={title}
            source={source}
            mediaType={mediaType}
            getGenreNames={getGenreNames}
            key={key}
          />
        ))}

        <div className='mt-13 h-[2px] w-full bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,#f80032_50%,rgba(0,0,0,0)_100%)]' />
      </div>
    </>
  );
};
