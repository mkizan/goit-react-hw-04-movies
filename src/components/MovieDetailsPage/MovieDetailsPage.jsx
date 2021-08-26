import { useState, useEffect } from 'react';
import {
  Route,
  NavLink,
  useParams,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
// import * as movieAPI from '../../services/movie-api';
import { fetchMoviesById } from '../../services/movie-api';
import Cast from '../Cast/Cast';
import Reviews from '../Reviews/Reviews';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const { url } = useRouteMatch();
  // console.log(url);
  const history = useHistory();
  const location = useLocation();
  // console.log(location.state.from);
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    fetchMoviesById(movieId).then(response => setMovie(response));
  }, [movieId]);

  // console.log(movieId);

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <>
      {movie && (
        <>
          {/* <img
            src={`${url}${movie.backdrop_path}`}
            alt={movie.title}
            width="30"
          /> */}
          <button type="button" onClick={onGoBack}>
            Go back
          </button>
          <p>{movie.title}</p>
          <p>{movie.overview}</p>
          <p>Film №{movieId}</p>
          <NavLink
            to={{
              pathname: `${url}/cast`,
              state: {
                from: '/',
              },
            }}
          >
            Cast
          </NavLink>
          <NavLink
            to={{
              pathname: `${url}/reviews`,
              state: {
                from: '/',
                // from: location,
              },
            }}
          >
            Reviews
          </NavLink>
          <Route path={`${url}/cast`}>
            <Cast movieId={movieId} />
          </Route>
          <Route path={`${url}/reviews`}>
            <Reviews movieId={movieId} />
          </Route>
        </>
      )}
    </>
  );
}
