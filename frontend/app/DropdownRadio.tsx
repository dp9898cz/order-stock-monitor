"use client";
import React from "react";
import { useFilters } from "./FiltersContext";

const DropdownRadio = () => {
    const { filters, setFilters } = useFilters();

    const changeState = (newTimeSpan: number) => {
        setFilters((prev) => {
            return { ...prev, timespanDays: newTimeSpan };
        });
        try {
            (document.activeElement as HTMLElement).blur();
        } catch (error) {}
    };

    return (
        <>
            <div className="dropdown dropdown-bottom">
                <label tabIndex={0} className="btn m-1 w-64">
                    <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                    </svg>
                    Posledních {filters.timespanDays} dní
                    <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full">
                    <li onClick={() => changeState(7)}>
                        <a>
                            <input type="radio" name="radio-7" className="radio" checked={filters.timespanDays === 7} onChange={() => {}} />
                            Posledních 7 dní
                        </a>
                    </li>
                    <li onClick={() => changeState(14)}>
                        <a>
                            <input type="radio" name="radio-14" className="radio" checked={filters.timespanDays === 14} onChange={() => {}} />
                            Posledních 14 dní
                        </a>
                    </li>
                    <li onClick={() => changeState(30)}>
                        <a>
                            <input type="radio" name="radio-30" className="radio" checked={filters.timespanDays === 30} onChange={() => {}} />
                            Posledních 30 dní
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default DropdownRadio;
