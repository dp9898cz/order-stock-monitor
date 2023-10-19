"use client";
import React from "react";
import { useFilters } from "./FiltersContext";

const DropdownRadio = () => {
    const { filters, setFilters } = useFilters();

    const changeState = (newTimeSpan: number) => {
        setFilters((prev) => {
            return { ...prev, timespanDays: newTimeSpan };
        });
        // close current backdrop (potential err - try/catch block)
        try {
            (document.activeElement as HTMLElement).blur();
        } catch (error) {}
    };

    return (
        <>
            <div className="dropdown dropdown-bottom">
                <label tabIndex={0} className="btn m-1 w-64">
                    <svg className="w-6 h-6 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path
                            stroke="currentColor"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 6v4l3.276 3.276M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                    Posledních {filters.timespanDays} dní
                    <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full">
                    {[7, 14, 30, 60, 90].map((timespan) => (
                        <li key={timespan} onClick={() => changeState(timespan)}>
                            <a>
                                <input
                                    type="radio"
                                    name={`radio-${timespan}`}
                                    className="radio"
                                    checked={filters.timespanDays === timespan}
                                    onChange={() => {}}
                                />
                                Posledních {timespan} dní
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default DropdownRadio;
