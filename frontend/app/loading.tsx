import React from "react";
import { FilterProvider } from "./FiltersContext";
import AppBar from "./AppBar";
import FilterRow from "./FilterRow";

const Loading = () => {
    return (
        <FilterProvider>
            <AppBar />
            <main className="bg-base-100 text-base-content">
                <FilterRow dataLength={0} />
                <div className="flex w-full justify-center items-center">
                    <span className="loading loading-spinner loading-lg mt-5"></span>
                </div>
            </main>
        </FilterProvider>
    );
};

export default Loading;
