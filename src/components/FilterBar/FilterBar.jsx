import './FilterBar.css'
import Button from '../../components/Button/Button.jsx'

function FilterBar({
    isVegetarian,
    setIsVegetarian,
    selectedCategories,
    setSelectedCategories,
    priceSort,
    setPriceSort
}) {




    return (
        <section className="filter-bar">
            <span className="filter-bar-header">
                <h3>Filters</h3>
                <Button
                    buttonType="reset"
                    buttonText="Reset"
                    onClick={() => setIsVegetarian(false) + setSelectedCategories([]) + setPriceSort(null) }
                />
            </span>

            <div className="filters-container">

                <div className="category-filter">
                    <strong>Categorie:</strong>
                    <div className="checkboxes">
                        <label>
                            <input
                                type="checkbox"
                                name="category"
                                value="1"
                                checked={selectedCategories.includes(1)}
                                onChange={(e) => setSelectedCategories([
                                    ...selectedCategories,
                                    Number(e.target.value)
                                ])}
                            />
                            Pizza
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="category"
                                value="3"
                                checked={selectedCategories.includes(3)}
                                onChange={(e) => setSelectedCategories([
                                    ...selectedCategories,
                                    Number(e.target.value)
                                ])}
                            />
                            Bijgerecht
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="category"
                                value="2"
                                checked={selectedCategories.includes(2)}
                                onChange={(e) => setSelectedCategories([
                                    ...selectedCategories,
                                    Number(e.target.value)
                                ])}
                            />
                            Pasta
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="category"
                                value="4"
                                checked={selectedCategories.includes(4)}
                                onChange={(e) => setSelectedCategories([
                                    ...selectedCategories,
                                    Number(e.target.value)
                                ])}
                            />
                            Nagerecht
                        </label>
                    </div>
                </div>

                <div className="price-veg-filter">
                    <strong>Prijs:</strong>
                        <label>
                            <input
                                type="radio"
                                name="color"
                                value="ascending"
                                checked={priceSort === "ascending"}
                                onChange={(e) => setPriceSort(e.target.value)}
                            />
                            Laag naar hoog
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="color"
                                value="descending"
                                checked={priceSort === "descending"}
                                onChange={(e) => setPriceSort(e.target.value)}
                            />
                            Hoog naar laag
                        </label>
                </div>

                <div className="price-veg-filter">
                    <strong>Vegetarisch:</strong>
                    <label>
                        <input
                            type="checkbox"
                            name="vegetarian"
                            value="true"
                            checked={isVegetarian === true}
                            onChange={(e) => setIsVegetarian(e.target.value === 'true')}
                        />
                        Ja
                    </label>
                </div>
            </div>
        </section>
    )
}

export default FilterBar;