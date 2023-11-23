"use client";
import { useEffect, useState } from "react";
import AppBar from "./AppBar";
import FilterRow from "./FilterRow";
import { FilterProvider } from "./FiltersContext";
import ProductTable from "./ProductTable";
import { calculateMarketability } from "./helpers/calculateMarketability";

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const getData = async () => {
            const resp = await (await fetch("/api/products")).json();
            resp.data.forEach((product: Product) => {
                const m = calculateMarketability(product, 90);
                product.marketability = m;
            });
            setProducts(resp.data);
        };
        getData();
    }, []);

    return (
        <FilterProvider>
            <AppBar />
            <main className="bg-base-100 text-base-content">
                <FilterRow />
                <ProductTable products={products} />
            </main>
        </FilterProvider>
    );
}
