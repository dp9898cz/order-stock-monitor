import AppBar from "./AppBar";
import ProductTable from "./ProductTable";

export default function Home() {
    return (
        <>
            <AppBar />
            <main className="bg-base-100 text-base-content">
                <ProductTable />
            </main>
        </>
    );
}
