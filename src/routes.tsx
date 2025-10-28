import { createHashRouter } from 'react-router';
import { FilmDetailsPage, HomePage, MoviesPage, TvShowsPage } from '@pages';
import { Layout } from '@layouts';

export const routes = createHashRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: 'movies', element: <MoviesPage /> },
      { path: 'tv', element: <TvShowsPage /> },
      { path: ':mediaType/:id', element: <FilmDetailsPage /> }
    ]
  }
]);
