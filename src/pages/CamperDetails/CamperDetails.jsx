import Details from "../../components/Details/Details";
import Header from "../../components/Header/Header";
import css from "./CamperDetails.module.css";

export default function CamperDetails() {
  return (
    <div className={css.wrapper}>
      <Header />
      <Details />
    </div>
  );
}
