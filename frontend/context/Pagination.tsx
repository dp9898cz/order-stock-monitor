"use client";
import React, { createContext, useReducer, ReactNode } from "react";

interface PaginationState {
    currentPage: number;
}

interface PaginationContextProps {
    currentPage: number;
    setPage: (pageNumber: number) => void;
}

export const PaginationContext = createContext<PaginationContextProps | undefined>(undefined);

type PaginationAction = { type: "SET_PAGE"; payload: number };

const paginationReducer = (state: PaginationState, action: PaginationAction): PaginationState => {
    switch (action.type) {
        case "SET_PAGE":
            return {
                ...state,
                currentPage: action.payload,
            };
        default:
            return state;
    }
};

interface PaginationProviderProps {
    children: ReactNode;
}

const PaginationProvider: React.FC<PaginationProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(paginationReducer, {
        currentPage: 1,
    });

    const setPage = (pageNumber: number) => {
        dispatch({ type: "SET_PAGE", payload: pageNumber });
    };

    const value: PaginationContextProps = {
        currentPage: state.currentPage,
        setPage,
    };

    return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>;
};

export { PaginationProvider };
