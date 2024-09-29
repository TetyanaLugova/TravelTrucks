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

  const isSelected = (value, group) => {
    if (group === "form") return searchParams.form === value;
    if (group === "equipment") return searchParams.equipment[value] === true;
    return false;
  };

  const handleLocationChange = (e) => {
    setSearchParams({ ...searchParams, location: e.target.value });
  };

  const handleFormChange = (formType) => {
    setSearchParams((prev) => ({ ...prev, form: formType }));
  };

  const handleEquipmentToggle = (equipmentType) => {
    setSearchParams((prev) => ({
      ...prev,
      equipment: {
        ...prev.equipment,
        [equipmentType]: !prev.equipment[equipmentType],
      },
    }));
  };

  const handleSearch = () => {
    dispatch(setLocation(searchParams.location));
    dispatch(setForm(searchParams.form));

    
    Object.keys(searchParams.equipment).forEach((key) => {
      if (searchParams.equipment[key]) {
        dispatch(toggleEquipment(key));
      }
    });

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
          {["AC", "automatic", "kitchen", "tv", "bathroom"].map((item) => (
            <li
              key={item}
              className={`${css.item} ${
                isSelected(item, "equipment") ? css.selected : ""
              }`}
              onClick={() => handleEquipmentToggle(item)}
            >
              {item === "AC" && <FiWind className={css.icon} />}
              {item === "automatic" && <BsDiagram3 className={css.icon} />}
              {item === "kitchen" && <BsCupHot className={css.icon} />}
              {item === "tv" && <MdOutlineTv className={css.icon} />}
              {item === "bathroom" && <BsDroplet className={css.icon} />}
              <p>{item.charAt(0).toUpperCase() + item.slice(1)}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className={css.title}>Vehicle Type</h4>
        <ul className={css.wrapList}>
          {[
            { display: "Van", backend: "panelTruck" },
            { display: "Fully Integrated", backend: "fullyIntegrated" },
            { display: "Alcove", backend: "alcove" },
          ].map(({ display, backend }) => (
            <li
              key={backend}
              className={`${css.item} ${
                isSelected(backend, "form") ? css.selected : ""
              }`}
              onClick={() => handleFormChange(backend)}
            >
              {backend === "panelTruck" && <BsGrid1X2 className={css.icon} />}
              {backend === "fullyIntegrated" && <BsGrid className={css.icon} />}
              {backend === "alcove" && <BsGrid3X3Gap className={css.icon} />}
              <p className={css.textItem}>{display}</p>
            </li>
          ))}
        </ul>
      </div>

      <button className={css.btn} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}
