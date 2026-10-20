import { getALLProducts } from "@/services/products.services";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const productsAction = createAsyncThunk("products/getAllProducts",async () => {
    const data = await getALLProducts();
    return data.data;
  }
);

const initialState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(productsAction.pending, () => {
      console.log("pending");
    });

    builder.addCase(productsAction.rejected, () => {
      console.log("rejected");
    });

    builder.addCase(productsAction.fulfilled, (state, action) => {
        console.log("fulfilled");
      state.products = action.payload;
    });
  },
});

export const productsReducer = productsSlice.reducer;