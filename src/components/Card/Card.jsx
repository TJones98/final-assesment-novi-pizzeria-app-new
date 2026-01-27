function Card({children, width, height, fontSize, alignItems}) {
    const cardStyle = {
        width: width || 'auto',
        height: height || 'auto',
        fontSize: fontSize || 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: alignItems || 'flex-start',
        gap: 25,
        backgroundColor: 'white',
        borderRadius: 15,
        borderColor: 'white',
        boxShadow: '0 0 0 4px white, inset 0 0 0 8px white',
        border: '8px solid var(--color-main-bg)',
        padding: 25,
        overflow: 'auto',
    }

    return (
        <article style={cardStyle}>
            {children}
        </article>
    )
}

export default Card;