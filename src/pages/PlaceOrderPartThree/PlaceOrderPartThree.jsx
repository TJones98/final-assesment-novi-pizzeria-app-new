import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import Card from '../../components/Card/Card.jsx';
import formatPrice from '../../helpers/formatPrice.js'
import Button from '../../components/Button/Button.jsx';
import {useNavigate} from "react-router-dom";
import OrderDetailsList from '../../components/OrderDetailsList/OrderDetailsList.jsx';
import formatJsonDate from "../../helpers/formatJsonDate.js";
import './PlaceOrderPartThree.css';
import React, {useState} from "react";
import axios from "axios";


function PlaceOrderPartThree() {
    const orderItems = JSON.parse(sessionStorage.getItem('orderItems'))
    const customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
    const orderDetails = JSON.parse(sessionStorage.getItem('orders'))
    console.log('Session storage data loaded')

    const navigate = useNavigate();
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [success, toggleSuccess] = useState(false);

    function submitCompleteOrder() {
        toggleLoading(true);
        toggleError(false);
        toggleSuccess(false);

        const controller = new AbortController();

        axios.post('https://novi-backend-api-wgsgz.ondigitalocean.app/api/customers', {
            name: customerDetails.customerName,
            email: customerDetails.email,
            zipCode: customerDetails.zipCode,
            houseNumber: customerDetails.houseNumber,
            houseNumberAddition: customerDetails.houseNumberAddition,
            street: customerDetails.street,
            city: customerDetails.city
        }, {
            headers: {
                'novi-education-project-id': `${import.meta.env.VITE_PROJECT_ID}`,
                'Content-Type': 'application/json'
            },
            signal: controller.signal,
        })
            .then((customerResponse) => {
                const customerId = customerResponse.data.id;
                console.log("Nieuwe klant aangemaakt:", customerId);

                return axios.post('https://novi-backend-api-wgsgz.ondigitalocean.app/api/orders', {
                    customerId: customerId,
                    orderDate: orderDetails.orderDate,
                    timeslot: orderDetails.timeslot,
                    completed: false
                }, {
                    headers: {
                        'novi-education-project-id': `${import.meta.env.VITE_PROJECT_ID}`,
                        'Content-Type': 'application/json'
                    },
                    signal: controller.signal,
                });
            })
            .then((orderResponse) => {
                const orderId = orderResponse.data.id;
                console.log("Nieuwe order aangemaakt:", orderId);

                const orderItemPromises = orderItems.map((item) => {
                    return axios.post('https://novi-backend-api-wgsgz.ondigitalocean.app/api/orderItems', {
                        id: item.orderItemsId,
                        orderId: orderId,
                        menuId: item.menuId,
                        menuItemName: item.menuItemName,
                        unitPrice: item.unitPrice
                    }, {
                        headers: {
                            'novi-education-project-id': `${import.meta.env.VITE_PROJECT_ID}`,
                            'Content-Type': 'application/json'
                        },
                        signal: controller.signal,
                    });
                });
                console.log("Registreren order items gelukt", orderItemPromises);
                toggleSuccess(true)
                return Promise.all(orderItemPromises);
            }).catch((e) => {
                if (axios.isCancel(e)) {
                    console.log("Request geannuleerd:", e);
                } else {
                    console.log("Versturen van data mislukt:", e);
                    toggleError(true);
                }
            })
            .finally(() => {
                toggleLoading(false);
            });

        return function cleanup() {
            controller.abort();
        };
    }

    function sendToPlaceOrderOne() {
        navigate("/place-order-1")
    }

    function sendToPlaceOrderTwo() {
        navigate("/place-order-2")
    }

    return (
        <>
            <PageTitle title='Bestellen' subtitle='Ik ga'/>
            {loading && <strong className="contrast-text">loading...</strong>}
            {error && <strong className="contrast-text">Fout bij het versturen van data. Probeer het nog eens.</strong>}
            {success && <strong className="contrast-text">Bestelling succesvol verzonden! U kunt dit scherm nu sluiten.</strong>}
            <div className="order-details-cards">
                <Card width={375} height={450}>
                    <div className="order-details-container">
                        <div className="order-items-text">
                            <h4>Mijn bestelling</h4>
                            {orderItems && orderItems.length > 0 ? (
                            <ul>
                                {orderItems.map((item) => (
                                    <li key={item.orderItemsId}>
                                        <p>{item.menuItemName} - €{formatPrice(item.unitPrice)}</p>
                                    </li>
                                ))}
                            </ul>
                            ) : (
                                <p>Geen items gevonden</p>
                            )}
                        </div>
                        <Button
                            buttonText="Wijzig bestelling"
                            onClick={sendToPlaceOrderOne}
                            disabled={loading === true}
                        />
                    </div>
                </Card>
                <Card width={375} height={450}>
                    <div className="order-details-container">
                        <h4>Mijn gegevens</h4>
                        {orderDetails ? (
                            <ul className="order-details-list">
                                <OrderDetailsList
                                    label="Leverdatum:"
                                    property={formatJsonDate(orderDetails.orderDate)}
                                />
                                <OrderDetailsList
                                    label="Tijdslot:"
                                    property={orderDetails.timeslot}
                                />
                            </ul>
                        ) : (
                            <p>Geen besteldata gevonden</p>
                        )}

                        {customerDetails ? (
                            <ul className="order-details-list">
                                <OrderDetailsList
                                    label="Naam:"
                                    property={customerDetails.customerName}
                                />
                                <OrderDetailsList
                                    label="E-mailadres:"
                                    property={customerDetails.email}
                                />
                                <OrderDetailsList
                                    label="Postcode:"
                                    property={customerDetails.zipCode}
                                />
                                <OrderDetailsList
                                    label="Huisnummer:"
                                    property={customerDetails.houseNumber}
                                />
                                <OrderDetailsList
                                    label="Toevoeging:"
                                    property={customerDetails.houseNumberAddition}
                                />
                                <OrderDetailsList
                                    label="Straat:"
                                    property={customerDetails.street}
                                />
                                <OrderDetailsList
                                    label="Plaats:"
                                    property={customerDetails.city}
                                />
                            </ul>
                            ) : (
                                <p>Geen klantgegevens gevonden</p>
                            )}
                            <Button
                                buttonText="Wijzig gegevens"
                                onClick={sendToPlaceOrderTwo}
                                disabled={loading === true}
                            />
                    </div>
                </Card>
            </div>
            <Button
                buttonText="Verzenden"
                onClick={submitCompleteOrder}
                disabled={loading === true}
            />
        </>
    )
}

export default PlaceOrderPartThree;