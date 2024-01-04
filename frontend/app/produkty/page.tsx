import React from "react";
import ProductTable from "../../components/products/ProductTable";
import { getData } from "@/services/getData";

// enforce no caching
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
    const products = await getData(90);

    return (
        <main className="bg-base-100 text-base-content">
            <ProductTable productsDefault={products} />
        </main>
    );
}
