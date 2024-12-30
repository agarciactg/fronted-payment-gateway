import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle", // Puede ser 'idle', 'loading', 'succeeded', o 'failed'
    error: null,
  },
  reducers: {
    setProducts(state, action) {
      state.items = action.payload;
    },
    clearProducts(state) {
      state.items = [];
    },
  },
});

export const { setProducts, clearProducts } = productSlice.actions;
export default productSlice.reducer;
