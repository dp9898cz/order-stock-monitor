"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface FilterContextType {
    filters: Filter;
    setFilters: React.Dispatch<React.SetStateAction<Filter>>;
    isActive: boolean;
    reset: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // setting default filters values
    const [filters, setFilters] = useState<Filter>({
        timespanDays: 30,
        search: "",
    });

    const isActive = filters.search !== "";
    const reset = () => setFilters({ timespanDays: 30, search: "" });

    return <FilterContext.Provider value={{ filters, setFilters, isActive, reset }}>{children}</FilterContext.Provider>;
};

export const useFilters = (): FilterContextType => {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error("useFilters must be used within a FilterProvider");
    }
    return context;
};
