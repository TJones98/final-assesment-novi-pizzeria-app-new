import {createContext, useState} from 'react';

export const SubmitOrderContext = createContext({});

function SubmitOrderContextProvider ({ children }) {
    const [newOrder, setNewOrder] = useState({
        orderItems: [],
    });

    function setOrderItems(item) {
        setNewOrder((prevOrder) => ({
            orderItems: [
                ...prevOrder.orderItems,
                {
                    orderItemsId: prevOrder.orderItems.length + 1,
                    orderId: null,
                    menuId: item.id,
                    menuItemName: item.name,
                    unitPrice: item.price
                },
            ]
        }));
    }

    function deleteOrderItem(orderItemsId) {
        setNewOrder((prevOrder) => ({
            orderItems: prevOrder.orderItems.filter(
                (item) => item.orderItemsId !== orderItemsId
            ),
        }));
    }

    return (
        <SubmitOrderContext.Provider value={{ newOrder, setNewOrder, setOrderItems, deleteOrderItem }}>
            {children}
        </SubmitOrderContext.Provider>
    )
}

export default SubmitOrderContextProvider;