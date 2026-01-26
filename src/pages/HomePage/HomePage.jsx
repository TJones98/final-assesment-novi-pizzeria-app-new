import Card from '../../components/card/Card.jsx';
import PageTitle from '../../components/pageTitle/PageTitle.jsx';
import Button from '../../components/button/Button.jsx';
import formatListZipCodes from '../../helpers/formatListZipCodes.js';
import formatDeliveryTimes from '../../helpers/formatListDeliveryTimes/formatListDeliveryTimes.jsx';
import './HomePage.css';

function HomePage() {

    return (
        <>
            <PageTitle title="Pizzeria Palermo" subtitle="Welkom bij"/>
            <div className="card-container">
                <Card width={550} height={450}>
                    <h3>Bezorging</h3>
                    <p>
                        Geen zin meer om de deur uit te gaan? Laat je bestelling door ons
                        bezorgen! Wij brengen met alle liefde onze authentieke Italiaanse
                        pizza’s en pastas bij jou thuis. Selecteer simpelweg gerechten van
                        het menu, het gewenste datum en tijdslot en laat je gegevens
                        achter. Eet smakelijk!
                    </p>
                    <p>
                        Wij bezorgen binnen de volgende postcodes:
                        {formatListZipCodes()}
                    </p>
                    <Button buttonType="button" buttonText="Nieuwe bestelling"/>
                </Card>
                <Card width={550} height={450} fontSize={20} alignItems="center">
                    <h3>Bezorgtijden</h3>
                    {formatDeliveryTimes()}
                </Card>
            </div>
        </>
    )
}

export default HomePage;