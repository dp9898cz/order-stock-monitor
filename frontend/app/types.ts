type Filters = {
    timespanDays: number,
    search: string,
}

type Product = {
    ean: string,
    id: string,
    name: string,
    company: string,
    stock_count: number,
    buy_price: number,
    sell_price: number,
    marketability: number,
    moves: string
    order_quantity: number
}