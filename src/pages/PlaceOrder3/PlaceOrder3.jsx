import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import Card from '../../components/Card/Card.jsx';
import formatPrice from '../../helpers/formatPrice.js'
import Button from '../../components/Button/Button.jsx';
import {useNavigate} from "react-router-dom";
import './PlaceOrder3.css';


function PlaceOrder3() {
    const navigate = useNavigate();
    const orderItems = JSON.parse(sessionStorage.getItem('orderItems'))
    console.log('Order items loaded')

    function sendToPlaceOrderOne() {
        navigate("/place-order-1")
    }

    return (
        <>
            <PageTitle title='Bestellen' subtitle='Ik ga'/>
            <div className="order-details-cards">
                <Card width={300} height={400}>
                    <h4>Mijn bestelling</h4>
                    {orderItems && orderItems.orderItems.length > 0 ? (
                    <ul>
                        {orderItems.orderItems.map((item) => (
                            <li key={item.orderItemsId}>
                                <p>{item.menuItemName} - €{formatPrice(item.unitPrice)}</p>
                            </li>
                        ))}
                    </ul>
                    ) : (
                        <p>Geen items gevonden</p>
                    )}
                    <Button
                        buttonText="Wijzig bestelling"
                        onClick={sendToPlaceOrderOne}
                    />
                </Card>
                <Card>
                    <p>klant details</p>
                </Card>
            </div>
        </>
    )
}

export default PlaceOrder3;