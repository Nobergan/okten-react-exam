import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import { useGetHeroFilmsQuery } from '@redux/services';
import { getDate, getImageUrl, getTitle, rtkErrorMessage } from '@utils';

import type { MediaSourceType, MediaType } from '@types';
import { TTL_MS } from '@constants';

import './HeroSliderComponent.css';

type HeroSliderProps = {
  source: MediaSourceType;
  mediaType?: MediaType;
  getGenreNames: (genreIds: number[] | undefined, type?: MediaType) => string;
};

export const HeroSliderComponent = ({
  source,
  mediaType = 'movie',
  getGenreNames
}: HeroSliderProps) => {
  const {
    data: films = [],
    isLoading,
    isFetching,
    isError,
    error
  } = useGetHeroFilmsQuery(
    { source, mediaType },
    { refetchOnMountOrArgChange: TTL_MS }
  );

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const navigate = useNavigate();

  const thumbsBreakpoints = useMemo(
    () => ({
      0: { slidesPerView: 4, spaceBetween: 8 },
      360: { slidesPerView: 5, spaceBetween: 8 },
      480: { slidesPerView: 6, spaceBetween: 8 },
      640: { slidesPerView: 7, spaceBetween: 10 },
      768: { slidesPerView: 8, spaceBetween: 10 },
      1024: { slidesPerView: 9, spaceBetween: 12 },
      1280: { slidesPerView: 10, spaceBetween: 12 }
    }),
    []
  );

  if (isLoading && isFetching) {
    return (
      <div className='flex min-h-[60svh] items-center justify-center'>
        <div className='h-10 w-10 animate-spin rounded-full border-b-4 border-red-600' />
      </div>
    );
  }

  if (isError && !films?.length) {
    return (
      <div className='container mx-auto px-3 py-6 text-center text-red-400'>
        {rtkErrorMessage(error)}
      </div>
    );
  }

  return (
    <div className='hero-slider-container'>
      {/* Main Slider */}
      <Swiper
        loop={films.length > 1}
        rewind={films.length <= 1}
        spaceBetween={8}
        navigation
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className='hero-swiper'
      >
        {films.map((film) => (
          <SwiperSlide key={film.id}>
            <div className='relative h-full w-full'>
              <img
                src={getImageUrl(film.backdrop_path, 'original')}
                alt={getTitle(film)}
                className='absolute inset-0 h-full w-full object-cover'
              />

              {/* Separator */}
              <div className='absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.6)_65%,transparent_100%)] sm:bg-[linear-gradient(90deg,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.65)_40%,rgba(0,0,0,0.45)_70%,rgba(0,0,0,0.3)_100%)] lg:bg-[linear-gradient(90deg,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.85)_35%,rgba(0,0,0,0.55)_50%,rgba(0,0,0,0.25)_70%,transparent_100%)]' />

              {/* Content block */}
              <div className='absolute inset-0 flex flex-col justify-end sm:justify-center'>
                <div className='max-w-full px-4 pb-[5.5rem] text-white select-none sm:max-w-[42rem] sm:pb-[7rem] sm:pl-[8%] md:pb-[8rem] md:pl-[10%] lg:max-w-[46rem]'>
                  <h1 className='xs:text-3xl line-clamp-2 text-2xl font-extrabold tracking-tight uppercase drop-shadow-xl sm:text-4xl md:text-6xl'>
                    {getTitle(film)}
                  </h1>

                  <div className='mt-3 flex flex-wrap items-center gap-2 text-neutral-200/90 sm:mt-4 sm:gap-3'>
                    <span className='inline-flex items-center gap-1.5 text-base sm:text-lg'>
                      <svg
                        viewBox='0 0 24 24'
                        className='h-4 w-4 fill-current text-red-500 sm:h-5 sm:w-5'
                        aria-hidden='true'
                      >
                        <path d='M12 2l2.9 6.6 7.1.6-5.3 4.6 1.7 6.9L12 17.9 5.6 20.7l1.7-6.9L2 9.2l7.1-.6L12 2z' />
                      </svg>
                      {typeof film.vote_average === 'number'
                        ? film.vote_average.toFixed(1)
                        : ''}
                    </span>

                    <span className='opacity-60'>•</span>
                    <span className='line-clamp-1 text-xs sm:text-sm md:text-base'>
                      {getGenreNames(film.genre_ids, mediaType)}
                    </span>

                    <span className='opacity-60'>•</span>
                    <span className='text-xs sm:text-sm md:text-base'>
                      {getDate(film)}
                    </span>
                  </div>

                  <p className='mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-200 sm:mt-5 sm:line-clamp-4 sm:text-base md:text-lg'>
                    {film.overview ?? ''}
                  </p>

                  <button
                    type='button'
                    className='mt-4 inline-flex cursor-pointer items-center rounded-full bg-red-600 px-5 py-3 text-sm font-semibold shadow-lg transition-colors hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 active:bg-red-600 sm:mt-6 sm:px-7 sm:py-3.5 sm:text-base'
                    onClick={() => {
                      navigate(`/${film.media_type || mediaType}/${film.id}`);
                    }}
                  >
                    Дивитись
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails */}
      <div className='absolute bottom-0 left-0 z-20 h-20 w-full bg-gradient-to-t from-black/60 via-black/20 to-transparent pb-2 sm:h-24 sm:pb-4 md:h-28'>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={films.length > 10}
          rewind={films.length <= 10}
          freeMode
          watchSlidesProgress
          breakpoints={thumbsBreakpoints}
          spaceBetween={8}
          modules={[FreeMode, Navigation, Thumbs]}
          className='thumbs-swiper h-full px-3 sm:px-4'
        >
          {films.map((film) => (
            <SwiperSlide key={`thumb-${film.id}`}>
              <div className='relative h-full w-full overflow-hidden rounded-md ring-1 ring-white/10'>
                <img
                  src={getImageUrl(film.backdrop_path, 'w300')}
                  alt={getTitle(film)}
                  loading='lazy'
                  className='h-full w-full object-cover'
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
