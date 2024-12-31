import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { quotesApiSlice } from "./features/quotes/quotesApiSlice";
import { productApiSlice } from "./features/products/productApiSlice";
import productSlice from "./features/products/productSlice";

const rootReducer = combineReducers({
  products: productSlice, // Reducer de productos personalizados
  [quotesApiSlice.reducerPath]: quotesApiSlice.reducer, // Reducer RTK Query
  [productApiSlice.reducerPath]: productApiSlice.reducer, // Reducer RTK Query
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        quotesApiSlice.middleware,
        productApiSlice.middleware
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
