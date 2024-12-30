import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

export const getProducts = async () => {
  const response = await axios.get(`${baseUrl}/products`);
  return response.data;
};

export const createProduct = async (product: any) => {
  const response = await axios.post(`${baseUrl}/products`, product);
  return response.data;
};

// Otros métodos como updateProduct, deleteProduct, etc., también pueden añadirse
