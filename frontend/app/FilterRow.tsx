import React from "react";
import DropdownRadio from "./DropdownRadio";
import Search from "./Search";
import FilterButton from "./FilterButton";
import ExportButton from "./ExportButton";

const FilterRow = () => {
    return (
        <div className="w-full p-2 flex justify-between items-center gap-1 flex-wrap">
            <section className="flex items-center gap-2">
                <Search />
                <FilterButton />
            </section>
            <section className="flex felx-1 items-center gap-2 justify-between">
                <DropdownRadio />
                <ExportButton />
            </section>
        </div>
    );
};

export default FilterRow;
