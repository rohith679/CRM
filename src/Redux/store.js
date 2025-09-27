import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import authBooking from "./booking";
import subscriptionSlice from "./subscriptionModal";
import locationSlice from "./location";
import loginSlice from "./loginSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: authBooking,
    subscription: subscriptionSlice,
    location: locationSlice,
    login: loginSlice,
  },
});

export default store;
