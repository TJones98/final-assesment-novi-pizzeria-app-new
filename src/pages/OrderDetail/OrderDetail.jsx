import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../components/Card/Card.jsx';

function OrderDetail() {
    const {id} = useParams();
    const [order, setOrder] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        async function fetchOrder() {
            try {
                const response = await axios.get(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/orders/${id}`, {
                    headers: {
                        'novi-education-project-id': 'fa5d53e3-5361-45a4-b01e-ae2b978120fa',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log("Order details geladen")
                setOrder(response.data);
            } catch (e) {
                console.log("Fout bij ophalen orderdetails", e);
            }
        }
        fetchOrder();
    }, [])

    return (
        <Card>
            {order ? (
                <article>
                    <h4>Order #{order.id}</h4>
                    <strong>Datum & tijdslot:</strong>
                    <p>{order.orderDate}, {order.timeslot}</p>
                    <strong>Klant:</strong>
                    <p>{order.customerId}</p>
                </article>
            ) : (
                <p>loading...</p>
            )}
        </Card>
    )
}


export default OrderDetail;
