import { OrderItem } from "./OrderItem";

export type Order = {
    number: string;
    created: Date;
    sent: Date | undefined;
    received: Date | undefined;
    supplier: string;
    items: OrderItem[];
};
