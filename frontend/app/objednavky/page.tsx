import OrderTable from "@/components/orders/OrderTable";
import React from "react";

// enforce no caching
export const dynamic = "force-dynamic";
export const revalidate = 0;

const Orders = () => {
    return (
        <main className="bg-base-100 text-base-content">
            <OrderTable />
        </main>
    );
};

export default Orders;
