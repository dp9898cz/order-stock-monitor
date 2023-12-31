"use client";
import { useFilters } from "@/context/FiltersContext";
import React, { forwardRef, useState } from "react";

const Search = forwardRef<HTMLInputElement>(function Search({}, ref) {
    const [search, setSearch] = useState("");
    const { setFilters } = useFilters();

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
                ref={ref}
                onChange={(event) => {
                    setSearch(event.target.value);
                }}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        event.preventDefault();
                        setFilters((prev) => {
                            if (!search) return prev;
                            return { ...prev, search };
                        });
                    }
                }}
            ></input>
        </div>
    );
});

export default Search;
