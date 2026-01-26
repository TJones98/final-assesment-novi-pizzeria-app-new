import {deliveryTimes} from '../../constants/restaurant-data.js'
import './formatListDeliveryTimes.css'

function formatDeliveryTimes() {
    return (
        <ul>
            {deliveryTimes.map((day) => {
                return <div className="delivery-times-list" key={day}>
                    <li key={day.id}><strong>{day.name}:</strong> {day.openingHours}</li>
                </div>
            })}
        </ul>
    )
}

export default formatDeliveryTimes;