import Card from '../../components/Card/Card.jsx';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';
import Button from '../../components/Button/Button.jsx';
import './StaffDashboard.css'
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../contexts/AuthContext.jsx";
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function StaffDashboard() {
    const {userData} = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [filterCompletion, toggleFilterCompletion] = useState(false);
    const token = localStorage.getItem('token');
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();

        async function fetchOrders() {
            toggleLoading(true);
            toggleError(false);

            try {
                const response = await axios.get('https://novi-backend-api-wgsgz.ondigitalocean.app/api/orders', {
                    headers: {
                        'novi-education-project-id': 'fa5d53e3-5361-45a4-b01e-ae2b978120fa',
                        'Authorization': `Bearer ${token}`,
                    },
                    signal: controller.signal,
                });
                console.log("Orders geladen");
                setOrders(response.data);
            } catch (e) {
                if (axios.isCancel(e)) {
                    console.log('Request geannuleerd:', e);
                    toggleError(false);
                }
                else {
                    console.log("Ophalen van orders mislukt", e);
                    toggleError(true);
                }
            } finally {
                toggleLoading(false);
            }
        }
        fetchOrders();

        return function cleanup() {
            controller.abort();
        };
    }, [token])


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

    function redirectToOrderDetails(orderId) {
        navigate(`/orders/${orderId}`);
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
                />
            </div>
            <Card width={600} height={1200}>
                {error && <p>Er is iets misgegaan bij het ophalen van de data. Probeer het nog eens.</p>}
                {loading && <p>Loading...</p>}
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
                                <Button
                                    buttonType="button"
                                    buttonText="Details"
                                    onClick={() => redirectToOrderDetails(order.id)}
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