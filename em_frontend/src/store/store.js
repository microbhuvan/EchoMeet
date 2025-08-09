import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import activationReducer from "./activationSlice";

export const store = configureStore({
  reducer: {
    authSlice: authReducer,
    activationSlice: activationReducer,
  },
});
