import { createSlice } from "@reduxjs/toolkit";

export const selectFilterLocation = (state) => state.filters.location;
export const selectFilterForm = (state) => state.filters.form;
export const selectFilterEquipment = (state) => state.filters.equipment;

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    location: "", 
    form: "", 
    equipment: {
      AC: false,
      automatic: false,
      kitchen: false,
      tv: false,
      bathroom: false,
    },
  },
  reducers: {
    setLocation(state, action) {
      state.location = action.payload;
    },
    setForm(state, action) {
      state.form = action.payload;
    },
    toggleEquipment(state, action) {
      const equipmentType = action.payload;
      state.equipment[equipmentType] = !state.equipment[equipmentType];
    },
    resetFilters(state) { 
      state.location = "";
      state.form = "";
      state.equipment = {
        AC: false,
        automatic: false,
        kitchen: false,
        tv: false,
        bathroom: false,
      };
    },
  },
});

export const { setLocation, setForm, toggleEquipment, resetFilters } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
