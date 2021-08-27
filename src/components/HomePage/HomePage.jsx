import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import * as movieAPI from '../../services/movie-api';

export default function HomePage() {
  const location = useLocation();
  const [trendMovies, setTrendMovies] = useState([]);

  useEffect(() => {
    movieAPI
      .fetchTrendingMoviesByDay()
      .then(({ results }) => setTrendMovies(results));
  }, []);

  return (
    <ul>
      {trendMovies.map(({ id, title }) => (
        <li key={id}>
          <NavLink
            to={{
              pathname: `movies/${id}`,
              state: { from: location },
            }}
          >
            {title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
