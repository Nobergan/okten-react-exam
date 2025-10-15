import { getDate, getImageUrl, getTitle } from '@utils';
import type { ApiFilm } from '@models';

type FilmCardProps = { film: ApiFilm; filmGenres: string };

export const FilmCardComponent = ({ film, filmGenres }: FilmCardProps) => {
  return (
    <>
      <div className='relative overflow-hidden rounded-2xl bg-zinc-900/40'>
        {/* Poster */}
        <div className='aspect-[2/3] w-full'>
          {film.poster_path ? (
            <img
              src={getImageUrl(film.poster_path, 'original')}
              alt={getTitle(film)}
              loading='lazy'
              className='h-full w-full rounded-2xl object-cover'
            />
          ) : (
            <div className='flex h-full w-full items-center justify-center text-sm text-zinc-400'>
              No image
            </div>
          )}
        </div>

        {/* Film info */}
        <div className='px-3 pt-3 pb-4'>
          <div className='flex items-center gap-3'>
            <h3 className='line-clamp-1 text-base font-semibold text-white'>
              {getTitle(film)}
            </h3>
            <div className='ml-auto flex items-center gap-1'>
              <svg
                viewBox='0 0 24 24'
                width='18'
                height='18'
                className='text-orange-500'
                aria-hidden
              >
                <path
                  d='M12 2l2.9 6.26L22 9.27l-5 4.87L18.2 22 12 18.56 5.8 22 7 14.14 2 9.27l7.1-1.01L12 2z'
                  fill='currentColor'
                />
              </svg>
              <span className='text-sm font-semibold text-white'>
                {film.vote_average?.toFixed(1) ?? '—'}
              </span>
            </div>
          </div>
          <div className='mt-1 flex items-center gap-2 text-sm text-zinc-400'>
            <span className='opacity-90'>{getDate(film)}</span>
            <span className='line-clamp-1 text-xs sm:text-sm md:text-base'>
              {filmGenres}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
