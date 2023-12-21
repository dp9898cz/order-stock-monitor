"use client";
import { formatDate } from "@/libs/date";
import { calculateTotalPrice } from "@/libs/order";
import { generateRandomProduct } from "@/types/Product";
import React, { useState } from "react";
import OrderModal from "./OrderModal";

const ORDERS_EXAMPLE: Order[] = [
    {
        created: new Date(),
        number: "5457575sd",
        sent: undefined,
        supplier: "Pepa",
        received: undefined,
        items: [
            {
                product: generateRandomProduct(),
                quantity: 5,
            },
            {
                product: generateRandomProduct(),
                quantity: 4,
            },
            {
                product: generateRandomProduct(),
                quantity: 28,
            },
            {
                product: generateRandomProduct(),
                quantity: 3,
            },
            {
                product: generateRandomProduct(),
                quantity: 69,
            },
            {
                product: generateRandomProduct(),
                quantity: 420,
            },
        ],
    },
    {
        created: new Date(),
        number: "545757sd5",
        sent: undefined,
        supplier: "Pepa",
        received: undefined,
        items: [
            {
                product: generateRandomProduct(),
                quantity: 55,
            },
            {
                product: generateRandomProduct(),
                quantity: 49,
            },
            {
                product: generateRandomProduct(),
                quantity: 28,
            },
        ],
    },
    { created: new Date(), number: "54575s5d", sent: new Date(), supplier: "Pepa", received: undefined, items: [] },
    { created: new Date(), number: "545725sd", sent: new Date(), supplier: "Pepa", received: new Date(), items: [] },
];

const OrderTable = () => {
    const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
    return (
        <div className="overflow-x-auto" style={{ maxHeight: "calc(100vh - 68px - 72px)" }}>
            <table className="table">
                <thead className="sticky">
                    <tr>
                        <th>Číslo</th>
                        <th>Dodavatel</th>
                        <th className="text-center">Datum vytvoření</th>
                        <th className="text-center">Datum objednání</th>
                        <th className="text-center">Datum naskladnění</th>
                        <th className="text-center">Cena [Kč]</th>
                        <th className="text-center">Akce</th>
                    </tr>
                </thead>
                <tbody>
                    {ORDERS_EXAMPLE.map((order, idx) => (
                        <tr
                            key={idx}
                            className={`${order.sent ? (order.received ? "bg-green-200" : "bg-cyan-200") : ""} hover:bg-base-200 transition-colors`}
                        >
                            <th className="max-w-[250px]">{order.number}</th>
                            <td>{order.supplier}</td>
                            <td className="text-center">{formatDate(order.created)}</td>
                            <td className="text-center">{order.sent ? formatDate(order.sent) : "Neobjednáno"}</td>
                            <td className="text-center">{order.received ? formatDate(order.received) : "Nenaskladněno"}</td>
                            <td className="text-center">{calculateTotalPrice(order).toFixed(2)}</td>
                            <td className="flex justify-center gap-5">
                                {order.sent ? null : <button className="btn">Zvolit</button>}
                                <button className="btn" onClick={() => setCurrentOrder(order)}>
                                    Editovat
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <OrderModal id="order-modal" order={currentOrder} />
        </div>
    );
};

export default OrderTable;
