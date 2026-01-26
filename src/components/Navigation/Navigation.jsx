import './Navigation.css';
import {NavLink} from 'react-router-dom';

function Navigation() {
    return (
        <>
            <nav className="main-navigation-container">
                <h2>Palermo</h2>
                <ul className="main-navigation-links">
                    <li>
                        <NavLink className={({ isActive }) => isActive ? "active-nav-link" : "default-nav-link"} to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => isActive ? "active-nav-link" : "default-nav-link"} to="*">Bestellen</NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => isActive ? "active-nav-link" : "default-nav-link"} to="/login">Medewerkersportaal</NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Navigation;
