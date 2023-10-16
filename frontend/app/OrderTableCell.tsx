import React from "react";

const sampleProduct = {
    daysToRunOut: 30,
    orderToStockDelay: 14,
};

const WINDOW_LENGTH: number = 30;
const ORANGE_MARK_LENGTH: number = 5;

const OrderTableCell = () => {
    const getDayNumberWithIndex = (index: number): string => {
        const date = new Date();
        date.setDate(date.getDate() + index);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
        });
    };

    const generateBGAndTextColor = (index: number, daysToRunOut: number, orderToStockDelay: number): string => {
        if (index < daysToRunOut - ORANGE_MARK_LENGTH) return "bg-green-600 text-white";
        if (index < daysToRunOut) return "bg-orange-400 text-white";
        else return "bg-red-500 text-white";
    };

    const generateOutline = (index: number, daysToRunOut: number, orderToStockDelay: number): string => {
        if (index === daysToRunOut - orderToStockDelay || (index === 0 && daysToRunOut - orderToStockDelay < 0))
            return "outline outline-2 outline-red-500 outline-offset-2 mx-[3px]";
        return "";
    };

    return (
        <div className="flex flex-row gap-1">
            {Array.from({ length: WINDOW_LENGTH }, (_, idx) => (
                <div
                    key={idx}
                    className={`${generateBGAndTextColor(idx, sampleProduct.daysToRunOut, sampleProduct.orderToStockDelay)} ${generateOutline(
                        idx,
                        sampleProduct.daysToRunOut,
                        sampleProduct.orderToStockDelay
                    )} p-1 rounded `}
                >
                    {getDayNumberWithIndex(idx)}
                </div>
            ))}
        </div>
    );
};

export default OrderTableCell;
