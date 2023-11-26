"use client";

import React, { useContext } from "react";
import DropdownRadio from "./DropdownRadio";
import Search from "./Search";
import FilterButton from "./FilterButton";
import ExportButton from "./ExportButton";
import { PaginationContext } from "./providers/Pagination";

const PRODUCTS_PER_PAGE = 50;

const FilterRow = ({ dataLength }: { dataLength: number }) => {
    const pagination = useContext(PaginationContext);
    const maxPage = Math.ceil(dataLength / PRODUCTS_PER_PAGE);

    return (
        <div className="w-full p-2 flex justify-between items-center gap-1 flex-wrap">
            <section className="flex items-center gap-2">
                <Search />
                <FilterButton />
            </section>
            {dataLength > 0 ? (
                <section>
                    <div className="join">
                        <button
                            className="join-item btn"
                            onClick={() => (pagination ? pagination.setPage(Math.max(pagination.currentPage - 1, 1)) : null)}
                        >
                            «
                        </button>
                        <button className="join-item btn">
                            Strana {pagination?.currentPage} / {maxPage}
                        </button>
                        <button
                            className="join-item btn"
                            onClick={() => (pagination ? pagination.setPage(Math.min(pagination.currentPage + 1, maxPage)) : null)}
                        >
                            »
                        </button>
                    </div>
                </section>
            ) : null}
            <section className="flex felx-1 items-center gap-2 justify-between">
                <DropdownRadio />
                <ExportButton />
            </section>
        </div>
    );
};

export default FilterRow;
