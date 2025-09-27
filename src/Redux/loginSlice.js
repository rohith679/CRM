import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    handleOpenLogin: (state, payload) => {
      state.isOpen = true;
    },
    handleCloseLogin: (state, payload) => {
      state.isOpen = false;
    },
  },
});

// Action creators are generated for each case reducer function
// console.log("this is counter slice", counterSlice);
export const { handleOpenLogin, handleCloseLogin } = loginSlice.actions;

export default loginSlice.reducer;
