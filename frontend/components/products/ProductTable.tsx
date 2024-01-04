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
import ArrowDownAZ from "@/icons/ArrowDownAZ";
import { SortValues } from "@/types/Filter";
import ArrowDownZA from "@/icons/ArrowDownZA";
import { getSortOption, sortOptions } from "@/libs/sort";
import ArrowDown01 from "@/icons/ArrowDown01";
import ArrowDown10 from "@/icons/ArrowDown10";

type Column = {
    name: string;
    sortValue: SortValues;
    iconType: string;
};

const COLUMNS: Column[] = [
    { name: "Identifikátor", sortValue: SortValues.Identificator, iconType: "string" },
    { name: "EAN", sortValue: SortValues.EAN, iconType: "string" },
    { name: "Název", sortValue: SortValues.Name, iconType: "string" },
    { name: "Kód dodavatele", sortValue: SortValues.SupplierCode, iconType: "string" },
    { name: "Zásoba", sortValue: SortValues.Stock, iconType: "number" },
    { name: "Nákupní cena [CZK]", sortValue: SortValues.BuyPrice, iconType: "number" },
    { name: "Prodejní cena [CZK]", sortValue: SortValues.RetailPrice, iconType: "number" },
    { name: "Denní prodejnost", sortValue: SortValues.Marketability, iconType: "number" },
    { name: "Objednávkové okno", sortValue: SortValues.OrderDate, iconType: "number" },
];

const ProductTable = ({ productsDefault }: { productsDefault: Product[] }) => {
    const [products, setProducts] = useState<Product[]>(productsDefault);
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [loading, setLoading] = useState(false);

    const pagination = useContext(PaginationContext);
    const { filters, setFilters } = useFilters();

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters.timespanDays]);

    const sortOption = getSortOption(filters.sort, filters.direction);

    if (!pagination) return null;

    return (
        <>
            <FilterRow products={filteredProducts} perPage={filters.perPage} />

            {!loading ? (
                <div className="overflow-x-auto" style={{ maxHeight: "calc(100vh - 68px - 72px)" }}>
                    <table className="table table-zebra">
                        <thead className="sticky top-0">
                            <tr className="bg-base-100">
                                {COLUMNS.map(({ name, sortValue, iconType }) => (
                                    <th
                                        key={name}
                                        onClick={() => {
                                            setFilters((prev) => {
                                                if (prev.sort === sortValue) {
                                                    return { ...prev, direction: prev.direction === "asc" ? "desc" : "asc" };
                                                }
                                                return { ...prev, sort: sortValue, direction: iconType === "string" ? "asc" : "desc" };
                                            });
                                        }}
                                        className={`cursor-pointer ${filters.sort === sortValue && "text-primary"}`}
                                    >
                                        <div className="flex items-center gap-2">
                                            {name}
                                            {filters.sort === sortValue ? (
                                                filters.direction === "asc" ? (
                                                    iconType === "string" ? (
                                                        <ArrowDownAZ />
                                                    ) : (
                                                        <ArrowDown01 />
                                                    )
                                                ) : iconType === "string" ? (
                                                    <ArrowDownZA />
                                                ) : (
                                                    <ArrowDown10 />
                                                )
                                            ) : null}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts
                                .sort(sortOption)
                                .slice((pagination.currentPage - 1) * filters.perPage, pagination.currentPage * filters.perPage)
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
