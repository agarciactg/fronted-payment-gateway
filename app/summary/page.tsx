"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // Agregar useRouter para la redirección
import { Spin, Typography, Card, Alert, Button } from "antd";
import axios from "axios";

const { Title, Text } = Typography;

const TransactionSummary = () => {
    const searchParams = useSearchParams();
    const transactionId = searchParams.get("transactionId"); // Obtener el ID de la transacción desde los parámetros de búsqueda
    const router = useRouter(); // Hook para redirección

    const [transactionDetails, setTransactionDetails] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (transactionId) {
            const fetchTransactionDetails = async () => {
                try {
                    const response = await axios.get(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/wompi/transactions/${transactionId}`
                    );
                    setTransactionDetails(response.data.data); // Almacenar detalles de la transacción
                } catch (err) {
                    setError("Failed to fetch transaction details. Please try again.");
                    console.error("Error fetching transaction details:", err);
                } finally {
                    setLoading(false);
                }
            };

            fetchTransactionDetails();
        } else {
            setError("Transaction ID is missing. Please return to the previous step.");
            setLoading(false);
        }
    }, [transactionId]);

    if (loading) return <Spin size="large" />;

    if (error) {
        return (
            <Alert
                message="Error"
                description={error}
                type="error"
                showIcon
            />
        );
    }

    if (!transactionDetails) {
        return <div>No transaction details available for the provided ID.</div>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <Title level={2}>Transaction Summary</Title>
            <Card style={{ marginTop: 20 }}>
                <div>
                    <Text strong>Transaction ID:</Text> {transactionDetails.id}
                </div>
                <div>
                    <Text strong>Status:</Text> {transactionDetails.status}
                </div>
                <div>
                    <Text strong>Reference:</Text> {transactionDetails.reference}
                </div>
                <div>
                    <Text strong>Amount:</Text> COP ${transactionDetails.amount_in_cents / 100}
                </div>
                <div>
                    <Text strong>Payment Method:</Text> {transactionDetails.payment_method.extra.name}
                </div>
                <div>
                    <Text strong>Installments:</Text> {transactionDetails.payment_method.installments}
                </div>
                <div>
                    <Text strong>Merchant:</Text> {transactionDetails.merchant.name}
                </div>
            </Card>
            {/* Botón para redirigir a la lista de productos */}
            <Button
                type="primary"
                style={{ marginTop: 20 }}
                onClick={() => router.push("/")} // Redirige a la lista de productos
            >
                Go to Products
            </Button>
        </div>
    );
};

export default TransactionSummary;
