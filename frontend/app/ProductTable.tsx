"use client";
import React, { useContext } from "react";
import OrderTableCell from "./OrderTableCell";
import { PaginationContext } from "./providers/Pagination";

const PRODUCTS_PER_PAGE = 50;

const ProductTable = ({ products }: { products: Product[] }) => {
    const pagination = useContext(PaginationContext);
    const env = process.env.NODE_ENV;

    if (!pagination) return null;

    return (
        <div className="overflow-x-auto" style={{ maxHeight: "calc(100vh - 68px - 72px)" }}>
            <table className="table table-zebra">
                <thead className="sticky">
                    <tr>
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
                    {products
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
                                    />
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
