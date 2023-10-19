import React from "react";
import OrderTableCell from "./OrderTableCell";

const ProductTable = ({ products }: { products: Product[] }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th className="text-center">EAN</th>
                        <th className="text-center">Název</th>
                        <th>Kód dodavatele</th>
                        <th>Zásoba</th>
                        <th>Nákupní cena [CZK]</th>
                        <th>Prodejní cena [CZK]</th>
                        <th>Denní prodejnost</th>
                        <th>Objednávkové okno</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.name}>
                            <th>{product.EAN_code}</th>
                            <td className="text-center min-w-[150px]">{product.name}</td>
                            <td className="text-center">{product.supplier_code}</td>
                            <td className="text-center">{product.supply}</td>
                            <td className="text-center">{product.shop_price_CZK}</td>
                            <td className="text-center">{product.sell_price_CZK}</td>
                            <td className="text-center">{product.avg_sell_per_day}</td>
                            <td>
                                <OrderTableCell daysToRunOut={product.days_to_run_out} orderToStockDelay={product.order_to_restock_delay} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
