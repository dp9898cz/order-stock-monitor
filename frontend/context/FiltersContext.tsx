"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface FilterContextType {
    filters: Filter;
    setFilters: React.Dispatch<React.SetStateAction<Filter>>;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // setting default filters values
    const [filters, setFilters] = useState<Filter>({
        timespanDays: 30,
        search: "",
    });

    return <FilterContext.Provider value={{ filters, setFilters }}>{children}</FilterContext.Provider>;
};

export const useFilters = (): FilterContextType => {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error("useFilters must be used within a FilterProvider");
    }
    return context;
};
