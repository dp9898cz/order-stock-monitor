export type Filter = {
    timespanDays: number;
    search: string;
    perPage: number;
    sort: SortValues | null;
    direction: "asc" | "desc";
};

export enum SortValues {
    Identificator = "id",
    Name = "name",
    EAN = "ean",
    SupplierCode = "supplierCode",
    Stock = "stock",
    BuyPrice = "buyPrice",
    RetailPrice = "retailPrice",
    Marketability = "marketability",
    OrderDate = "orderDate",
}
