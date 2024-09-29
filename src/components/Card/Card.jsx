import { Link } from "react-router-dom";
import css from "./Card.module.css";
import { IoMdHeartEmpty } from "react-icons/io";
import { CiMap } from "react-icons/ci";
import { AiFillStar } from "react-icons/ai"; // Іконка зірки
import { FiWind } from "react-icons/fi"; // Іконка для AC
import { BsCupHot, BsDiagram3, BsDroplet } from "react-icons/bs"; // Іконки для Kitchen, Automatic, Bathroom
import { MdOutlineTv } from "react-icons/md"; // Іконка для TV
import { BsFillFuelPumpFill } from "react-icons/bs";

export default function Card({
  camper,
  isFavorite,
  onAddToFavorites,
  onRemoveFromFavorites,
}) {
  const reviewCount = camper.reviews ? camper.reviews.length : 0;

  return (
    <div className={css.cardWrap}>
      {camper.gallery && camper.gallery.length > 0 && (
        <img
          src={camper.gallery[0].thumb}
          alt={camper.name}
          className={css.img}
        />
      )}
      <div>
        <div className={css.wrapTitle}>
          <h3 className={css.title}>{camper.name}</h3>
          <div className={css.wrapPrice}>
            <p className={css.title}>
              €
              {camper.price.toLocaleString("uk-UA", {
                minimumFractionDigits: 2,
              })}{" "}
            </p>
            {isFavorite ? (
              <IoMdHeartEmpty
                className={css.iconHeart}
                onClick={onRemoveFromFavorites}
              />
            ) : (
              <IoMdHeartEmpty
                className={css.iconHeart}
                onClick={onAddToFavorites}
              />
            )}
          </div>
        </div>
        <div className={css.wrapRatingLoc}>
          <div className={css.rating}>
            <AiFillStar className={css.starIcon} />
            <span>
              {camper.rating} ({reviewCount}{" "}
              {reviewCount === 1 ? "review" : "reviews"})
            </span>
          </div>
          <div className={css.location}>
            <CiMap className={css.icon} />
            <p>{camper.location}</p>
          </div>
        </div>

        <p className={css.textInfo}>{camper.description}</p>

        {/* Перелік обраних опцій з іконками */}
        <div className={css.option}>
          {camper.transmission === "automatic" && (
            <div className={css.optionItem}>
              <BsDiagram3 className={css.icon} />
              <p>Automatic</p>
            </div>
          )}
          {camper.engine === "diesel" && (
            <div className={css.optionItem}>
              <BsFillFuelPumpFill className={css.icon} />
              <p>Diesel</p>
            </div>
          )}
          {camper.engine === "petrol" && (
            <div className={css.optionItem}>
              <BsFillFuelPumpFill className={css.icon} />
              <p>Petrol</p>
            </div>
          )}
          {camper.AC && (
            <div className={css.optionItem}>
              <FiWind className={css.icon} />
              <p>AC</p>
            </div>
          )}
          {camper.bathroom && (
            <div className={css.optionItem}>
              <BsDroplet className={css.icon} />
              <p>Bathroom</p>
            </div>
          )}
          {camper.kitchen && (
            <div className={css.optionItem}>
              <BsCupHot className={css.icon} />
              <p>Kitchen</p>
            </div>
          )}
          {camper.TV && (
            <div className={css.optionItem}>
              <MdOutlineTv className={css.icon} />
              <p>TV</p>
            </div>
          )}
        </div>

        <div>
          <Link
            className={css.btn}
            to={`/catalog/${camper.id}`}
            target="_blank"
          >
            Show more
          </Link>
        </div>
      </div>
    </div>
  );
}
