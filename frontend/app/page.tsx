import AppBar from "./AppBar";
import FilterRow from "./FilterRow";
import { FilterProvider } from "./FiltersContext";
import ProductTable from "./ProductTable";
import { sampleProducts } from "./sampleProducts";

export default function Home() {
    return (
        <FilterProvider>
            <AppBar />
            <main className="bg-base-100 text-base-content">
                <FilterRow />
                <ProductTable products={sampleProducts} />
            </main>
        </FilterProvider>
    );
}
