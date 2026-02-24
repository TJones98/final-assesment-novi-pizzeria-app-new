function TimeslotSelecter({ date }) {
    const selectedDate = date.getDay();

    return (
        <>
            <label htmlFor="timeslot">Kies een tijdslot:</label>

            <select name="timeslot" id="timeslot">
                {/*Laat deze opties alleen zien als het NIET een woensdag of een donderdag is */}
                {selectedDate !== 3 && selectedDate !== 4 && (
                    <>
                        <option value="17:00-17:30">17:00-17:30</option>
                        <option value="17:30-18:00">17:30-18:00</option>
                    </>
                )}
                <option value="18:00-18:30">18:00-18:30</option>
                <option value="18:30-19:00">18:30-19:00</option>
                <option value="19:00-19:30">19:00-19:30</option>
                <option value="19:30-20:00">19:30-20:00</option>
                {selectedDate !== 3 && selectedDate !== 4 && (
                    <>
                        <option value="20:00-20:30">20:00-20:30</option>
                        <option value="20:30-21:00">20:30-21:00</option>
                    </>
                )}
            </select>
        </>
    )
}

export default TimeslotSelecter;



