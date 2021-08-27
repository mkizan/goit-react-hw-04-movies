import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/movies">Movie</NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
