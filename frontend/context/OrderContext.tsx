"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Product = {
    id: number;
    name: string;
    price: number;
};

type OrderItem = {
    product: Product;
    quantity: number;
};

type OrderData = {
    supplier: string;
    items: OrderItem[];
};

type OrderContextProps = {
    order: OrderData;
    setOrder: React.Dispatch<React.SetStateAction<OrderData>>;
    addProduct: (product: Product, quantity: number) => void;
    changeQuantity: (productId: number, newQuantity: number) => void;
    getFinalPrice: () => number;
};

const OrderContext = createContext<OrderContextProps | undefined>(undefined);

type OrderProviderProps = {
    children: ReactNode;
};

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
    const [order, setOrder] = useState<OrderData>({
        supplier: "",
        items: [],
    });

    const addProduct = (product: Product, quantity: number) => {
        setOrder((prevOrder) => ({
            ...prevOrder,
            items: [...prevOrder.items, { product, quantity }],
        }));
    };

    const changeQuantity = (productId: number, newQuantity: number) => {
        setOrder((prevOrder) => ({
            ...prevOrder,
            items: prevOrder.items.map((item) => (item.product.id === productId ? { ...item, quantity: newQuantity } : item)),
        }));
    };

    const getFinalPrice = () => {
        return order.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    return <OrderContext.Provider value={{ order, setOrder, addProduct, changeQuantity, getFinalPrice }}>{children}</OrderContext.Provider>;
};

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("useOrder must be used within an OrderProvider");
    }
    return context;
};
