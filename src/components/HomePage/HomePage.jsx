import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import fetchMovies from '../../services/movie-api';
import s from './HomePage.module.scss';

const HomePage = () => {
  const location = useLocation();
  const [trendMovies, setTrendMovies] = useState([]);

  useEffect(() => {
    fetchMovies
      .fetchTrendingMoviesByDay()
      .then(results => setTrendMovies(results));
  }, []);

  return (
    <ul className={s.list}>
      {trendMovies.map(({ id, title }) => (
        <li className={s.list_item} key={id}>
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
};

export default HomePage;
