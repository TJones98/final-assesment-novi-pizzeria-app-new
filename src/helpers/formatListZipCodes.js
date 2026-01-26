import {deliveryArea} from "../constants/restaurant-data.js";

function formatListZipCodes() {
    return deliveryArea.map((zipCode, index) => {
        if (index === deliveryArea.length - 1) {
            return ` ${zipCode}.`;
        } else {
            return ` ${zipCode},`;
        }
    });
}

export default formatListZipCodes;