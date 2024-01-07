import React from "react";
import FilterRow from "../../components/products/FilterRow";

const Loading = () => {
    return (
        <main className="bg-base-100 text-base-content">
            <FilterRow products={[]} perPage={100} />
            <div className="flex w-full justify-center items-center">
                <span className="loading loading-spinner loading-lg mt-5"></span>
            </div>
        </main>
    );
};

export default Loading;
