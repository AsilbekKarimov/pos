import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import themeReducer from "./slices/themeSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    user: userReducer,
    
  },
});

export default store;
