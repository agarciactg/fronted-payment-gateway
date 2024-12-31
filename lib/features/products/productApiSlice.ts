import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Usamos una variable de entorno para la URL base del backend
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const productApiSlice = createApi({
    reducerPath: "productApi", // Path para el store
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => "/products", // Endpoint de productos
        }),
        getProductById: builder.query({
            query: (id) => `/products/${id}`, // Endpoint para un producto específico
        }),
        // createProduct: builder.mutation({
        //     query: (product) => ({
        //         url: "/products",
        //         method: "POST",
        //         body: product,
        //     }),
        // }),
        // updateProduct: builder.mutation({
        //     query: ({ id, ...product }) => ({
        //         url: `/products/${id}`,
        //         method: "PUT",
        //         body: product,
        //     }),
        // }),
        // deleteProduct: builder.mutation({
        //     query: (id) => ({
        //         url: `/products/${id}`,
        //         method: "DELETE",
        //     }),
        // }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    // useCreateProductMutation,
    // useUpdateProductMutation,
    // useDeleteProductMutation,
} = productApiSlice;
