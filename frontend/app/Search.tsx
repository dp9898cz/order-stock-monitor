"use client";
import React from "react";
import { useFilters } from "./FiltersContext";

const Search = () => {
    const { filters, setFilters } = useFilters();
    return (
        <div className="ml-3 input input-bordered flex items-center gap-3">
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
            </svg>
            <input
                type="text"
                placeholder="Vyhledat"
                className="w-full max-w-xs min-w-[100px] bg-transparent"
                value={filters.search}
                onChange={(e) => {
                    setFilters((prev) => {
                        return { ...prev, search: e.target.value };
                    });
                }}
            ></input>
        </div>
    );
};

export default Search;
