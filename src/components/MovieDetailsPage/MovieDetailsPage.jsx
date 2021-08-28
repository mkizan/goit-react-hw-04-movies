import { useState, useEffect, lazy, Suspense } from 'react';
import {
  Route,
  NavLink,
  useParams,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import fetchMovies from '../../services/movie-api';
import s from './MovieDetailsPage.module.scss';

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
    fetchMovies.fetchMoviesById(movieId).then(response => setMovie(response));
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <>
      {movie && (
        <>
          <button type="button" className={s.goBack_btn} onClick={onGoBack}>
            Go back
          </button>
          <div className={s.movie_details}>
            <div className={s.movie_img}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : 'not found image'
                }
                alt={movie.title}
              />
            </div>
            <div className={s.movie_text}>
              <p className={s.movie_title}>{movie.title}</p>
              <p className={s.movie_description}>{movie.overview}</p>
            </div>
          </div>

          <NavLink
            to={{
              pathname: `${url}/cast`,
              state: { ...location.state },
            }}
            className={s.nav_item}
            activeClassName={s.activeNavLink}
          >
            Cast
          </NavLink>

          <NavLink
            to={{
              pathname: `${url}/reviews`,
              state: { ...location.state },
            }}
            className={s.nav_item}
            activeClassName={s.activeNavLink}
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
