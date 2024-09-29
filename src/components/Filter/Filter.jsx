import { useDispatch, useSelector } from "react-redux";
import {
  selectFilterLocation,
  selectFilterForm,
  selectFilterEquipment,
} from "../../redux/filter/selectors";
import {
  setLocation,
  setForm,
  toggleEquipment,
} from "../../redux/filter/slice";
import { FiWind } from "react-icons/fi";
import {
  BsCupHot,
  BsDroplet,
  BsDiagram3,
  BsGrid1X2,
  BsGrid3X3Gap,
  BsGrid,
} from "react-icons/bs";
import { MdOutlineTv } from "react-icons/md";
import { useState } from "react";
import css from "./Filter.module.css";

export default function Filter() {
  const dispatch = useDispatch();
  const location = useSelector(selectFilterLocation);
  const form = useSelector(selectFilterForm);
  const equipment = useSelector(selectFilterEquipment);

  const [searchParams, setSearchParams] = useState({
    location: "",
    equipment: {},
    form: "",
  });

  // Виділення червоною рамкою для вибраних елементів
  const isSelected = (value, group) => {
    if (group === "form") return searchParams.form === value;
    if (group === "equipment") return searchParams.equipment[value] === true;
    return false;
  };

  const handleLocationChange = (e) => {
    setSearchParams({ ...searchParams, location: e.target.value });
  };

  const handleFormChange = (formType) => {
    setSearchParams({ ...searchParams, form: formType });
  };

  const handleEquipmentToggle = (equipmentType) => {
    const updatedEquipment = {
      ...searchParams.equipment,
      [equipmentType]: !searchParams.equipment[equipmentType],
    };
    setSearchParams({ ...searchParams, equipment: updatedEquipment });
  };

  const handleSearch = () => {
    dispatch(setLocation(searchParams.location));
    dispatch(setForm(searchParams.form));

    Object.keys(searchParams.equipment).forEach((key) => {
      if (searchParams.equipment[key]) {
        dispatch(toggleEquipment(key));
      }
    });

    console.log("Фільтрація з параметрами: ", searchParams);
  };

  return (
    <div>
      <p className={css.textLoc}>Location</p>
      <input
        className={css.input}
        type="text"
        value={searchParams.location}
        onChange={handleLocationChange}
        placeholder="Location"
      />

      <p className={css.textFilter}>Filters</p>
      <div>
        <h4 className={css.title}>Vehicle Equipment</h4>
        <ul className={css.wrapList}>
          <li
            className={`${css.item} ${
              isSelected("AC", "equipment") ? css.selected : ""
            }`}
            onClick={() => handleEquipmentToggle("AC")}
          >
            <FiWind className={css.icon} />
            <p>AC</p>
          </li>
          <li
            className={`${css.item} ${
              isSelected("automatic", "equipment") ? css.selected : ""
            }`}
            onClick={() => handleEquipmentToggle("automatic")}
          >
            <BsDiagram3 className={css.icon} />
            <p>Automatic</p>
          </li>
          <li
            className={`${css.item} ${
              isSelected("kitchen", "equipment") ? css.selected : ""
            }`}
            onClick={() => handleEquipmentToggle("kitchen")}
          >
            <BsCupHot className={css.icon} />
            <p>Kitchen</p>
          </li>
          <li
            className={`${css.item} ${
              isSelected("tv", "equipment") ? css.selected : ""
            }`}
            onClick={() => handleEquipmentToggle("tv")}
          >
            <MdOutlineTv className={css.icon} />
            <p>TV</p>
          </li>
          <li
            className={`${css.item} ${
              isSelected("bathroom", "equipment") ? css.selected : ""
            }`}
            onClick={() => handleEquipmentToggle("bathroom")}
          >
            <BsDroplet className={css.icon} />
            <p>Bathroom</p>
          </li>
        </ul>
      </div>

      <div>
        <h4 className={css.title}>Vehicle type</h4>
        <ul className={css.wrapList}>
          <li
            className={`${css.item} ${
              isSelected("van", "form") ? css.selected : ""
            }`}
            onClick={() => handleFormChange("van")}
          >
            <BsGrid1X2 className={css.icon} />
            <p>Van</p>
          </li>
          <li
            className={`${css.item} ${
              isSelected("alcove", "form") ? css.selected : ""
            }`}
            onClick={() => handleFormChange("alcove")}
          >
            <BsGrid className={css.icon} />
            <p className={css.textItem}>Fully Integrated</p>
          </li>
          <li
            className={`${css.item} ${
              isSelected("integrated", "form") ? css.selected : ""
            }`}
            onClick={() => handleFormChange("integrated")}
          >
            <BsGrid3X3Gap className={css.icon} />
            <p>Alcove</p>
          </li>
        </ul>
      </div>

      <button className={css.btn} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}
