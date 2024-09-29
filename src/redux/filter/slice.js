import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    location: "",
    form: null,
    equipment:{
        AC: false,
        Automatic: false,
        Kitchen: false,
        TV: false,
        Bathroom: false
    }
  },
  reducers: {
    setLocation(state, action) {
      state.location = action.payload;
    },
    setForm(state, action){
        state.form=action.payload;
    },
    toggleEquipment(state, action) {
        const equipmentType = action.payload;
        state.equipment[equipmentType] = !state.equipment[equipmentType];
      },
  },
});

export const { setLocation, setForm, toggleEquipment } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;