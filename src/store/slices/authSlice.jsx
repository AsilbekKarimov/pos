import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    accessToken: "",
    expirationTime: 0,
  },
  reducers: {
    setIsAuth(state, action) {
      const newAuthState = action.payload.isAuth;
      const newAccessToken = action.payload.token;
      const newExpirationTime = action.payload.time;
      
      state.isAuth = newAuthState;
      state.accessToken = newAccessToken;
      state.expirationTime = newExpirationTime;
    },
  },
});

export const { setIsAuth } = authSlice.actions;

export default authSlice.reducer;
