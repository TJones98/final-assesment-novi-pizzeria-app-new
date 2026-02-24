function getNextFiveDays() {
    let nextFiveDays = []
    const currentDate = new Date();

    for (let i = 0; i < 5; i++) {
        currentDate.setDate(currentDate.getDate() + 1)
        nextFiveDays.push(new Date(currentDate))
    }

    console.log(nextFiveDays);
}

export default getNextFiveDays