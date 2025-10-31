import { createHashRouter } from 'react-router';
import { FilmDetailsPage, HomePage, MoviesPage, TvShowsPage } from '@pages';
import App from './App.tsx';

export const routes = createHashRouter([
  {
    element: <App />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: 'movies', element: <MoviesPage /> },
      { path: 'tv', element: <TvShowsPage /> },
      { path: ':mediaType/:id', element: <FilmDetailsPage /> }
    ]
  }
]);
