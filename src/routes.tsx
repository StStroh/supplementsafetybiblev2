import { createBrowserRouter } from 'react-router-dom';
import Landing from './pages/Landing';
import Search from './pages/Search';
import InteractionDetails from './pages/InteractionDetails';
import Admin from './pages/Admin';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />
  },
  {
    path: '/search',
    element: <Search />
  },
  {
    path: '/interaction/:id',
    element: <InteractionDetails />
  },
  {
    path: '/admin',
    element: <Admin />
  }
]);
