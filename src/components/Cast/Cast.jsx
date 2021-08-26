import { useState, useEffect } from 'react';
import { fetchMovieCast } from '../../services/movie-api';

export default function Cast({ movieId }) {
  console.log(movieId);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieCast(movieId).then(({ cast }) => setCast(cast));
  }, [movieId]);

  // console.log(cast.id);

  return (
    <>
      {cast.length > 0 ? (
        <ul>
          {cast.map(({ id, name, profile_path, character }) => (
            <li key={id}>
              {profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200/${profile_path}`}
                  alt=""
                />
              ) : (
                <p>not found image</p>
              )}
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
