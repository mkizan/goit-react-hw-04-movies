import { useState, useEffect } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { fetchSearchMovie } from '../../services/movie-api';

export default function MoviesPage() {
  const location = useLocation();
  const { search } = useLocation();
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [movie, setMovie] = useState([]);

  const queryValue = new URLSearchParams(search).get('query');

  console.log(queryValue);
  useEffect(() => {
    if (search === '') {
      return;
    }
    // if (!queryValue) {
    //   return;
    // }
    fetchSearchMovie(queryValue).then(({ results }) => setMovie(results));
    // .finally(setSearchQuery(''));
    history.push({ search: `query=${queryValue}` });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryValue]);

  // const pushHistory = query => {
  //   history.push({ search: `query=${query}` });
  // };

  const handleQueryChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    history.push({ ...location, search: `query=${searchQuery}` });
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          autoComplete="on"
          autoFocus
          placeholder="Search movies"
          value={searchQuery}
          onChange={handleQueryChange}
        />

        <button type="button">
          <span>Search</span>
        </button>
      </form>

      <ul>
        {movie.map(({ id, title }) => (
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
    </>
  );
}
