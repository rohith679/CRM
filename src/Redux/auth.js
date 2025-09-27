import { createSlice } from "@reduxjs/toolkit";

const loadAuthData = () => {
  const stored = localStorage.getItem("authData");
  return stored ? JSON.parse(stored) : { userType: "", mobileNo: "" };
};
const initialState = {
  isAuthenticated: false,
  user: null,
  isSubscribed: false,
  isRegistration: false,
  notificationCount: 0,
  ...loadAuthData(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      // state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    handleUserType: (state, action) => {
      state.userType = action.payload;
      localStorage.setItem(
        "authData",
        JSON.stringify({
          userType: state.userType,
          mobileNo: state.mobileNo,
        })
      );
    },
    handleMobileNo: (state, action) => {
      state.mobileNo = action.payload;
      localStorage.setItem(
        "authData",
        JSON.stringify({
          userType: state.userType,
          mobileNo: state.mobileNo,
        })
      );
    },
    setUserProfile: (state, action) => {
      state.user = action.payload;
    },
    notificationCount: (state, action) => {
      state.notificationCount = action.payload;
    },
    userSubscribed: (state, action) => {
      state.isSubscribed = action.payload;
    },
  },
});

export const {
  login,
  logout,
  handleUserType,
  handleMobileNo,
  setUserProfile,
  notificationCount,
  userSubscribed,
} = authSlice.actions;
export default authSlice.reducer;
