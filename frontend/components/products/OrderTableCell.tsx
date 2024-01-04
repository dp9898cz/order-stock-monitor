import { CellDate } from "@/types/CellDate";
import React from "react";

const ORANGE_MARK_LENGTH: number = 7;

const OrderTableCell = ({ daysToRunOut, orderToStockDelay, dates }: { daysToRunOut: number; orderToStockDelay: number; dates: CellDate[] }) => {
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
            {dates.map((date, idx) => {
                const backgroundColor = generateBGAndTextColor(idx, daysToRunOut, orderToStockDelay);
                const outline = generateOutline(idx, daysToRunOut, orderToStockDelay);

                return (
                    <div key={idx} className={`p-1 relative rounded ${backgroundColor} ${outline}`}>
                        {date.day}
                        {date.day === "01" ? (
                            <div className="absolute left-0 top-[-1.3rem] text-stone-500">
                                {date.date.toLocaleDateString("cs", { month: "short" })}
                            </div>
                        ) : null}
                    </div>
                );
            })}
        </div>
    );
};

export default OrderTableCell;
