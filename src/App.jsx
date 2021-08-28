import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

const Navigation = lazy(() =>
  import('./components/Navigation' /* webpackChunkName: 'Navigation' */),
);
const HomePage = lazy(() =>
  import('./components/HomePage' /* webpackChunkName: 'HomePage' */),
);
const MoviesPage = lazy(() =>
  import('./components/MoviesPage' /* webpackChunkName: 'MoviesPage' */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './components/MovieDetailsPage' /* webpackChunkName: 'MovieDetailsPage' */
  ),
);
const NotFoundPage = lazy(() =>
  import('./components/NotFoundPage' /* webpackChunkName: 'NotFoundPage' */),
);

export default function App() {
  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Navigation />
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/movies" component={MoviesPage} exact />
        <Route path="/movies/:movieId" component={MovieDetailsPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  );
}
