import { SortValues } from "@/types/Filter";
import { Product } from "@/types/Product";
import { getWhenToOrderIndex } from "./orderDate";

export const sortOptions = [
    {
        value: "id",
        asc: (a: Product, b: Product) => a.name.localeCompare(b.name),
        desc: (a: Product, b: Product) => b.name.localeCompare(a.name),
    },
    {
        value: "name",
        asc: (a: Product, b: Product) => a.name.localeCompare(b.name),
        desc: (a: Product, b: Product) => b.name.localeCompare(a.name),
    },
    {
        value: "ean",
        asc: (a: Product, b: Product) => a.ean?.localeCompare(b.ean),
        desc: (a: Product, b: Product) => b.ean?.localeCompare(a.ean),
    },
    {
        value: "supplierCode",
        asc: (a: Product, b: Product) => a.company?.localeCompare(b.company),
        desc: (a: Product, b: Product) => b.company?.localeCompare(a.company),
    },
    {
        value: "stock",
        asc: (a: Product, b: Product) => a.stock_count - b.stock_count,
        desc: (a: Product, b: Product) => b.stock_count - a.stock_count,
    },
    {
        value: "buyPrice",
        asc: (a: Product, b: Product) => a.buy_price - b.buy_price,
        desc: (a: Product, b: Product) => b.buy_price - a.buy_price,
    },
    {
        value: "retailPrice",
        asc: (a: Product, b: Product) => a.sell_price - b.sell_price,
        desc: (a: Product, b: Product) => b.sell_price - a.sell_price,
    },
    {
        value: "marketability",
        asc: (a: Product, b: Product) => a.marketability - b.marketability,
        desc: (a: Product, b: Product) => b.marketability - a.marketability,
    },
    {
        value: "orderDate",
        asc: (a: Product, b: Product) => getWhenToOrderIndex(a) - getWhenToOrderIndex(b),
        desc: (a: Product, b: Product) => getWhenToOrderIndex(b) - getWhenToOrderIndex(a),
    },
];

export const getSortOption = (value: SortValues | null, direction: "asc" | "desc") => {
    const option = sortOptions.find((option) => option.value === value);
    return option ? option[direction] : undefined;
};
