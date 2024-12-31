"use client";

import React, { useEffect, useState } from "react";
import CreditCardDeliveryInfo from "../components/checkout/CreditCardDeliveryInfo";
import { useSearchParams } from "next/navigation";
import { Spin, Typography } from "antd";
import axios from "axios";

const { Title, Text } = Typography;

const CheckoutPage = () => {
    const searchParams = useSearchParams();
    const productId = searchParams.get("productId"); 


    const [productDetails, setProductDetails] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (productId) {
          const fetchProductDetails = async () => {
            try {
              const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/products/${productId}`
              );
              setProductDetails(response.data);
            } catch (error) {
              console.error("Error fetching product details:", error);
            } finally {
              setLoading(false);
            }
          };
    
          fetchProductDetails();
        }
      }, [productId]);

      if (loading) return <Spin size="large" />;

      if (!productDetails)
        return <div>No product details available for the selected product.</div>;
    

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>Checkout</Title>
      <p>
        You are checking out with product ID: <strong>{productId}</strong>
      </p>

      <div>
        <Text>
          <strong>Name:</strong> {productDetails.name}
        </Text>
      </div>
      <div>
        <Text>
          <strong>Description:</strong> {productDetails.description}
        </Text>
      </div>
      <div>
        <Text>
          <strong>Price:</strong> ${productDetails.price}
        </Text>
      </div>
      <CreditCardDeliveryInfo />
    </div>
  );
};

export default CheckoutPage;
