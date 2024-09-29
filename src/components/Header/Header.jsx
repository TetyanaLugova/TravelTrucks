import Navigation from "../Navigation/Navigation";
import css from "./Header.module.css";

export default function Header() {
  return (
    <div className={css.wrap}>
      <svg className={css.logo}>
        <use href="../../img/icon.svg/#logo"></use>
      </svg>
      <Navigation />
    </div>
  );
}
