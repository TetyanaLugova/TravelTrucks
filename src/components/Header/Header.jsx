import Navigation from "../Navigation/Navigation";
import logo from "../../img/icon.svg"; // імпорт SVG файлу
import css from "./Header.module.css";

export default function Header() {
  return (
    <div className={css.wrap}>
      <svg className={css.logo}>
        <use href={`${logo}#logo`}></use> {/* Динамічний шлях до SVG */}
      </svg>
      <Navigation />
    </div>
  );
}
