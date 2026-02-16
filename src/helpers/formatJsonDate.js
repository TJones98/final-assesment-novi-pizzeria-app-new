function formatJsonDate(dateString) {
    const date = new Date(dateString);
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    return (date.toLocaleDateString("nl-NL", options))
}

export default formatJsonDate;