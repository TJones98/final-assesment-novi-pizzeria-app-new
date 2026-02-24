function getNextFiveDays() {
    let nextFiveDays = []
    const currentDate = new Date();

    // checkt of huidige datum niet een maandag (1) of dinsdag (2) is.
    // het restaurant is namelijk op die dagen gesloten
    if (currentDate.getDay() !== 1 && currentDate.getDay() !== 2) {
        nextFiveDays.push(new Date(currentDate));
    }

    while (nextFiveDays.length < 5) {
        currentDate.setDate(currentDate.getDate() + 1)
        const daysOfWeek = currentDate.getDay();
        // voegt de datum niet aan de array toe als het een maandag of dinsdag is
        if (daysOfWeek === 1 || daysOfWeek === 2) {
            continue;
        }
        else {
            nextFiveDays.push(new Date(currentDate))
        }
    }
}

export default getNextFiveDays

