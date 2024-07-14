import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    addUser(state, action) {
      const user = action.payload.user;
      state.user = user;
    },
    deleteUser(state) {
      state.user = {};
    },
  },
});

export const { addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
