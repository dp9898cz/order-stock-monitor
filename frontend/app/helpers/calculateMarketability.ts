export const calculateMarketability = (product: Product, days: number): number => {
    if (!product || !product.moves || product.moves.length === 0 || product.order_quantity == 0) return 0;
    const moves = product.moves
        .split("|")
        .map((line) => {
            const [dateRaw, countRaw, stockRaw] = line.split("_");
            return {
                date: new Date(dateRaw),
                count: parseInt(countRaw),
                stock: parseInt(stockRaw),
            };
        })
        .sort((a, b) => {
            return a.date.getTime() - b.date.getTime();
        });
    const movesNotStock = moves.filter((m) => m.stock < 10);
    const uniqueOutOfStockDates = new Set();
    movesNotStock.forEach((d) => uniqueOutOfStockDates.add(d.date.toDateString()));

    const uniqueDatesArray = Array.from(uniqueOutOfStockDates);

    const m = product.order_quantity / (days - uniqueDatesArray.length);

    return m;
};
