import Card from '../../components/Card/Card.jsx';

function MenuItem({itemName, itemDescription, itemPrice}) {
    return (
        <Card>
            <h4>{itemName}</h4>
            <p>{itemDescription}</p>
            <h5>€{itemPrice}</h5>
        </Card>
    )
}

export default MenuItem;