import React, { memo } from "react";

interface DateCellProps {
    day: string;
    backgroundColor: string;
    outline: string;
}

const DateCell = ({ backgroundColor, day, outline }: DateCellProps) => {
    return <div className={`p-1 rounded ${backgroundColor} ${outline}`}>{day}</div>;
};

export default memo(DateCell);
