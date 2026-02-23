import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import Card from '../../components/Card/Card.jsx';
import './PlaceOrder3.css';
import {SubmitOrderContext} from "../../contexts/SubmitOrderContext.jsx";
import {useContext} from "react";

function PlaceOrder3() {
    const {newOrder} = useContext(SubmitOrderContext)

    console.log(newOrder);

    return (
        <>
            <PageTitle title='Bestellen' subtitle='Ik ga'/>
            <div className="order-details-cards">
                <Card>
                    <h5>Mijn bestelling</h5>
                </Card>
                <Card>
                    <p>klant details</p>
                </Card>
            </div>
        </>
    )
}

export default PlaceOrder3;