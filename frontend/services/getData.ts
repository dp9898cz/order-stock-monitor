import { Product } from "@/types/Product";
import { calculateMarketability } from "./calculateMarketability";

export const getData = async (days: number): Promise<Product[]> => {
    const env = process.env.NODE_ENV;
    const res = await fetch(`http://${env === "development" ? "localhost" : "backend"}:5000/getProducts?days=${days ? days : 90}`, {
        cache: "no-cache",
        mode: "cors",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });
    const data = await res.json();

    data.forEach((product: Product) => {
        const m = calculateMarketability(product, 90);
        product.marketability = m;
    });
    return data as Product[];
};
