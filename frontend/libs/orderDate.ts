import { Product } from "@/types/Product";

const OrderToStockDelay = 14; // todo change

export const getWhenToOrderIndex = (product: Product) => {
    return getWhenToRunOutIndex(product) - OrderToStockDelay;
};

export const getWhenToRunOutIndex = (product: Product) => {
    if (product.marketability === 0) return 0;
    return Math.max(Math.floor(product.stock_count / product.marketability), 0);
};
