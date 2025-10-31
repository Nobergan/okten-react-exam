import type { FC } from 'react';

import { UseGenres } from '@hooks';

import type { ApiFilm } from '@models';
import { getDate, getImageUrl } from '@utils';
import type { MediaType } from '@types';

type SearchFilmsListProps = {
  films: ApiFilm[];
  onClick: (item: ApiFilm) => void;
};

export const SearchFilmsList: FC<SearchFilmsListProps> = ({
  films,
  onClick
}) => {
  const { getGenreNames } = UseGenres();

  if (!films?.length) {
    return (
      <div className='rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/60'>
        Нічого не знайдено.
      </div>
    );
  }

  return (
    <ul className='divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-black/70 backdrop-blur'>
      {films.map((film) => {
        return (
          <li
            className='group flex w-full cursor-pointer items-start gap-4 p-3 text-left text-white/90 transition hover:bg-white/10'
            key={`${film.id}`}
            onClick={() => onClick(film)}
          >
            {/* Poster */}
            <div className='h-16 w-12 flex-shrink-0 overflow-hidden rounded-md bg-white/10 ring-1 ring-white/10'>
              <img
                src={getImageUrl(film.poster_path, 'w500')}
                alt={film.title || film.name}
                className='h-full w-full object-cover'
                loading='lazy'
              />
            </div>

            {/* Content */}
            <div className='min-w-0 flex-1'>
              {/* Title row */}
              <div className='flex items-start justify-between gap-3'>
                <div className='min-w-0'>
                  <div className='truncate text-sm font-semibold'>
                    {film.title || film.name}
                  </div>
                  {film.original_title ||
                    (film.original_name && (
                      <div className='mt-0.5 truncate text-[11px] text-white/50'>
                        {film.original_title || film.original_name}
                      </div>
                    ))}
                </div>

                {/* Rating badge */}
                <div className='flex flex-none items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/90 ring-1 ring-white/10'>
                  <svg
                    viewBox='0 0 24 24'
                    width='14'
                    height='14'
                    className='text-orange-500'
                    aria-hidden
                  >
                    <path
                      d='M12 2l2.9 6.26L22 9.27l-5 4.87L18.2 22 12 18.56 5.8 22 7 14.14 2 9.27l7.1-1.01L12 2z'
                      fill='currentColor'
                    />
                  </svg>
                  {film.vote_average && <span>{film.vote_average}</span>}
                </div>
              </div>

              {/* Meta row */}
              <div className='mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-white/60'>
                {getDate(film)}
                <div>
                  <span className='truncate'>
                    {getGenreNames(
                      film.genre_ids,
                      film.media_type as MediaType
                    )}
                  </span>
                </div>
              </div>

              {/* Overview */}
              {film.overview && (
                <p className='mt-1 line-clamp-2 text-[12px] leading-5 text-white/70'>
                  {film.overview}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};
