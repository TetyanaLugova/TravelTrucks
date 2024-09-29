import Navigation from "../Navigation/Navigation";
import sprite from "../../img/icon.svg";
import css from "./Header.module.css";

export default function Header() {
  return (
    <div className={css.wrap}>
      <svg className={css.logo}>
        <use href={`${sprite}#logo`}></use>
      </svg>
      <Navigation />
    </div>
  );
}
