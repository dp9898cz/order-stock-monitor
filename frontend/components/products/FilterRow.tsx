"use client";

import React, { useContext, useEffect } from "react";
import DropdownRadio from "../buttons/DropdownRadio";
import Search from "./Search";
import { PaginationContext } from "../../context/Pagination";
import IconButton from "@/components/buttons/iconButton";
import { useFilters } from "@/context/FiltersContext";
import { filterProducts } from "@/services/filterProducts";
import { Product } from "@/types/Product";
import DropdownPagination from "../buttons/DropdownPagination";

const FilterRow = ({ products, perPage }: { products: Product[]; perPage: number }) => {
    const pagination = useContext(PaginationContext);

    const { filters, isActive, reset, setFilters } = useFilters();
    const filteredProducts = filterProducts(products, filters.search);

    const maxPage = Math.ceil(filteredProducts.length / perPage);

    const inputRef = React.useRef<HTMLInputElement>(null);

    return (
        <div className="w-full p-2 flex justify-between items-center gap-1 flex-wrap">
            <section className="flex items-center gap-2">
                <Search ref={inputRef} />
                <button
                    className="btn"
                    onClick={() => {
                        setFilters((prev) => {
                            if (!inputRef.current) return prev;
                            return { ...prev, search: inputRef.current?.value };
                        });
                    }}
                >
                    Vyhledat
                </button>
                {/*  <IconButton
                    text="Filtrování"
                    onClick={() => {}}
                    icon={
                        <svg
                            className="w-6 h-6 mr-1"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            color="currentColor"
                            viewBox="0 0 20 18"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m2.133 2.6 5.856 6.9L8 14l4 3 .011-7.5 5.856-6.9a1 1 0 0 0-.804-1.6H2.937a1 1 0 0 0-.804 1.6Z"
                            />
                        </svg>
                    }
                /> */}
                {isActive ? (
                    <button
                        className="btn btn-error"
                        title="Vymazat filtry"
                        onClick={() => {
                            reset();
                            if (inputRef.current) {
                                inputRef.current.value = "";
                            }
                            if (pagination) pagination.setPage(1);
                        }}
                    >
                        Vymazat
                    </button>
                ) : null}
            </section>
            {products ? (
                <section className="flex justify-center">
                    <div className="join">
                        <button
                            className="join-item btn"
                            onClick={() => (pagination ? pagination.setPage(Math.max(pagination.currentPage - 1, 1)) : null)}
                        >
                            «
                        </button>
                        <button className="join-item btn">
                            {products.length === 0 ? (
                                "Strana"
                            ) : (
                                <>
                                    Strana {pagination?.currentPage} / {maxPage}
                                </>
                            )}
                        </button>
                        <button
                            className="join-item btn"
                            onClick={() => (pagination ? pagination.setPage(Math.min(pagination.currentPage + 1, maxPage)) : null)}
                        >
                            »
                        </button>
                    </div>
                    <DropdownPagination />
                </section>
            ) : null}
            <section className="flex felx-1 items-center gap-2 justify-between">
                <DropdownRadio />
                {/* <ExportButton /> */}
            </section>
        </div>
    );
};

export default FilterRow;
