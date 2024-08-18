import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slice.js";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});
