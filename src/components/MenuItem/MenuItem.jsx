import Card from '../../components/Card/Card.jsx';
import './MenuItem.css'
import Button from "../Button/Button.jsx";

function MenuItem({itemName, itemDescription, itemPrice, buttonText, handleClick}) {
    return (
        <Card width={325} height={225}>
            <div className="menu-item">
                <span className="menu-item-text">
                    <h4>{itemName}</h4>
                    <p>{itemDescription}</p>
                    <br/>
                    <h5>€{itemPrice}</h5>
                </span>
                <Button buttonType="button" buttonText={buttonText} onClick={handleClick}/>
            </div>
        </Card>
    )
}

export default MenuItem;