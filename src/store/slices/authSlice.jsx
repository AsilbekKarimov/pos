import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
  },
  reducers: {
    setIsAuth(state, action) {
      const newAuthState = action.payload;
      state.isAuth = newAuthState;
    },
  },
});

export const { setIsAuth } = authSlice.actions;

export default authSlice.reducer;
