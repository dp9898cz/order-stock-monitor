import { CellDate } from "@/types/CellDate";
import React from "react";

const OrderTableCell = ({ daysToRunOut, whenToOrderIndex, dates }: { daysToRunOut: number; whenToOrderIndex: number; dates: CellDate[] }) => {
    return (
        <div className="flex flex-row gap-1">
            {dates.map((date, idx) => {
                const backgroundColor =
                    idx < daysToRunOut
                        ? `${idx > whenToOrderIndex ? "bg-orange-400" : idx === 0 && whenToOrderIndex === 0 ? "bg-orange-400" : "bg-green-600"}`
                        : `bg-red-500`;

                const outline =
                    idx === whenToOrderIndex ? `${idx === 0 ? "outline-dashed" : "outline"} outline-4 outline-red-500 outline-offset-2 mx-1` : ``;

                return (
                    <div key={idx} className={`p-1 relative rounded text-white ${backgroundColor} ${outline}`}>
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
