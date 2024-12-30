"use client";

import React, { useState } from "react";
import { List, Card, Typography, Button, Spin, Modal } from "antd";
import { useGetProductsQuery } from "../../../lib/features/products/productApiSlice";
import { useGetProductByIdQuery } from "../../../lib/features/products/productApiSlice"; // Endpoint para obtener el detalle de un producto

const { Title } = Typography;

const ProductList = () => {
  const { data: products, isLoading, isError, error } = useGetProductsQuery();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const { data: productDetails, isLoading: isDetailsLoading } =
    useGetProductByIdQuery(selectedProductId, { skip: !selectedProductId }); // Evita la consulta inicial sin ID

  const handleShowDetails = (productId: number) => {
    setSelectedProductId(productId);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedProductId(null); // Resetea el ID seleccionado
  };

  if (isLoading) return <Spin size="large" />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>Product List</Title>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={products}
        renderItem={(product: any) => (
          <List.Item>
            <Card
              title={product.name}
              extra={
                <Button
                  type="primary"
                  onClick={() => handleShowDetails(product.id)}
                >
                  Details
                </Button>
              }
            >
              <p>{product.description}</p>
              <p>
                <strong>Price:</strong> ${product.price}
              </p>
            </Card>
          </List.Item>
        )}
      />

      {/* Modal para mostrar los detalles del producto */}
      <Modal
        title="Product Details"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={
          <Button type="primary" onClick={handleCloseModal}>
            Close
          </Button>
        }
      >
        {isDetailsLoading ? (
          <Spin size="large" />
        ) : productDetails ? (
          <div>
            <p>
              <strong>Name:</strong> {productDetails.name}
            </p>
            <p>
              <strong>Description:</strong> {productDetails.description}
            </p>
            <p>
              <strong>Price:</strong> ${productDetails.price}
            </p>
          </div>
        ) : (
          <div>No details available.</div>
        )}
      </Modal>
    </div>
  );
};

export default ProductList;
