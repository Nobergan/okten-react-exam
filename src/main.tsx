import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { routes } from './routes.tsx';
import { Provider } from 'react-redux';
import { store } from '@redux';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
);
