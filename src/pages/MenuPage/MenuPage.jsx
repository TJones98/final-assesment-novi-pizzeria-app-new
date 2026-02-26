import {useEffect, useMemo, useState} from "react";
import axios from "axios";
import MenuItem from "../../components/MenuItem/MenuItem.jsx";
import formatPrice from "../../helpers/formatPrice.js";
import PageTitle from "../../components/PageTitle/PageTitle";
import FilterBar from "../../components/FilterBar/FilterBar";
import {useNavigate} from "react-router-dom";
import './MenuPage.css'

function MenuPage() {
    const [menu, setMenu] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceSort, setPriceSort] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();

        async function fetchMenu() {
            toggleLoading(true);
            toggleError(false);

            try {
                const response = await axios.get('https://novi-backend-api-wgsgz.ondigitalocean.app/api/menuItems', {
                    headers: {
                        'novi-education-project-id': 'fa5d53e3-5361-45a4-b01e-ae2b978120fa',
                    },
                    signal: controller.signal,
                });
                console.log("Menu items geladen")
                setMenu(response.data);
            } catch (e) {
                if (axios.isCancel(e)) {
                    console.log('Request geannuleerd:', e);
                    toggleError(false);
                }
                else {
                    console.log("Ophalen van menu items mislukt", e);
                    toggleError(true);
                }
            } finally {
                toggleLoading(false);
            }
        }
        fetchMenu();

        return function cleanup() {
            controller.abort();
        };
    },  [])

    const filteredMenu = useMemo(() => {
        let result = [...menu];

        if (selectedCategories.length > 0) {
            result = result.filter((item) => {
                return selectedCategories.includes(item.categoryId);
            })
        }

        if (isVegetarian) {
            result = result.filter((item) => {
                return item.vegetarian;
            })
        }

        if (priceSort === "ascending") {
            result = result.sort((a, b) => a.price - b.price);
        }

        if (priceSort === "descending") {
            result = result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [menu, selectedCategories, isVegetarian, priceSort]);

    function redirectToEditor(itemId) {
        navigate(`/menu/${itemId}`);
    }

    return (
        <>
            {error && <p>Er is iets misgegaan bij het ophalen van de data. Probeer het later nog eens.</p>}
            {loading && <p>Loading...</p>}
            <PageTitle title="Menu" subtitle="Bewerk het" />
            <div className="menu-page">

                <FilterBar
                    isVegetarian={isVegetarian}
                    setIsVegetarian={setIsVegetarian}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                    priceSort={priceSort}
                    setPriceSort={setPriceSort}
                />

                <section>
                    {filteredMenu.length > 0 ?
                        <ul className="menu-list">
                            {filteredMenu.map((item) => {
                                return (
                                    <li key={item.id}>
                                        <MenuItem
                                            itemName={item.name}
                                            itemDescription={item.description}
                                            itemPrice={formatPrice(item.price)}
                                            buttonText="✎"
                                            handleClick={() => redirectToEditor(item.id, item.name)}
                                        />
                                    </li>
                                )
                            })}
                        </ul> : <p>Geen menu items gevonden</p>
                    }
                </section>
            </div>
        </>
    )
}

export default MenuPage;