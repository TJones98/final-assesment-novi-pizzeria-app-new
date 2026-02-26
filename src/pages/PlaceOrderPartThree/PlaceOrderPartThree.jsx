import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import Card from '../../components/Card/Card.jsx';
import formatPrice from '../../helpers/formatPrice.js'
import Button from '../../components/Button/Button.jsx';
import {useNavigate} from "react-router-dom";
import OrderDetailsList from '../../components/OrderDetailsList/OrderDetailsList.jsx';
import formatJsonDate from "../../helpers/formatJsonDate.js";
import './PlaceOrderPartThree.css';


function PlaceOrderPartThree() {
    const navigate = useNavigate();
    const orderItems = JSON.parse(sessionStorage.getItem('orderItems'))
    const customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
    const orderDetails = JSON.parse(sessionStorage.getItem('orders'))
    console.log('Session storage data loaded')

    function sendToPlaceOrderOne() {
        navigate("/place-order-1")
    }

    function sendToPlaceOrderTwo() {
        navigate("/place-order-2")
    }

    return (
        <>
            <PageTitle title='Bestellen' subtitle='Ik ga'/>
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
                        />
                    </div>
                </Card>
                <Card width={375} height={450}>
                    <div className="order-details-container">
                        <h4>Mijn gegevens</h4>
                        {orderDetails ? (
                            <ul className="order-details-list">
                                <OrderDetailsList
                                    label="Datum:"
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
                            />
                    </div>
                </Card>
            </div>
        </>
    )
}

export default PlaceOrderPartThree;