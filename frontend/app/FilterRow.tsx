import React from "react";
import DropdownRadio from "./DropdownRadio";
import Search from "./Search";

const FilterRow = () => {
    return (
        <div className="w-full p-2 flex justify-between items-center gap-1">
            <Search />
            <DropdownRadio />
        </div>
    );
};

export default FilterRow;
