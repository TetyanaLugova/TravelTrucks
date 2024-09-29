import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

export default function Navigation() {
  return (
    <nav className={css.wrap}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${css.text} ${isActive ? css.active : ""}`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/catalog"
        className={({ isActive }) =>
          `${css.text} ${isActive ? css.active : ""}`
        }
      >
        Catalog
      </NavLink>
    </nav>
  );
}
