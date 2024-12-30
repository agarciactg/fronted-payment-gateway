import React from "react";
import ProductList from "./components/products/ProductList";


export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Product Dashboard</h1>
      <ProductList />
    </div>
  );
}
