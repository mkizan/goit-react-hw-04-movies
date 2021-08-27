import { useState, useEffect } from 'react';
import { fetchMovieCast } from '../../services/movie-api';

export default function Cast({ movieId }) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieCast(movieId).then(({ cast }) => setCast(cast));
  }, [movieId]);

  return (
    <>
      {cast.length > 0 ? (
        <ul>
          {cast.map(({ id, name, profile_path, character }) => (
            <li key={id}>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w200/${profile_path}`
                    : 'not found image'
                }
                alt=""
              />
              <p>{name}</p>
              {character && <p>{character}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p>not found any cast info</p>
      )}
    </>
  );
}
