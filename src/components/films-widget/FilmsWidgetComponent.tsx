import { useEffect, useId } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { useAppDispatch, useAppSelector } from '@redux';
import { filmsWidgetActions } from '@redux/slices';

import { FilmCardComponent } from '@components/shared';

import type { MediaSourceType, MediaType } from '@types';

type FilmsWidgetProps = {
  title: string;
  source: MediaSourceType;
  mediaType?: MediaType;
  getGenreNames: (genreIds: number[] | undefined, type?: MediaType) => string;
};

export const FilmsWidgetComponent = ({
  title,
  mediaType = 'movie',
  source,
  getGenreNames
}: FilmsWidgetProps) => {
  const dispatch = useAppDispatch();
  const { films, loading, lastFetch } = useAppSelector(
    (state) => state.filmsWidget.bySource[source][mediaType]
  );
  const filmPrev = `films-prev-${useId()}`;
  const filmNext = `films-next-${useId()}`;

  useEffect(() => {
    if (!lastFetch) {
      dispatch(filmsWidgetActions.loadWidgetFilms({ mediaType, source }));
    }
  }, [dispatch, mediaType, source, lastFetch]);

  if (loading && !lastFetch) {
    return (
      <div className='flex min-h-[60svh] items-center justify-center'>
        <div className='h-10 w-10 animate-spin rounded-full border-b-4 border-red-600' />
      </div>
    );
  }

  if (!films?.length) {
    return (
      <div className='container mx-auto px-3 py-6 text-center text-gray-500'>
        No films found.
      </div>
    );
  }

  return (
    <>
      <h2 className='mt-[84px] text-[32px] font-bold uppercase'>{title}</h2>
      <div className='relative mx-auto py-6'>
        <Swiper
          loop={films.length > 1}
          rewind={films.length <= 1}
          slidesPerView={4}
          spaceBetween={24}
          navigation={{ prevEl: `.${filmPrev}`, nextEl: `.${filmNext}` }}
          modules={[Navigation]}
          className='films-widget-swiper'
          breakpoints={{
            320: { slidesPerView: 1.2 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 }
          }}
        >
          {films.map((film) => (
            <SwiperSlide key={film.id}>
              <div className='group relative h-full select-none'>
                <FilmCardComponent
                  key={film.id}
                  film={film}
                  filmGenres={getGenreNames(film.genre_ids, mediaType)}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation buttons */}
        <button
          className={`${filmPrev} absolute top-1/2 left-[-70px] z-20 -translate-y-1/2 cursor-pointer rounded-full bg-black/70 p-4 text-red-500 shadow-lg ring-1 ring-white/10 transition hover:bg-black/90`}
          aria-label='Previous'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={4}
            stroke='currentColor'
            className='h-8 w-8 text-red-500'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15 19l-7-7 7-7'
            />
          </svg>
        </button>

        <button
          className={`${filmNext} absolute top-1/2 right-[-70px] z-20 -translate-y-1/2 cursor-pointer rounded-full bg-black/70 p-4 text-red-500 shadow-lg ring-1 ring-white/10 transition hover:bg-black/90`}
          aria-label='Next'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={4}
            stroke='currentColor'
            className='h-8 w-8 text-red-500'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9 5l7 7-7 7'
            />
          </svg>
        </button>
      </div>
    </>
  );
};
