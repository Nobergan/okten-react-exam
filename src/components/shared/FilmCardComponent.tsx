import { getDate, getImageUrl, getTitle } from '@utils';
import type { ApiFilm } from '@models';

type FilmCardProps = { film: ApiFilm; filmGenres: string; onClick: () => void };

export const FilmCardComponent = ({
  film,
  filmGenres,
  onClick
}: FilmCardProps) => {
  return (
    <>
      <div
        className='relative cursor-pointer overflow-hidden rounded-2xl bg-zinc-900/40'
        onClick={onClick}
      >
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
        <div className='px-2 pt-3 pb-4 sm:px-3'>
          <div className='flex items-center gap-2 sm:gap-3'>
            <h3 className='line-clamp-1 text-sm font-semibold text-white sm:text-base'>
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
          <div className='mt-1 flex items-center gap-2 text-xs text-zinc-400 sm:text-sm'>
            <span className='opacity-90'>{getDate(film)}</span>
            <span className='line-clamp-1'>{filmGenres}</span>
          </div>
        </div>
      </div>
    </>
  );
};
