import './Navigation.css';
import {NavLink} from 'react-router-dom';
import {useContext} from "react";
import {AuthContext} from '../../contexts/AuthContext';
import Button from '../../components/Button/Button.jsx';

function Navigation() {
    const {isAuth, userData, logout} = useContext(AuthContext);

    return (
        <>
            <nav className="main-navigation-container">
                <h2>Palermo</h2>
                <ul>
                    {isAuth ?
                        <div className="auth-navigation">
                            <p>{userData.email}</p>
                            <li>
                                <NavLink className={({ isActive }) => isActive ? "active-nav-link" : "default-nav-link"} to="/">Home</NavLink>
                            </li>
                            <li>
                                <Button buttonType="button" onClick={logout} buttonText="Afmelden"/>
                            </li>
                        </div>
                        :
                        <div className="main-navigation-links">
                            <li>
                                <NavLink className={({ isActive }) => isActive ? "active-nav-link" : "default-nav-link"} to="/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => isActive ? "active-nav-link" : "default-nav-link"} to="*">Bestellen</NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => isActive ? "active-nav-link" : "default-nav-link"} to="/login">Medewerkersportaal</NavLink>
                            </li>
                        </div>
                    }
                </ul>
            </nav>
        </>
    );
}

export default Navigation;
