import Home from './pages/Home';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

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

  return <Home />;
}

export default App;
