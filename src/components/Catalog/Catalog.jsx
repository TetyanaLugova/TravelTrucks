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
  const [items, setItems] = useState([]);
  const [displayCount, setDisplayCount] = useState(4);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    fetchItems();
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    savedFavorites.forEach((id) => dispatch(addFavorite(id)));
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers"
      );
      setItems(response.data.items);
      setFilteredItems(response.data.items);
      setDisplayCount(4);
    } catch (error) {
      console.error("Error fetching campers: ", error);
    }
  };

  const filterItems = (items) => {
    return items.filter((item) => {
      const matchesLocation = location
        ? item.location.includes(location)
        : true;
      const matchesForm = form ? item.form === form : true;
      const matchesEquipment = Object.keys(equipment).every((equipmentType) => {
        return !equipment[equipmentType] || item[equipmentType];
      });

      return matchesLocation && matchesForm && matchesEquipment;
    });
  };

  useEffect(() => {
    const newFilteredItems = filterItems(items);
    setFilteredItems(newFilteredItems);
    setDisplayCount(4);
  }, [location, form, equipment, items]);

  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + 4);
  };

  const favorites = useSelector((state) => state.catalog.favorites);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div className={css.wrap}>
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
        <p>No campers found for the selected filters.</p>
      )}
    </div>
  );
}
