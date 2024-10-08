import Filter from "../../components/Filter/Filter";
import Header from "../../components/Header/Header";
import Catalog from "../../components/Catalog/Catalog";
import css from "./Catalog.module.css";

export default function CatalogPage() {
  return (
    <div className={css.wrapper}>
      <Header />
      <div className={css.wrap}>
        <Filter />
        <Catalog />
      </div>
    </div>
  );
}
