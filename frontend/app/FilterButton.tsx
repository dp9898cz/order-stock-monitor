import React from "react";

const FilterButton = () => {
    return (
        <button className="btn">
            <svg className="w-6 h-6 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" color="currentColor" viewBox="0 0 20 18">
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m2.133 2.6 5.856 6.9L8 14l4 3 .011-7.5 5.856-6.9a1 1 0 0 0-.804-1.6H2.937a1 1 0 0 0-.804 1.6Z"
                />
            </svg>
            Filtrování
        </button>
    );
};

export default FilterButton;
