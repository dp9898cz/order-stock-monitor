import { Product } from "@/types/Product";
import FilterRow from "../../components/products/FilterRow";
import ProductTable from "../../components/products/ProductTable";
import { calculateMarketability } from "../../services/calculateMarketability";

const getData = async (): Promise<Product[]> => {
    const env = process.env.NODE_ENV;
    const res = await fetch(`http://${env === "development" ? "localhost" : "backend"}:5000/getProducts`, { cache: "no-cache" });
    const data = await res.json();

    data.forEach((product: Product) => {
        const m = calculateMarketability(product, 90);
        product.marketability = m;
    });
    return data as Product[];
};

// enforce no caching
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
    const products = await getData();

    return (
        <main className="bg-base-100 text-base-content">
            <FilterRow dataLength={products.length} />
            <ProductTable products={products} />
        </main>
    );
}
