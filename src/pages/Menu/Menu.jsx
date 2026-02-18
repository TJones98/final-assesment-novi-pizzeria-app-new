import './Menu.css';
import Card from '../../components/Card/Card.jsx';
import Button from '../../components/Button/Button.jsx';
import {useEffect, useState} from "react";
import MenuItem from '../../components/MenuItem/MenuItem.jsx';
import formatPrice from '../../helpers/formatPrice';
import FilterBar from '../../components/FilterBar/FilterBar.jsx';
import axios from 'axios';


function Menu() {
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
                console.log(response.data);
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
            <div className="menu-page-container">
                <div className="left-side-container">
                    <FilterBar/>
                    <section>
                        <h1>Menu</h1>
                        <hr className="menu-divider"/>

                        {menu.length > 0 ?
                            <ul className="menu-list">
                                {
                                    menu.map((item) => {
                                        return (
                                            <li key={item.id}>
                                                <MenuItem
                                                    itemName={item.name}
                                                    itemDescription={item.description}
                                                    itemPrice={formatPrice(item.price)}
                                                />
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            :
                            <p>Geen menu items gevonden</p>
                        }
                    </section>
                </div>

                <aside>
                    <Card height={600} width={250}>
                        <h3>Mijn bestelling</h3>
                        <Button buttonText="Bestellen"/>
                    </Card>
                </aside>

            </div>
        </>
    )
}

export default Menu;