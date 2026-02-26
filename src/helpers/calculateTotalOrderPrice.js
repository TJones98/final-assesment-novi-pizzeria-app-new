function calculateTotalOrderPrice(orderItems) {
    const totalPrice = orderItems.reduce((total, item) => {
        return total + item.unitPrice;
    }, 0);

    return totalPrice;
}

export default calculateTotalOrderPrice;


