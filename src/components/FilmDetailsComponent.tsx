import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@redux';
import { filmDetailsActions, makeFilmKey } from '@redux/slices';

import { getDate, getGenres, getRuntime, getTitle } from '@utils';

import type { TransformedMediaType } from '@types';
import { Media } from '@constants';

type Props = { mediaType: TransformedMediaType; id: number };

export const FilmDetailsComponent = ({ mediaType, id }: Props) => {
  const dispatch = useAppDispatch();
  const key = makeFilmKey(mediaType, id);
  const { loading, error, data, lastFetch, trailerUrl } =
    useAppSelector((state) => state.filmDetails.byKey[key]) ?? {};

  const isTv = mediaType === Media.Tv;

  useEffect(() => {
    if (!lastFetch) {
      dispatch(filmDetailsActions.loadFilmDetails({ mediaType, id }));
      dispatch(filmDetailsActions.loadFilmTrailer({ mediaType, id }));
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch, mediaType, id, lastFetch, loading]);

  if (loading && !data) {
    return (
      <div className='flex min-h-[60svh] items-center justify-center'>
        <div className='h-10 w-10 animate-spin rounded-full border-b-4 border-red-600' />
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className='container mx-auto px-3 py-6 text-center text-red-400'>
        {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className='container mx-auto px-3 py-6 text-center text-gray-500'>
        No details found.
      </div>
    );
  }

  return (
    <div className='container w-full text-white'>
      {/* Trailer */}
      {trailerUrl && (
        <div className='mt-[82px] px-3'>
          <div className='relative w-full overflow-hidden rounded-xl pb-[56.25%] shadow-xl ring-1 ring-white/10 sm:rounded-2xl'>
            <iframe
              src={trailerUrl}
              title='Трейлер'
              loading='lazy'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
              className='absolute top-0 left-0 h-full w-full'
            />
          </div>
        </div>
      )}

      {/* Title and Genres */}
      <div className='px-3 pt-5 sm:pt-8'>
        <div className='flex flex-wrap items-baseline gap-2 sm:gap-3'>
          <h1 className='text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl'>
            {getTitle(data)}
          </h1>
          {getDate(data) && (
            <span className='text-2xl font-medium text-neutral-400 sm:text-3xl md:text-4xl'>
              {getDate(data)}
            </span>
          )}
        </div>

        <div className='mt-2 text-base font-semibold text-white sm:mt-3 sm:text-xl md:text-2xl'>
          {getGenres(data)}
        </div>
      </div>

      {/* Content */}
      <div className='px-3 pt-4 pb-8 sm:pt-6 sm:pb-10 md:pt-8 md:pb-12'>
        <div className='grid grid-cols-1 gap-6 md:gap-10 lg:grid-cols-2'>
          {/* Description */}
          <div>
            {data.overview ? (
              <p className='max-w-prose text-base leading-relaxed text-white/95 sm:text-lg sm:leading-[1.75]'>
                {data.overview}
              </p>
            ) : null}
          </div>

          {/* Info */}
          <div className='grid grid-cols-2 gap-x-6 gap-y-6 sm:gap-x-8 sm:gap-y-8 md:grid-cols-3'>
            <div>
              <div className='text-sm font-extrabold tracking-wide uppercase sm:text-base'>
                Рейтинг
              </div>
              <div className='mt-2 text-lg sm:mt-3 sm:text-xl'>
                {typeof data.vote_average === 'number'
                  ? data.vote_average.toFixed(1)
                  : '—'}
              </div>
            </div>

            <div>
              <div className='text-sm font-extrabold tracking-wide uppercase sm:text-base'>
                Країна
              </div>
              <div className='text-l mt-2 whitespace-pre-line sm:mt-3 sm:text-xl'>
                {data.production_countries?.map((c) => c.name).join('\n') ||
                  '—'}
              </div>
            </div>

            {isTv ? (
              <>
                <div>
                  <div className='text-sm font-extrabold tracking-wide uppercase sm:text-base'>
                    Сезонів
                  </div>
                  <div className='mt-2 text-lg sm:mt-3 sm:text-xl'>
                    {data.number_of_seasons ?? '—'}
                  </div>
                </div>

                <div>
                  <div className='text-sm font-extrabold tracking-wide uppercase sm:text-base'>
                    Епізодів
                  </div>
                  <div className='mt-2 text-lg sm:mt-3 sm:text-xl'>
                    {data.number_of_episodes ?? '—'}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className='text-sm font-extrabold tracking-wide uppercase sm:text-base'>
                    Бюджет
                  </div>
                  <div className='mt-2 text-lg sm:mt-3 sm:text-xl'>
                    {typeof data.budget === 'number' && data.budget > 0
                      ? `${data.budget.toLocaleString('uk-UA')} $`
                      : '—'}
                  </div>
                </div>

                <div>
                  <div className='text-sm font-extrabold tracking-wide uppercase sm:text-base'>
                    Тривалість
                  </div>
                  <div className='mt-2 text-lg sm:mt-3 sm:text-xl'>
                    {getRuntime(data, mediaType) ?? '—'}
                  </div>
                </div>
              </>
            )}

            <div>
              <div className='font-extrabод text-sm tracking-wide uppercase sm:text-base'>
                Студія
              </div>
              <div className='mt-2 text-lg whitespace-pre-line sm:mt-3 sm:text-xl'>
                {data.production_companies?.map((c) => c.name).join('\n') ||
                  '—'}
              </div>
            </div>

            <div>
              <div className='text-sm font-extrabold tracking-wide uppercase sm:text-base'>
                Статус
              </div>
              <div className='mt-2 text-lg sm:mt-3 sm:text-xl'>
                {data.status ?? '—'}
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className='mt-8 h-[2px] w-full bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,#f80032_50%,rgba(0,0,0,0)_100%)] sm:mt-10' />
      </div>
    </div>
  );
};
