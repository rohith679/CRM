import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  hasModalShown: false,
  expiryDate: null,
};

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    handleOpenModal: (state, payload) => {
      state.isOpen = true;
    },
    handleCloseModal: (state, payload) => {
      state.isOpen = false;
    },
    markModalShown: (state) => {
      state.hasModalShown = true; // ✅ set flag
    },
    setExpiryDate: (state, action) => {
      state.expiryDate = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
// console.log("this is counter slice", counterSlice);
export const {
  handleOpenModal,
  handleCloseModal,
  markModalShown,
  setExpiryDate,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
