export const calculateTotalPrice = (order: Order) => {
    return order.items.reduce((acc, item) => {
        return acc + item.product.buy_price * item.quantity;
    }, 0);
};
