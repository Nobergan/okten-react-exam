import { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@redux';
import { filmsListActions } from '@redux/slices';

import { FilmCardComponent } from '@components/shared';
import type { MediaType, TransformedMediaType } from '@types';
import type { ApiFilm } from '@models';
import ReactPaginate from 'react-paginate';
import {
  FILMS_LIST_MAX_PAGE_COUNT,
  FILMS_LIST_STORAGE_KEY_PREFIX,
  PAGINATION_CLASSES,
  PAGINATION_LABELS
} from '@constants';

type FilmsListProps = {
  mediaType: TransformedMediaType;
  getGenreNames: (genreIds: number[] | undefined, type?: MediaType) => string;
  title: string;
};

export const FilmsListComponent = ({
  mediaType = 'movie',
  getGenreNames,
  title
}: FilmsListProps) => {
  const dispatch = useAppDispatch();
  const { films, loading, error, page, totalPages, lastFetch } = useAppSelector(
    (state) => state.filmsList[mediaType]
  );

  const STORAGE_KEY = useMemo(
    () => `${FILMS_LIST_STORAGE_KEY_PREFIX}${mediaType}`,
    [mediaType]
  );
  const currentPageIndex = (page ?? 1) - 1;
  const pageCount = Math.max(
    1,
    Math.min(totalPages || 1, FILMS_LIST_MAX_PAGE_COUNT)
  );

  useEffect(() => {
    const saved = parseInt(localStorage.getItem(STORAGE_KEY) || '1', 10);
    const initialPage = saved > 0 ? saved : 1;

    if (!lastFetch) {
      dispatch(
        filmsListActions.loadFilmsByType({ mediaType, page: initialPage })
      );
    }
  }, [dispatch, mediaType, lastFetch, STORAGE_KEY]);

  useEffect(() => {
    if (page && page >= 1) {
      localStorage.setItem(STORAGE_KEY, String(page));
    }
  }, [page, STORAGE_KEY]);

  const handlePageChange = useCallback(
    (target: { selected: number }) => {
      const nextPage = target.selected + 1;

      dispatch(filmsListActions.loadFilmsByType({ mediaType, page: nextPage }));

      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [dispatch, mediaType]
  );

  if (loading && !lastFetch) {
    return (
      <div className='flex min-h-[50svh] items-center justify-center'>
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

  if (!films.length) {
    return (
      <div className='container mx-auto px-3 py-6 text-center text-gray-500'>
        No films found.
      </div>
    );
  }

  return (
    <div className='container mx-auto px-3'>
      <div className='mt-13 h-[2px] w-full bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,#f80032_50%,rgba(0,0,0,0)_100%)]' />

      <h2 className='color:white mt-[24px] text-center text-2xl font-bold uppercase sm:mt-[40px] sm:mb-[0] lg:mt-[52px] lg:text-[54px]'>
        {title}
      </h2>

      {/* Cards */}
      <div className='grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6'>
        {films.map((film: ApiFilm) => (
          <div key={film.id} className='group'>
            <FilmCardComponent
              film={film}
              filmGenres={getGenreNames(film.genre_ids, mediaType)}
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className='flex justify-center pt-3 pb-6 sm:pt-4 sm:pb-8 md:pt-5 md:pb-10'>
        <div className='flex w-full max-w-[375px] justify-center sm:max-w-[500px]'>
          <ReactPaginate
            breakLabel={PAGINATION_LABELS.break}
            nextLabel={PAGINATION_LABELS.next}
            previousLabel={PAGINATION_LABELS.previous}
            onPageChange={handlePageChange}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            forcePage={
              currentPageIndex >= 0 && currentPageIndex < pageCount
                ? currentPageIndex
                : 0
            }
            containerClassName={PAGINATION_CLASSES.container}
            pageLinkClassName={PAGINATION_CLASSES.pageLink}
            previousLinkClassName={PAGINATION_CLASSES.navLink}
            nextLinkClassName={PAGINATION_CLASSES.navLink}
            breakLinkClassName={PAGINATION_CLASSES.breakLink}
            activeLinkClassName={PAGINATION_CLASSES.activeLink}
            disabledLinkClassName={PAGINATION_CLASSES.disabledLink}
          />
        </div>
      </div>

      <div className='mt-8 h-[2px] w-full bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,#f80032_50%,rgba(0,0,0,0)_100%)]' />
    </div>
  );
};
