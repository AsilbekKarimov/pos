import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
  },
  reducers: {
    setIsAuth(state, action) {
      const newAuthState = action.payload;

      if (newAuthState in [true, false]) {
        state.isAuth = newAuthState;
      } else {
        state.isAuth = false;
      }
    },
  },
});

export const { setIsAuth } = authSlice.actions;

export default authSlice.reducer;
