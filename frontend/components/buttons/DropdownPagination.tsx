"use client";
import React, { useContext } from "react";
import { useFilters } from "../../context/FiltersContext";
import { PaginationContext } from "@/context/Pagination";

const DropdownPagination = () => {
    const { filters, setFilters } = useFilters();
    const pagination = useContext(PaginationContext);

    const changeState = (newP: number) => {
        setFilters((prev) => {
            return { ...prev, perPage: newP };
        });
        pagination?.setPage(1);
        try {
            (document.activeElement as HTMLElement).blur();
        } catch (error) {}
    };

    return (
        <>
            <div className="dropdown dropdown-bottom">
                <label tabIndex={0} className="btn ml-1 w-28" title="Počet produktů na jednu stranu.">
                    {filters.perPage}
                    <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box w-full">
                    {[50, 100, 200, 500].map((perP) => (
                        <li key={perP} onClick={() => changeState(perP)}>
                            <a>
                                <input type="radio" name={`radio-${perP}`} className="radio" checked={filters.perPage === perP} onChange={() => {}} />
                                {perP}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default DropdownPagination;
