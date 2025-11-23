import Home from './pages/Home';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Success from './pages/Success';
import Account from './pages/Account';

function App() {
  const path = window.location.pathname;

  if (path === '/faq') {
    return <FAQ />;
  }

  if (path === '/privacy') {
    return <Privacy />;
  }

  if (path === '/terms') {
    return <Terms />;
  }

  if (path === '/success') {
    return <Success />;
  }

  if (path === '/account') {
    return <Account />;
  }

  return <Home />;
}

export default App;
