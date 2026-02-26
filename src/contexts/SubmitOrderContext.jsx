import {createContext, useState} from 'react';

export const SubmitOrderContext = createContext({});

function SubmitOrderContextProvider ({ children }) {
    const [newOrder, setNewOrder] = useState({
        orderItems: [],
        customerDetails: {},
        orders: {}
    });

    function setOrderItems(item) {
        setNewOrder((prevOrder) => ({
            orderItems: [
                ...prevOrder.orderItems,
                {
                    orderItemsId: prevOrder.orderItems.length + 1,
                    menuId: item.id,
                    menuItemName: item.name,
                    unitPrice: item.price,
                }
            ]
        }));
    }

    function setCustomer(customer) {
        setNewOrder((prevOrder) => ({
            ...prevOrder,
            customerDetails:
                {
                    customerName: customer.customerName,
                    email: customer.email,
                    zipCode: customer.zipCode,
                    houseNumber: customer.houseNumber,
                    houseNumberAddition: customer.houseNumberAddition,
                    street: customer.street,
                    city: customer.city,
                }
        }));
    }

    function setOrderDateTimeslot(data) {
        setNewOrder((prevOrder) => ({
            ...prevOrder,
            orders:
                {
                    orderDate: data.orderDate,
                    timeslot: data.timeslot,
                }
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
        <SubmitOrderContext.Provider value={{
            newOrder,
            setNewOrder,
            setCustomer,
            setOrderDateTimeslot,
            setOrderItems,
            deleteOrderItem
        }}>
            {children}
        </SubmitOrderContext.Provider>
    )
}

export default SubmitOrderContextProvider;