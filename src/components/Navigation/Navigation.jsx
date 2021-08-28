import { NavLink } from 'react-router-dom';
import s from './Navigation.module.scss';

const Navigation = () => {
  return (
    <nav className={s.nav}>
      <NavLink
        to="/"
        className={s.nav_item}
        activeClassName={s.activeNavLink}
        exact
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={s.nav_item}
        activeClassName={s.activeNavLink}
      >
        Movie
      </NavLink>
    </nav>
  );
};

export default Navigation;
