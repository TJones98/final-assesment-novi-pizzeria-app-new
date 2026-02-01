import Card from '../../components/Card/Card.jsx';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';
import Button from '../../components/Button/Button.jsx';
import './StaffDashboard.css'
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../contexts/AuthContext.jsx";
import axios from 'axios';

function StaffDashboard() {
    const {userData} = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [filterCompletion, toggleFilterCompletion] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await axios.get('https://novi-backend-api-wgsgz.ondigitalocean.app/api/orders', {
                    headers: {
                        'novi-education-project-id': 'fa5d53e3-5361-45a4-b01e-ae2b978120fa',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log("Orders geladen");
                setOrders(response.data);
            } catch (e) {
                console.log("Ophalen van orders mislukt", e);
            }
        }
        fetchOrders();
        }, [])


    function setFilterToComplete() {
        toggleFilterCompletion(true);
    }

    function setFilterToPending() {
        toggleFilterCompletion(false);
    }

    const filteredOrders = orders.filter(order => order.completed === filterCompletion);

    async function toggleOrderStatus(orderId, currentStatus) {
        try {
            await axios.patch(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/orders/${orderId}`, {
                "completed": !currentStatus,
            }, {
                headers: {
                    'novi-education-project-id': 'fa5d53e3-5361-45a4-b01e-ae2b978120fa',
                    'Authorization': `Bearer ${token}`,
                }
            });
            setOrders(
                orders.map((order) =>
                    order.id === orderId ? { ...order, completed: !currentStatus } : order
                )
            );
        } catch(e) {
            console.log("Updaten van order mislukt", e)
        }
    }

    return (
        <>
            <PageTitle title="Personeelsdashboard" subtitle="Werk ze vandaag!"/>
            <div className="dashboard-buttons">
                <Button
                    buttonType="button"
                    buttonText="Openstaande bestellingen"
                    onClick={setFilterToPending}
                />
                <Button
                    buttonType="button"
                    buttonText="Afgeronde bestellingen"
                    onClick={setFilterToComplete}
                />
                <Button
                    buttonType="button"
                    buttonText="Bewerk menu"
                    disabled={!userData.roles.includes("admin")}
                    onClick="onClick"/>
            </div>
            <Card width={500} height={700}>
                {filteredOrders.length > 0 ?
                    <ul>
                        {filteredOrders.map((order) => {
                            return <li key={order.id}>
                                <p><strong>Order #{order.id}</strong></p>
                                <p>Datum: {order.orderDate}</p>
                                <p>Tijdslot: {order.timeslot}</p>
                                <p>Totaal: €{order.total} </p>
                                <Button
                                    buttonType="button"
                                    buttonText={filterCompletion ? "Open zetten" : "Afronden"}
                                    onClick={() => toggleOrderStatus(order.id, order.completed)}
                                />
                            </li>
                        })}
                    </ul>
                    :
                    <p>Er zijn geen {filterCompletion ? "afgeronde" : "openstaande"} bestellingen.</p>
                }
            </Card>
        </>
)}

export default StaffDashboard;