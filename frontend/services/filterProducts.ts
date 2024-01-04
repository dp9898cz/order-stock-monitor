import { Product } from "@/types/Product";

export const filterProducts = (products: Product[], searchTerm: string): Product[] => {
    if (!products) {
        return [];
    }
    if (!searchTerm) {
        return products;
    }
    return products.filter((product) => {
        const productName = product.name.toLowerCase();
        const searchTermLowerCase = searchTerm.toLowerCase();
        return productName.includes(searchTermLowerCase) || product.id.toLowerCase().includes(searchTermLowerCase);
    });
};
