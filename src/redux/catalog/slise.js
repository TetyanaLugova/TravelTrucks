import { createSlice } from '@reduxjs/toolkit';

const catalogSlice = createSlice({
  name: 'catalog',
  initialState: {
    campers: [],
    favorites: [],
  },
  reducers: {
    setCampers(state, action) {
      state.campers = action.payload;
    },
    addFavorite(state, action) {
      state.favorites.push(action.payload);
    },
    removeFavorite(state, action) {
      state.favorites = state.favorites.filter((id) => id !== action.payload);
    },
  },
});

export const { setCampers, addFavorite, removeFavorite } = catalogSlice.actions;
export const catalogReducer = catalogSlice.reducer;
