import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    selectedProduct: null, // Campo para el producto seleccionado
    status: "idle",
    error: null,
  },
  reducers: {
    setProducts(state, action) {
      state.items = action.payload;
    },
    clearProducts(state) {
      state.items = [];
    },
    setSelectedProduct(state, action) {
      state.selectedProduct = action.payload; // Establecer producto seleccionado
    },
    clearSelectedProduct(state) {
      state.selectedProduct = null; // Limpiar producto seleccionado
    },
  },
});

export const {
  setProducts,
  clearProducts,
  setSelectedProduct,
  clearSelectedProduct,
} = productSlice.actions;
export default productSlice.reducer;
