import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likeCount: null,
  patientCount: null,
};
const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    getDetails: (state, action) => {
      state.likeCount = action.payload?.likePercent;
      state.patientCount = action.payload?.patientCount;
    },
  },
});

export const { getDetails } = bookingSlice.actions;
export default bookingSlice.reducer;
