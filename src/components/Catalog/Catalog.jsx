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
  const [items, setItems] = useState([]); // Локальний стан для зберігання кемперів
  const [displayCount, setDisplayCount] = useState(4); // Кількість карток для відображення
  const [filteredItems, setFilteredItems] = useState([]); // Локальний стан для зберігання відфільтрованих карток

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers"
      );
      setItems(response.data.items);
      setFilteredItems(response.data.items); // Спочатку всі картки відображаються
      setDisplayCount(4); // Скинути кількість карток до 4
    } catch (error) {
      console.error("Error fetching campers: ", error);
    }
  };

  const filterItems = (items) => {
    return items.filter((item) => {
      const matchesLocation = location
        ? item.location.includes(location)
        : true; // Перевірка на пусте значення
      const matchesForm = form ? item.form === form : true; // Перевірка на пусте значення
      const matchesEquipment = Object.keys(equipment).every((equipmentType) => {
        return !equipment[equipmentType] || item[equipmentType];
      });

      return matchesLocation && matchesForm && matchesEquipment;
    });
  };

  useEffect(() => {
    fetchItems(); // Завантажити дані при старті
  }, []);

  useEffect(() => {
    const newFilteredItems = filterItems(items); // Фільтрування карток на основі значень фільтрів
    setFilteredItems(newFilteredItems);
    setDisplayCount(4); // Скинути кількість карток до 4
  }, [location, form, equipment, items]);

  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + 4); // Додати ще 4 картки
  };

  const favorites = useSelector((state) => state.catalog.favorites);

  return (
    <div className={css.wrap}>
      {/* Відображення карток кемперів */}
      {filteredItems.slice(0, displayCount).map((item) => (
        <Card
          key={item.id}
          item={item}
          isFavorite={favorites.includes(item.id)}
          onAddFavorite={() => dispatch(addFavorite(item.id))}
          onRemoveFavorite={() => dispatch(removeFavorite(item.id))}
        />
      ))}

      {displayCount < filteredItems.length && (
        <button className={css.btn} onClick={handleLoadMore}>
          Load More
        </button>
      )}

      {filteredItems.length === 0 && (
        <p>No campers found for the selected filters.</p> // Повідомлення, якщо нічого не знайдено
      )}
    </div>
  );
}
