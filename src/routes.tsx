import { createBrowserRouter } from 'react-router-dom';
import Landing from './pages/Landing';
import Search from './pages/Search';
import InteractionDetails from './pages/InteractionDetails';
import Admin from './pages/Admin';
import Success from './pages/Success';
import Home from './pages/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />
  },
  {
    path: '/home',
    element: <Home />
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
  },
  {
    path: '/success',
    element: <Success />
  }
]);
