import { useEffect, useId } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { useAppDispatch, useAppSelector } from '@redux';
import { filmsWidgetActions } from '@redux/slices';

import { FilmCardComponent } from '@components/shared';

import type { MediaSourceType, MediaType } from '@types';
import { useNavigate } from 'react-router';

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
  const { films, loading, error, lastFetch } = useAppSelector(
    (state) => state.filmsWidget.bySource[source][mediaType]
  );
  const navigate = useNavigate();

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

  if (error && !films.length) {
    return (
      <div className='container mx-auto px-3 py-6 text-center text-red-400'>
        {error}
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
      <h2 className='mt-[56px] text-2xl font-bold uppercase sm:mt-[72px] lg:mt-[52px] lg:text-[32px]'>
        {title}
      </h2>

      <div className='relative mx-auto py-4 sm:py-5 lg:py-6'>
        <Swiper
          loop={films.length > 1}
          rewind={films.length <= 1}
          slidesPerView={4}
          navigation={{ prevEl: `.${filmPrev}`, nextEl: `.${filmNext}` }}
          modules={[Navigation]}
          className='films-widget-swiper touch-pan-y'
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 0 },
            1024: { slidesPerView: 4, spaceBetween: 24 }
          }}
        >
          {films.map((film) => (
            <SwiperSlide key={film.id}>
              <div className='group relative mx-auto h-full w-[80%] select-none md:w-[80%] lg:w-[100%]'>
                <FilmCardComponent
                  key={film.id}
                  film={film}
                  filmGenres={getGenreNames(film.genre_ids, mediaType)}
                  onClick={() => {
                    navigate(`/${film.media_type || mediaType}/${film.id}`);
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation buttons (mobile-friendly) */}
        <button
          className={[
            filmPrev,
            'absolute z-20 cursor-pointer rounded-full bg-black/70 text-red-500 shadow-lg ring-1 ring-white/10 transition',
            'p-2 md:p-3',
            'top-1/2 left-[-10px] -translate-y-1/2 md:left-[-14px] lg:left-[-70px]'
          ].join(' ')}
          aria-label='Previous'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={4}
            stroke='currentColor'
            className='h-5 w-5 text-red-500 md:h-6 md:w-6'
            aria-hidden
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15 19l-7-7 7-7'
            />
          </svg>
          <span className='sr-only'>Previous</span>
        </button>

        <button
          className={[
            filmNext,
            'absolute z-20 cursor-pointer rounded-full bg-black/70 text-red-500 shadow-lg ring-1 ring-white/10 transition',
            'p-2 md:p-3',
            'top-1/2 right-[-10px] -translate-y-1/2 md:right-[-14px] lg:right-[-70px]'
          ].join(' ')}
          aria-label='Next'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={4}
            stroke='currentColor'
            className='h-5 w-5 text-red-500 md:h-6 md:w-6'
            aria-hidden
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9 5l7 7-7 7'
            />
          </svg>
          <span className='sr-only'>Next</span>
        </button>
      </div>
    </>
  );
};
