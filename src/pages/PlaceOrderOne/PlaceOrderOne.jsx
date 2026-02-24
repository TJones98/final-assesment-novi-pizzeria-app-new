import './PlaceOrderOne.css';
import Card from '../../components/Card/Card.jsx';
import Button from '../../components/Button/Button.jsx';
import {useContext, useEffect, useMemo, useState} from "react";
import MenuItem from '../../components/MenuItem/MenuItem.jsx';
import formatPrice from '../../helpers/formatPrice';
import FilterBar from '../../components/FilterBar/FilterBar.jsx';
import calculateTotalOrderPrice from '../../helpers/calculateTotalOrderPrice';
import DeleteButton from '../../components/DeleteButton/DeleteButton.jsx';
import {SubmitOrderContext} from "../../contexts/SubmitOrderContext.jsx";
import axios from 'axios';
import {useNavigate} from "react-router-dom";


function PlaceOrderOne() {
    const [menu, setMenu] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceSort, setPriceSort] = useState(null);
    const {newOrder, setNewOrder, setOrderItems, deleteOrderItem} = useContext(SubmitOrderContext);
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();
        const savedOrder = JSON.parse(sessionStorage.getItem('orderItems'));
        if (savedOrder) {
            setNewOrder ({
                orderItems: [...savedOrder.orderItems ]
        })}

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

    function saveOrderItems() {
        sessionStorage.setItem('orderItems', JSON.stringify(newOrder));
        console.log("Order saved to sessionStorage:", newOrder);
        navigate('/place-order-3');
    }

    return (
        <>
            {error && <p>Er is iets misgegaan bij het ophalen van de data. Probeer het later nog eens.</p>}
            {loading && <p>Loading...</p>}
            <div className="menu-page-container">
                <div className="left-side-container">
                    <FilterBar
                        isVegetarian={isVegetarian}
                        setIsVegetarian={setIsVegetarian}
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                        priceSort={priceSort}
                        setPriceSort={setPriceSort}
                    />

                    <section>
                        <h1>Menu</h1>
                        <hr className="menu-divider"/>

                        {filteredMenu.length > 0 ?
                            <ul className="menu-list">
                                {
                                    filteredMenu.map((item) => {
                                        return (
                                            <li key={item.id}>
                                                <MenuItem
                                                    itemName={item.name}
                                                    itemDescription={item.description}
                                                    itemPrice={formatPrice(item.price)}
                                                    handleClick={() => setOrderItems(item)}
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
                        <ul>
                        {newOrder.orderItems.map((orderItem) => {
                            return <li key={orderItem.orderItemsId}>
                                <span className='order-item-name'>
                                    <DeleteButton
                                        handleClick={() => deleteOrderItem(orderItem.orderItemsId)}
                                    />
                                    <strong>{orderItem.menuItemName}</strong>
                                    <p>€{formatPrice(orderItem.unitPrice)}</p>
                                </span>
                            </li>
                        })}
                        </ul>
                        <p><strong>TOTAAL</strong> - €{formatPrice(calculateTotalOrderPrice(newOrder.orderItems))}</p>
                        <Button buttonType="button"
                                buttonText="Ga verder met bestellen"
                                onClick={saveOrderItems}
                        />
                    </Card>
                </aside>

            </div>
        </>
    )
}

export default PlaceOrderOne;