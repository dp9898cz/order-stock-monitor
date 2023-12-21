export type Product = {
    ean: string;
    id: string;
    name: string;
    company: string;
    stock_count: number;
    buy_price: number;
    sell_price: number;
    marketability: number;
    moves: string;
    order_quantity: number;
};

export function generateRandomProduct(): Product {
    const randomEan = Math.random().toString(36).substring(2, 10);
    const randomId = Math.random().toString(36).substring(2, 10);
    const randomName = "Product " + Math.floor(Math.random() * 100);
    const randomCompany = "Company " + Math.floor(Math.random() * 100);
    const randomStockCount = Math.floor(Math.random() * 100);
    const randomBuyPrice = Math.random() * 100;
    const randomSellPrice = Math.random() * 100;
    const randomMarketability = Math.random();
    const randomMoves = "Moves " + Math.floor(Math.random() * 100);
    const randomOrderQuantity = Math.floor(Math.random() * 10);

    return {
        ean: randomEan,
        id: randomId,
        name: randomName,
        company: randomCompany,
        stock_count: randomStockCount,
        buy_price: randomBuyPrice,
        sell_price: randomSellPrice,
        marketability: randomMarketability,
        moves: randomMoves,
        order_quantity: randomOrderQuantity,
    };
}
