import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const getProducts = async () => {
  const response = await axios.get(`${baseUrl}/products`);
  return response.data;
};

export const createProduct = async (product: any) => {
  const response = await axios.post(`${baseUrl}/products`, product);
  return response.data;
};

// Otros métodos como updateProduct, deleteProduct, etc., también pueden añadirse

// metodo para las transaciones
export const createTransaction = async (data: any) => {
    try {
      const response = await axios.post(`${baseUrl}/transactions`, data);
      return response.data;
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw error;
    }
  };