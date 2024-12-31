"use client";

import React, { useState } from "react";
import { Form, Input, Button, message, Spin } from "antd";
import axios from "axios";

const CreditCardDeliveryInfo = () => {
    const [loading, setLoading] = useState(false);
    const [cardType, setCardType] = useState<string | null>(null);


    // Función para detectar el tipo de tarjeta
    const detectCardType = (cardNumber: string) => {
        const visaRegex = /^4[0-9]{0,15}$/;
        const mastercardRegex = /^5[1-5][0-9]{0,14}$/;

        if (visaRegex.test(cardNumber)) {
            setCardType("visa");
        } else if (mastercardRegex.test(cardNumber)) {
            setCardType("mastercard");
        } else {
            setCardType(null);
        }
    };

    const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cardNumber = e.target.value.replace(/\s+/g, ""); // Remover espacios
        detectCardType(cardNumber);
    };

    // definiendo urlbase
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

    const handleSubmit = async (values: any) => {
        setLoading(true);
        console.log("Form Values:", values);
        try {
            // Tokenizar tarjeta
            const cardResponse = await axios.post(
                `${baseUrl}/wompi/tokenize-card`,
                {
                    number: values.cardNumber,
                    cvc: values.cvc,
                    exp_month: values.expMonth,
                    exp_year: values.expYear,
                    card_holder: values.cardHolder,
                }
            );

            console.log("Card Response: ",cardResponse)

            // Guardar el id de la tarjeta en localStorage
            localStorage.setItem("tokenize_id", cardResponse.data.data.id);


            // obteniendo acceptance_token
            const acceptanceResponse = await axios.get(`${baseUrl}/wompi/acceptance-token`);
            const token = acceptanceResponse.data.acceptance_token;

            // Guardar el token en localStorage
            localStorage.setItem("acceptance_token", token);

            message.success("Payment and delivery information saved successfully!");
        } catch (error) {
            console.error(error);
            message.error("Failed to save payment and delivery information.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Checkout - Payment & Delivery Info</h2>
            {loading ? (
                <Spin size="large" />
            ) : (
                <Form layout="vertical" onFinish={handleSubmit}>
                    <h3>Credit Card Information</h3>
                    <Form.Item label="Card Number" name="cardNumber" rules={[{ required: true }]}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Input
                                placeholder="4242 4242 4242 4242"
                                onChange={handleCardInputChange}
                                style={{ flex: 1 }}
                            />
                            {cardType === "visa" && (
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                                    alt="Visa"
                                    style={{ width: 40, marginLeft: 10 }}
                                />
                            )}
                            {cardType === "mastercard" && (
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg"
                                    alt="Mastercard"
                                    style={{ width: 40, marginLeft: 10 }}
                                />
                            )}
                        </div>
                    </Form.Item>
                    <Form.Item label="CVC" name="cvc" rules={[{ required: true }]}>
                        <Input placeholder="123" />
                    </Form.Item>
                    <Form.Item label="Expiration Month" name="expMonth" rules={[{ required: true }]}>
                        <Input placeholder="08" />
                    </Form.Item>
                    <Form.Item label="Expiration Year" name="expYear" rules={[{ required: true }]}>
                        <Input placeholder="28" />
                    </Form.Item>
                    <Form.Item label="Card Holder" name="cardHolder" rules={[{ required: true }]}>
                        <Input placeholder="John Doe" />
                    </Form.Item>

                    <h3>Delivery Information</h3>
                    <Form.Item label="email" name="email" rules={[{ required: true }]}>
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item label="quotas" name="quotas" rules={[{ required: true }]}>
                        <Input placeholder="quotas" />
                    </Form.Item>


                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form>
            )}
        </div>
    );
};

export default CreditCardDeliveryInfo;
