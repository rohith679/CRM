// store/slices/locationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const getInitialLocation = () => {
  const lat = localStorage.getItem("userLat");
  const lng = localStorage.getItem("userLong");

  return {
    latitude: lat ? parseFloat(lat) : null,
    longitude: lng ? parseFloat(lng) : null,
  };
};

const locationSlice = createSlice({
  name: "location",
  initialState: getInitialLocation(),
  reducers: {
    setLocation: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
  },
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
