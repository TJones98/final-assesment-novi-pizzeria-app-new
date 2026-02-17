import './Menu.css';
import Card from '../../components/Card/Card.jsx'
import Button from '../../components/Button/Button.jsx'


function Menu() {
    return (
        <>
            <div className="menu-page-container">
                <section>
                    <h1>Menu</h1>
                    <hr className="menu-divider"/>
                </section>
                <aside>
                    <Card height={500} width={250}>
                        <h3>Mijn bestelling</h3>
                        <Button buttonText="Bestellen"/>
                    </Card>
                </aside>
            </div>
        </>
    )
}

export default Menu;