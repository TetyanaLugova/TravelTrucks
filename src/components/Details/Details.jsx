import { useState, useEffect } from "react";
import axios from "axios";
import css from "./Details.module.css";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { FiWind } from "react-icons/fi";
import { BsCupHot, BsDiagram3, BsDroplet } from "react-icons/bs";
import { MdOutlineTv } from "react-icons/md";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { CiMap } from "react-icons/ci";
import Form from "../Form/Form";

export default function Details() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("specs");

  useEffect(() => {
    async function fetchItem() {
      try {
        const response = await axios.get(
          `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${id}`
        );
        setItem(response.data);
      } catch (error) {
        setError("Не вдалося завантажити дані.");
      } finally {
        setLoading(false);
      }
    }
    fetchItem();
  }, [id]);

  if (loading) {
    return <div>Завантаження...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!item) {
    return <div>Дані не знайдено</div>;
  }

  const reviewCount = item.reviews ? item.reviews.length : 0;

  return (
    <div className={css.detailsWrap}>
      <h3 className={css.title}>{item.name}</h3>

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
      <p className={css.price}>
        €
        {item.price
          .toLocaleString("uk-UA", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
          .replace(",", ".")}
      </p>

      <div className={css.gallery}>
        {item.gallery &&
          item.gallery.map((img, index) => (
            <div className={css.imageContainer} key={index}>
              <img
                src={img.thumb}
                alt={`img-${index}`}
                className={css.galleryImg}
              />
            </div>
          ))}
      </div>

      <p className={css.textInfo}>{item.description}</p>

      {/* Вкладки для перемикання */}
      <div className={css.tabsContainer}>
        <div className={css.tabs}>
          <button
            onClick={() => setActiveTab("specs")}
            className={activeTab === "specs" ? css.activeTab : ""}
          >
            Features
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={activeTab === "reviews" ? css.activeTab : ""}
          >
            Reviews({reviewCount})
          </button>
        </div>
      </div>
      {/* Контент вкладок */}
      <div className={css.wrapper}>
        <div>
          {activeTab === "specs" && (
            <div className={css.wrapOptions}>
              <div className={css.options}>
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

              {/* Додаткова інформація про характеристики */}
              <h4 className={css.titleDetails}>Vehicle details</h4>
              <ul className={css.detailsList}>
                <li className={css.detailsItem}>
                  <p>Form </p>
                  <p>{item.form} </p>
                </li>
                <li className={css.detailsItem}>
                  <p>Length </p>
                  <p>{item.length} м</p>
                </li>
                <li className={css.detailsItem}>
                  <p>Width</p>
                  <p> {item.width} м</p>
                </li>
                <li className={css.detailsItem}>
                  <p>Height</p>
                  <p>{item.height} м</p>
                </li>
                <li className={css.detailsItem}>
                  <p>Tank</p>
                  <p> {item.tank} l</p>
                </li>
                <li className={css.detailsItem}>
                  <p>Consumption</p>
                  <p> {item.consumption}</p>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Відгуки */}
        {activeTab === "reviews" && (
          <div className={css.reviews}>
            {item.reviews && item.reviews.length > 0 ? (
              item.reviews.map((review, index) => (
                <div className={css.wrap} key={index}>
                  <div className={css.review}>
                    <div className={css.avatar}>
                      {review.reviewer_name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className={css.reviewerName}>
                        {review.reviewer_name}
                      </span>
                      <span className={css.reviewerRating}>
                        {Array.from({ length: review.reviewer_rating }).map(
                          (_, i) => (
                            <AiFillStar className={css.starIcon} key={i} />
                          )
                        )}
                      </span>
                    </div>
                  </div>

                  <p className={css.comment}>{review.comment}</p>
                </div>
              ))
            ) : (
              <p>Немає відгуків.</p>
            )}
          </div>
        )}
        <Form />
      </div>
    </div>
  );
}
