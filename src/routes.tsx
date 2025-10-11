import { createBrowserRouter } from 'react-router';
import { HomePage, MoviesPage, TvShowsPage } from '@pages';
import { Layout } from '@layouts';

export const routes = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: 'movies', element: <MoviesPage /> },
      { path: 'tv', element: <TvShowsPage /> }
    ]
  }
]);
