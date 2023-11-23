import React from "react";
import OrderTableCell from "./OrderTableCell";

const ProductTable = ({ products }: { products: Product[] }) => {
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
                                    <OrderTableCell daysToRunOut={Math.floor(product.stock_count / product.marketability)} orderToStockDelay={14} />
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
