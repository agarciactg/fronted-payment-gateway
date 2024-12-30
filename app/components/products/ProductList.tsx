"use client";

import React from "react";
import { List, Card, Typography, Button, Spin } from "antd";
import { useGetProductsQuery } from "../../../lib/features/products/productApiSlice";

const { Title } = Typography;

const ProductList = () => {
  const { data: products, isLoading, isError, error } = useGetProductsQuery();

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
              extra={<Button type="primary">Details</Button>}
            >
              <p>{product.description}</p>
              <p>
                <strong>Price:</strong> ${product.price}
              </p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ProductList;
