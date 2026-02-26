import {useEffect, useState} from "react";
import axios from "axios";
import MenuItem from "../../components/MenuItem/MenuItem.jsx";
import formatPrice from "../../helpers/formatPrice.js";

function MenuPage() {
    const [menu, setMenu] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);

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

    return (
        <>
            {error && <p>Er is iets misgegaan bij het ophalen van de data. Probeer het later nog eens.</p>}
            {loading && <p>Loading...</p>}

            <section>
                {menu.length > 0 ?
                    <ul className="menu-list">
                        {menu.map((item) => {
                            return (
                                <li key={item.id}>
                                    <MenuItem
                                        itemName={item.name}
                                        itemDescription={item.description}
                                        itemPrice={formatPrice(item.price)}
                                    />
                                </li>
                            )
                        })}
                    </ul> : <p>Geen menu items gevonden</p>
                }
            </section>
        </>
    )
}

export default MenuPage;