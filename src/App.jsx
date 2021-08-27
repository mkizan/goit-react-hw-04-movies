// lazy для "ленивой" загрузки
import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

// и нужно удалить все статические импорты компонентов
// import Navigation from './components/Navigation';
// import HomePage from './components/HomePage';
// import MoviesPage from './components/MoviesPage';
// import MovieDetailsPage from './components/MovieDetailsPage';
// import NotFoundPage from './components/NotFoundPage';

// Делаем динамические импорты
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

const App = () => {
  return (
    <Suspense>
      <Navigation />
      <Switch fallback={<h2>Loading...</h2>}>
        <Route path="/" component={HomePage} exact />
        <Route path="/movies" component={MoviesPage} exact />
        <Route path="/movies/:movieId" component={MovieDetailsPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  );
};

export default App;
