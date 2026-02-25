function OrderDetailsList({label, property}) {
    return (
        <li>
            <strong>{label}</strong>
            <p>{property}</p>
        </li>
    )
}

export default OrderDetailsList;