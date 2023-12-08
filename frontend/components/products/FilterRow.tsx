"use client";

import React, { useContext } from "react";
import DropdownRadio from "../buttons/DropdownRadio";
import Search from "./Search";
import ExportButton from "../buttons/ExportButton";
import { PaginationContext } from "../../context/Pagination";
import IconButton from "@/components/buttons/iconButton";

const PRODUCTS_PER_PAGE = 50;

const FilterRow = ({ dataLength }: { dataLength: number }) => {
    const pagination = useContext(PaginationContext);
    const maxPage = Math.ceil(dataLength / PRODUCTS_PER_PAGE);

    return (
        <div className="w-full p-2 flex justify-between items-center gap-1 flex-wrap">
            <section className="flex items-center gap-2">
                <Search />
                <IconButton
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
                />
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
