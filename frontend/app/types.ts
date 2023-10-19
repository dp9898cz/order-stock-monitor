type Filters = {
    timespanDays: number,
    search: string,
}

type Product = {
    EAN_code: string,
    name: string,
    supplier_code: string,
    supply: number,
    shop_price_CZK: number,
    sell_price_CZK: number,
    avg_sell_per_day: number,
    days_to_run_out: number,
    order_to_restock_delay: number
}