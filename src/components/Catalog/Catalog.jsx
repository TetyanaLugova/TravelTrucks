import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  selectFilterLocation,
  selectFilterForm,
  selectFilterEquipment,
} from "../../redux/filter/selectors";
import { addFavorite, removeFavorite } from "../../redux/catalog/slise";
import Card from "../Card/Card";
import css from "./Catalog.module.css";

export default function Catalog() {
  const dispatch = useDispatch();
  const location = useSelector(selectFilterLocation);
  const form = useSelector(selectFilterForm);
  const equipment = useSelector(selectFilterEquipment);
  const [page, setPage] = useState(1);
  const [campers, setCampers] = useState([]); // локальний стан для зберігання кемперів
  const [isFilterActive, setIsFilterActive] = useState(false);

  const fetchCampers = async () => {
    try {
      const params = isFilterActive
        ? {
            ...(location && { location }),
            ...(form && { form }),
            ...(Object.keys(equipment).length > 0 && {
              ...Object.fromEntries(
                Object.entries(equipment).filter(([key, value]) => value)
              ),
            }),
            page,
            limit: 4,
          }
        : { page, limit: 4 }; // без фільтрів

      const response = await axios.get(
        "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers",
        { params }
      );

      setCampers((prevCampers) => [...prevCampers, ...response.data.items]);
    } catch (error) {
      console.error("Error fetching campers: ", error);
    }
  };

  useEffect(() => {
    setPage(1); // Починаємо з першої сторінки після зміни фільтрів
    setCampers([]); // Очищуємо список кемперів перед новим пошуком
    fetchCampers(); // Завантажуємо нові дані після зміни фільтрів
  }, [location, form, equipment, isFilterActive]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1); // збільшення сторінки для додаткового завантаження
  };

  const favorites = useSelector((state) => state.catalog.favorites);

  return (
    <div className={css.wrap}>
      {/* Відображення карток кемперів */}
      {campers.map((camper) => (
        <Card
          key={camper.id}
          camper={camper}
          isFavorite={favorites.includes(camper.id)}
          onAddFavorite={() => dispatch(addFavorite(camper.id))}
          onRemoveFavorite={() => dispatch(removeFavorite(camper.id))}
        />
      ))}

      <button className={css.btn} onClick={handleLoadMore}>
        Load More
      </button>
    </div>
  );
}
