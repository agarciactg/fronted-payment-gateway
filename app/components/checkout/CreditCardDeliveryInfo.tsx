"use client";

import React, { useState } from "react";
import { Form, Input, Button, message, Spin } from "antd";
import axios from "axios";
import { useSelectedProduct } from "../../../lib/hooks"; // Hook para obtener el producto seleccionado
import { useRouter } from "next/navigation"; // Usar useRouter para redireccionar

const CreditCardDeliveryInfo = () => {
    const [loading, setLoading] = useState(false); // Estado de carga
    const [cardType, setCardType] = useState<string | null>(null); // Estado para el tipo de tarjeta
    const router = useRouter(); // Hook de Next.js para redireccionar

    // Obtiene el producto seleccionado desde el store
    const selectedProduct: any = useSelectedProduct();

    /**
     * Detecta el tipo de tarjeta (Visa/Mastercard) según el número ingresado.
     * @param cardNumber Número de tarjeta ingresado.
     */
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

    /**
     * Maneja los cambios en el campo de número de tarjeta.
     * @param e Evento del input.
     */
    const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cardNumber = e.target.value.replace(/\s+/g, ""); // Elimina espacios
        detectCardType(cardNumber);
    };

    // URL base definida desde variables de entorno o valor por defecto
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    /**
     * Maneja el envío del formulario.
     * @param values Valores del formulario.
     */
    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            // Paso 1: Tokenizar la tarjeta
            const cardResponse = await axios.post(`${baseUrl}/wompi/tokenize-card`, {
                number: values.cardNumber,
                cvc: values.cvc,
                exp_month: values.expMonth,
                exp_year: values.expYear,
                card_holder: values.cardHolder,
            });

            const cardToken = cardResponse.data.data.id;

            // Paso 2: Obtener el acceptance_token
            const acceptanceResponse = await axios.get(`${baseUrl}/wompi/acceptance-token`);
            const acceptanceToken = acceptanceResponse.data.acceptance_token;

            // Paso 3: Crear la transacción
            if (selectedProduct) {
                const transactionData = {
                    reference: `order_${Date.now()}`,
                    amountInCents: selectedProduct.price * 100, // Convierte el precio del producto a centavos
                    currency: "COP",
                    customerEmail: values.email, // Email ingresado en el formulario
                    cardToken: cardToken,
                    installments: parseInt(values.quotas, 10),
                    productId: selectedProduct.id,
                    customerId: 1, // ID del cliente (puede venir de autenticación)
                    acceptanceToken: acceptanceToken,
                };

                const transactionResponse = await axios.post(
                    `${baseUrl}/wompi/create-transaction`,
                    transactionData
                );

                // Paso 4: Crear la entrega
                if (transactionResponse) {
                    await axios.post(`${baseUrl}/deliveries`, {
                        transactionId: transactionResponse.data.appTransaction.wompiTransactionId,
                        address: values.address, // Dirección ingresada en el formulario
                    });

                    message.success("Transaction created successfully!");

                    // Redirecciona al resumen con el transactionId
                    const transactionId = transactionResponse.data.appTransaction.wompiTransactionId;
                    router.push(`/summary?transactionId=${transactionId}`);
                }
            } else {
                message.error("No product selected.");
            }
        } catch (error) {
            console.error("Error creating transaction:", error);
            message.error("Failed to create transaction.");
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
                    <Form.Item label="Email" name="email" rules={[{ required: true }]}>
                        <Input placeholder="user@mail.com" />
                    </Form.Item>
                    <Form.Item label="Quotas" name="quotas" rules={[{ required: true }]}>
                        <Input type="number" placeholder="2" />
                    </Form.Item>
                    <Form.Item label="Address" name="address" rules={[{ required: true }]}>
                        <Input placeholder="Main street - M 09" />
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
