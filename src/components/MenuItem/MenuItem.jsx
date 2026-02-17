import Card from '../../components/Card/Card.jsx';
import './MenuItem.css'

function MenuItem({itemName, itemDescription, itemPrice}) {
    return (
        <Card width={325} height={225}>
            <div className="menu-item">
                <h4>{itemName}</h4>
                <p>{itemDescription}</p>
                <br/>
                <h5>€{itemPrice}</h5>
            </div>
        </Card>
    )
}

export default MenuItem;