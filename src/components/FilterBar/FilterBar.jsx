import './FilterBar.css'

function FilterBar() {
    return (
        <section className="filter-bar">
            <h3>Filters</h3>

            <div className="filters-container">

                <div className="category-filter">
                    <strong>Categorie:</strong>
                    <div className="checkboxes">
                        <label>
                            <input
                                type="checkbox"
                                name="category"
                                value="1"
                            />
                            Pizza
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="category"
                                value="3"
                            />
                            Bijgerecht
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="category"
                                value="2"
                            />
                            Pasta
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="category"
                                value="4"
                            />
                            Nagerecht
                        </label>
                    </div>
                </div>

                <div className="radio-buttons">
                    <strong>Prijs:</strong>
                        <label>
                            <input
                                type="radio"
                                name="color"
                                value="ascending"
                                // checked={selectedColor === 'red'}
                                // onChange={(e) => setSelectedColor(e.target.value)}
                            />
                            Laag naar hoog
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="color"
                                value="descending"
                            />
                            Hoog naar laag
                        </label>
                </div>

                <div className="radio-buttons">
                    <strong>Vegetarisch:</strong>
                    <label>
                        <input
                            type="radio"
                            name="color"
                            value="ascending"
                            // checked={selectedColor === 'red'}
                            // onChange={(e) => setSelectedColor(e.target.value)}
                        />
                        Ja
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="color"
                            value="descending"
                            // checked={selectedColor === 'red'}
                            // onChange={(e) => setSelectedColor(e.target.value)}
                        />
                        Nee
                    </label>
                </div>
            </div>
        </section>
    )
}

export default FilterBar;