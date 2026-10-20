import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./Slices/productsSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatcher = typeof store.dispatch