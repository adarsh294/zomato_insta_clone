import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "../tabs.js";

export const store = configureStore({
  reducer: {
    active: tabReducer
  }
});