"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import OrderTableCell from "./OrderTableCell";
import { PaginationContext } from "../../context/Pagination";
import { Product } from "@/types/Product";
import { useFilters } from "@/context/FiltersContext";

import FilterRow from "./FilterRow";
import { filterProducts } from "@/services/filterProducts";
import { CellDate } from "@/types/CellDate";
import { getData } from "@/services/getData";

const PRODUCTS_PER_PAGE = 50;

const ProductTable = ({ productsDefault }: { productsDefault: Product[] }) => {
    const [products, setProducts] = useState<Product[]>(productsDefault);
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [loading, setLoading] = useState(false);

    const pagination = useContext(PaginationContext);
    const { filters } = useFilters();

    const filteredProducts = useMemo(() => filterProducts(products, filters.search), [products, filters.search]);

    const dates: CellDate[] = useMemo(() => {
        return Array.from({ length: 180 }, (_, idx) => {
            const date = new Date(new Date().setDate(new Date().getDate() + idx));
            return {
                date,
                index: idx,
                day: date.toLocaleDateString("en-GB", { day: "2-digit" }),
            };
        });
    }, []);

    useEffect(() => {
        if (!isInitialRender) {
            setLoading(true);
            getData(filters.timespanDays).then((data) => {
                setProducts(data);
                setLoading(false);
            });
        } else {
            setIsInitialRender(false);
        }
    }, [filters.timespanDays]);

    if (!pagination) return null;

    return (
        <>
            <FilterRow products={filteredProducts} />

            {!loading ? (
                <div className="overflow-x-auto" style={{ maxHeight: "calc(100vh - 68px - 72px)" }}>
                    <table className="table table-zebra">
                        <thead className="sticky top-0">
                            <tr className="bg-base-100">
                                <th>Identifikátor</th>
                                <th>EAN</th>
                                <th>Název</th>
                                <th>Kód dodavatele</th>
                                <th>Zásoba</th>
                                <th>Nákupní cena [CZK]</th>
                                <th>Prodejní cena [CZK]</th>
                                <th>Denní prodejnost</th>
                                <th>Objednávkové okno</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts
                                .sort((a, b) => b.marketability - a.marketability)
                                .slice((pagination.currentPage - 1) * PRODUCTS_PER_PAGE, pagination.currentPage * PRODUCTS_PER_PAGE)
                                .map((product, idx) => (
                                    <tr key={idx}>
                                        <th className="max-w-[250px]">{product.id}</th>
                                        <td>{product.ean}</td>
                                        <td className="text-center min-w-[150px]">{product.name}</td>
                                        <td className="text-center">{product.company}</td>
                                        <td className="text-center">{product.stock_count}</td>
                                        <td className="text-center">{product.buy_price}</td>
                                        <td className="text-center">{product.sell_price}</td>
                                        <td className="text-center">{product.marketability.toPrecision(3)}</td>
                                        <td>
                                            <OrderTableCell
                                                daysToRunOut={Math.max(Math.floor(product.stock_count / product.marketability), 0)}
                                                orderToStockDelay={14}
                                                dates={dates}
                                            />
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="flex w-full justify-center items-center">
                    <span className="loading loading-spinner loading-lg mt-5"></span>
                </div>
            )}
        </>
    );
};

export default ProductTable;
