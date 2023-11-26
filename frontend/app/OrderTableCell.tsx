import React from "react";
import { oneMonthPrior } from "./helpers/date";

const WINDOW_LENGTH: number = 180;
const ORANGE_MARK_LENGTH: number = 7;

const OrderTableCell = ({ daysToRunOut, orderToStockDelay }: { daysToRunOut: number; orderToStockDelay: number }) => {
    const today = new Date();
    const dateToOrder = new Date();
    dateToOrder.setDate(dateToOrder.getDate() + (daysToRunOut - orderToStockDelay));

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
        if (index === daysToRunOut - orderToStockDelay) {
            return "outline outline-4 outline-red-500 outline-offset-2 mx-1";
        } else if (index === 0 && daysToRunOut - orderToStockDelay < 0) {
            return "outline-dashed outline-4 outline-red-500 outline-offset-2 mx-1";
        }
        return "";
    };

    return (
        <div className="flex flex-row gap-1">
            {Array.from({ length: WINDOW_LENGTH }, (_, idx) => {
                const date = new Date();
                date.setDate(date.getDate() + idx);

                const day = getDayNumberWithIndex(idx);
                const backgroundColor = generateBGAndTextColor(idx, daysToRunOut, orderToStockDelay);
                const outline = generateOutline(idx, daysToRunOut, orderToStockDelay);
                const isNewMonth = parseInt(day) === 1;

                // add offset if last month was the one with order
                const removeMonthOffset = dateToOrder < date && dateToOrder.getMonth() === oneMonthPrior(date).getMonth();

                return (
                    <div key={idx} className="flex gap-1">
                        {isNewMonth ? (
                            <div key={idx + 5000} className={`py-1 rounded ml-2 ${removeMonthOffset ? "" : "ml-4"}`}>
                                {date.toLocaleDateString("cs", { month: "short" })}
                            </div>
                        ) : null}
                        <div key={idx} className={`p-1 rounded ${backgroundColor} ${outline}`}>
                            {day}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default OrderTableCell;
