import { type FC } from 'react';

type TrailerFallbackProps = {
  title: string;
  isTv: boolean;
  backdropUrl?: string;
};

export const TrailerFallback: FC<TrailerFallbackProps> = ({
  title,
  isTv,
  backdropUrl
}) => {
  const youTubeQuery = encodeURIComponent(
    `${title} ${isTv ? 'tv' : ''} трейлер`
  );

  return (
    <div className='absolute inset-0'>
      {backdropUrl ? (
        <img
          src={backdropUrl}
          alt=''
          className='absolute inset-0 h-full w-full object-cover opacity-40'
          loading='lazy'
        />
      ) : (
        <div className='absolute inset-0 bg-white/5' />
      )}

      <div className='absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/60' />

      <div className='absolute inset-0 flex flex-col items-center justify-center px-4 text-center'>
        <div className='mb-3 rounded-full bg-white/10 p-3 ring-1 ring-white/15'>
          <svg
            width='28'
            height='28'
            viewBox='0 0 24 24'
            fill='none'
            className='text-white/80'
          >
            <path
              d='M4 5h12a2 2 0 012 2v1.5l2.5-1.5v10L18 15.5V17a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2z'
              stroke='currentColor'
              strokeWidth='1.5'
            />
            <path
              d='M3 3l18 18'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
            />
          </svg>
        </div>
        <p className='text-base font-medium text-white/90 sm:text-lg'>
          Трейлер недоступний
        </p>
        <p className='mt-1 text-sm text-white/60'>
          Ми не знайшли офіційний трейлер для цього{' '}
          {isTv ? 'серіалу' : 'фільму'}.
        </p>
        <a
          href={`https://www.youtube.com/results?search_query=${youTubeQuery}`}
          target='_blank'
          rel='noopener noreferrer'
          className='mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white ring-1 ring-white/15 transition hover:bg-white/15'
        >
          Пошукати на YouTube
          <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
            <path d='M8 5l8 7-8 7V5z' fill='currentColor' />
          </svg>
        </a>
      </div>
    </div>
  );
};
