import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@redux';
import { filmsListActions } from '@redux/slices';
import { FilmCardComponent } from '@components/shared';
import type { MediaType, TransformedMediaType } from '@types';
import type { ApiFilm } from '@models';
import ReactPaginate from 'react-paginate';
import {
  FILMS_LIST_MAX_PAGE_COUNT,
  PAGINATION_CLASSES,
  PAGINATION_LABELS,
  TTL_MS
} from '@constants';
import { FiltersComponent } from './FiltersComponent.tsx';
import { useNavigate } from 'react-router';

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
  const { films, loading, error, totalPages, lastFetch, lastKey, inFlightKey } =
    useAppSelector((state) => state.filmsList[mediaType]);
  const navigate = useNavigate();

  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hydrated, setHydrated] = useState(false); // ← гейт гідрації

  const GENRE_STORAGE_KEY = `genre_${mediaType}`;
  const PAGE_STORAGE_KEY = `page_${mediaType}`;

  const requestKey = useMemo(
    () => `${selectedGenre ?? 'all'}|${currentPage}`,
    [selectedGenre, currentPage]
  );
  const pageCount = Math.max(
    1,
    Math.min(totalPages || 1, FILMS_LIST_MAX_PAGE_COUNT)
  );

  useEffect(() => {
    const savedGenre = localStorage.getItem(GENRE_STORAGE_KEY);
    const savedPage = localStorage.getItem(PAGE_STORAGE_KEY);

    if (savedGenre) setSelectedGenre(Number(savedGenre));
    if (savedPage) setCurrentPage(Number(savedPage));

    setHydrated(true);
  }, [GENRE_STORAGE_KEY, PAGE_STORAGE_KEY]);

  useEffect(() => {
    if (!hydrated) return;

    const fresh =
      !!lastFetch && lastKey === requestKey && Date.now() - lastFetch < TTL_MS;
    const sameInFlight = inFlightKey === requestKey;

    if (fresh || sameInFlight) return;

    dispatch(
      filmsListActions.loadFilms({
        mediaType,
        page: currentPage,
        genreId: selectedGenre ?? undefined
      })
    );
  }, [
    dispatch,
    mediaType,
    selectedGenre,
    currentPage,
    lastFetch,
    lastKey,
    inFlightKey,
    requestKey,
    hydrated
  ]);

  useEffect(() => {
    if (!hydrated) return;
    if (selectedGenre) {
      localStorage.setItem(GENRE_STORAGE_KEY, String(selectedGenre));
    } else {
      localStorage.removeItem(GENRE_STORAGE_KEY);
    }
    localStorage.setItem(PAGE_STORAGE_KEY, String(currentPage));
  }, [
    hydrated,
    selectedGenre,
    currentPage,
    GENRE_STORAGE_KEY,
    PAGE_STORAGE_KEY
  ]);

  const handlePageChange = useCallback((target: { selected: number }) => {
    setCurrentPage(target.selected + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleGenreChange = (genreId: number | null) => {
    setSelectedGenre(genreId);
    setCurrentPage(1);
  };

  if (loading && !films.length) {
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

      <FiltersComponent
        mediaType={mediaType}
        selectedGenre={selectedGenre}
        onGenreChange={handleGenreChange}
      />

      {films.length ? (
        <div className='grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6'>
          {films.map((film: ApiFilm) => (
            <div key={film.id} className='group'>
              <FilmCardComponent
                film={film}
                filmGenres={getGenreNames(film.genre_ids, mediaType)}
                onClick={() => {
                  navigate(`/${film.media_type || mediaType}/${film.id}`);
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className='py-10 text-center text-gray-400'>No films found.</div>
      )}

      {films.length > 0 && (
        <div className='flex justify-center pt-3 pb-6 sm:pt-4 sm:pb-8 md:pt-5 md:pb-10'>
          <div className='flex w-full max-w-[375px] justify-center sm:max-w-[500px]'>
            <ReactPaginate
              breakLabel={PAGINATION_LABELS.break}
              nextLabel={PAGINATION_LABELS.next}
              previousLabel={PAGINATION_LABELS.previous}
              onPageChange={handlePageChange}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              pageCount={Math.max(1, pageCount || 1)}
              forcePage={Math.max(0, Math.min(pageCount - 1, currentPage - 1))}
              renderOnZeroPageCount={null}
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
      )}

      <div className='mt-8 h-[2px] w-full bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,#f80032_50%,rgba(0,0,0,0)_100%)]' />
    </div>
  );
};
