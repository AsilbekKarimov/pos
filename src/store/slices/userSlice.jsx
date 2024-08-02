import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    profileId: null,
  },
  reducers: {
    addUser(state, action) {
      const user = action.payload.user;
      state.user = user;
    },
    deleteUser(state) {
      state.user = {};
    },
    addProfileId(state, action) {
      const profileId = action.payload.profileId;
      state.profileId = profileId;
    },
  },
});

export const { addUser, deleteUser, addProfileId } = userSlice.actions;
export default userSlice.reducer;
