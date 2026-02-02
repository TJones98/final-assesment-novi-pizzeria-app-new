import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../components/Card/Card.jsx';

function OrderDetail() {
    const {id} = useParams();
    const [order, setOrder] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [orderItems, setOrderItems] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const controller = new AbortController();

        function getOrderDetails() {
            toggleLoading(true);
            toggleError(false);

            Promise.all([
                axios.get(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/orders/${id}`, {
                    headers: {
                        'novi-education-project-id': 'fa5d53e3-5361-45a4-b01e-ae2b978120fa',
                        'Authorization': `Bearer ${token}`,
                    },
                    signal: controller.signal,
                }),
                axios.get(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/orders/${id}/orderItems`, {
                    headers: {
                        'novi-education-project-id': 'fa5d53e3-5361-45a4-b01e-ae2b978120fa',
                        'Authorization': `Bearer ${token}`,
                    },
                })
            ])
                .then(( [ {data: order}, {data: orderItems} ] ) => {
                    setOrder(order);
                    setOrderItems(orderItems);
                    return axios.get(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/customers/${order.customerId}`, {
                        headers: {
                            'novi-education-project-id': 'fa5d53e3-5361-45a4-b01e-ae2b978120fa',
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                })
                .then(( {data: customer} ) => {
                    setCustomer(customer);
                })
                .catch((e) => {
                    if (axios.isCancel(e)) {
                        console.log("Request geannuleerd:", e);
                        toggleError(false);
                    }
                    else {
                        console.log("Ophalen van orders mislukt", e);
                        toggleError(true);
                    }
                })
                .finally(() => {
                    toggleLoading(false);
                })
        }

        getOrderDetails();

        return function cleanup() {
            controller.abort();
        };

    }, [id, token])


    return (
        <Card>
            {error && <p>Er is iets misgegaan bij het ophalen van de data. Probeer het nog eens.</p>}
            {loading && <p>Loading...</p>}
            {order ? (
                <article>
                    <h4>Order #{order.id}</h4>
                    <strong>Datum & tijdslot:</strong>
                    <p>{order.orderDate}, {order.timeslot}</p>
                    <strong>Klant:</strong>
                    {customer && <p>{customer.name}, {customer.email}</p>}
                    <strong>Bestelling:</strong>
                    <ul>
                        {orderItems.map((orderItem)  => {
                            return <li key={orderItem.id}>
                                <p>{orderItem.menuItemName}</p>
                            </li>
                        })}
                    </ul>
                </article>
            ) : (
                <p>Geen orders gevonden</p>
            )}
        </Card>
    )
}


export default OrderDetail;
