import { useState, useEffect, lazy, Suspense } from 'react';
import {
  Route,
  NavLink,
  useParams,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { fetchMoviesById } from '../../services/movie-api';
// import Cast from '../Cast/Cast';
// import Reviews from '../Reviews/Reviews';

const Cast = lazy(() => import('../Cast/Cast' /* webpackChunkName: 'Cast' */));
const Reviews = lazy(() =>
  import('../Reviews/Reviews' /* webpackChunkName: 'Reviews' */),
);

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    fetchMoviesById(movieId).then(response => setMovie(response));
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <>
      {movie && (
        <>
          <button type="button" onClick={onGoBack}>
            Go back
          </button>

          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                : 'not found image'
            }
            alt={movie.title}
          />

          <p>{movie.title}</p>
          <p>{movie.overview}</p>
          <p>Film №{movieId}</p>

          <NavLink
            to={{
              pathname: `${url}/cast`,
              state: { ...location.state },
            }}
          >
            Cast
          </NavLink>

          <NavLink
            to={{
              pathname: `${url}/reviews`,
              // state: {
              //   from: location,
              // },
              state: { ...location.state },
            }}
          >
            Reviews
          </NavLink>

          <Suspense fallback={<h2>Loading...</h2>}>
            <Route path={`${url}/cast`}>
              <Cast movieId={movieId} />
            </Route>

            <Route path={`${url}/reviews`}>
              <Reviews movieId={movieId} />
            </Route>
          </Suspense>
        </>
      )}
    </>
  );
};

export default MovieDetailsPage;
