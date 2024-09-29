import { Link } from "react-router-dom";
import css from "./Card.module.css";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io"; // Додано заповнене серце
import { CiMap } from "react-icons/ci";
import { AiFillStar } from "react-icons/ai";
import { FiWind } from "react-icons/fi";
import { BsCupHot, BsDiagram3, BsDroplet } from "react-icons/bs";
import { MdOutlineTv } from "react-icons/md";
import { BsFillFuelPumpFill } from "react-icons/bs";

export default function Card({
  item,
  isFavorite,
  onAddFavorite,
  onRemoveFavorite,
}) {
  const reviewCount = item.reviews ? item.reviews.length : 0;

  return (
    <div className={css.cardWrap}>
      {item.gallery && item.gallery.length > 0 && (
        <img src={item.gallery[0].thumb} alt={item.name} className={css.img} />
      )}
      <div>
        <div className={css.wrapTitle}>
          <h3 className={css.title}>{item.name}</h3>
          <div className={css.wrapPrice}>
            <p className={css.title}>
              €
              {item.price
                .toLocaleString("uk-UA", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
                .replace(",", ".")}
            </p>
            {isFavorite ? (
              <IoMdHeart
                className={`${css.iconHeart} ${css.activeHeart}`}
                onClick={onRemoveFavorite}
              />
            ) : (
              <IoMdHeartEmpty
                className={css.iconHeart}
                onClick={onAddFavorite}
              />
            )}
          </div>
        </div>
        <div className={css.wrapRatingLoc}>
          <div className={css.rating}>
            <AiFillStar className={css.starIcon} />
            <span>
              {item.rating} ({reviewCount}{" "}
              {reviewCount === 1 ? "review" : "reviews"})
            </span>
          </div>
          <div className={css.location}>
            <CiMap className={css.icon} />
            <p>{item.location}</p>
          </div>
        </div>

        <p className={css.textInfo}>{item.description}</p>

        <div className={css.option}>
          {item.transmission === "automatic" && (
            <div className={css.optionItem}>
              <BsDiagram3 className={css.icon} />
              <p>Automatic</p>
            </div>
          )}
          {item.engine === "diesel" && (
            <div className={css.optionItem}>
              <BsFillFuelPumpFill className={css.icon} />
              <p>Diesel</p>
            </div>
          )}
          {item.engine === "petrol" && (
            <div className={css.optionItem}>
              <BsFillFuelPumpFill className={css.icon} />
              <p>Petrol</p>
            </div>
          )}
          {item.AC && (
            <div className={css.optionItem}>
              <FiWind className={css.icon} />
              <p>AC</p>
            </div>
          )}
          {item.bathroom && (
            <div className={css.optionItem}>
              <BsDroplet className={css.icon} />
              <p>Bathroom</p>
            </div>
          )}
          {item.kitchen && (
            <div className={css.optionItem}>
              <BsCupHot className={css.icon} />
              <p>Kitchen</p>
            </div>
          )}
          {item.TV && (
            <div className={css.optionItem}>
              <MdOutlineTv className={css.icon} />
              <p>TV</p>
            </div>
          )}
        </div>

        <div>
          <Link className={css.btn} to={`/catalog/${item.id}`}>
            Show more
          </Link>
        </div>
      </div>
    </div>
  );
}
