import {createContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import isTokenValid from '../helpers/isTokenValid.js';
import axios from 'axios';

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [auth, toggleAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending"
    });

    useEffect(() => {
        console.log("Pagina is opnieuw geladen");
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);

            if (isTokenValid(decodedToken)) {

                async function fetchUserData() {
                    try {
                        const response = await axios.get(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/users/${decodedToken.userId}`, {
                            headers: {
                                'novi-education-project-id': 'fa5d53e3-5361-45a4-b01e-ae2b978120fa',
                            }
                        });
                        console.log("Gebruikersdata geladen");
                        toggleAuth({
                            isAuth: true,
                            user: response.data,
                            status: "done",
                        });
                    } catch (e) {
                        console.log("Fout bij het ophalen van gegevens", e);
                        toggleAuth({
                            isAuth: false,
                            user: null,
                            status: "done",
                        });
                    }
                }
                fetchUserData();
            } else {
                console.log("Token is verlopen");
                toggleAuth({
                    isAuth: false,
                    user: null,
                    status: "done",
                });
            }
        } else {
            console.log("Geen token gevonden")
            toggleAuth({
                isAuth: false,
                user: null,
                status: "done",
            });
        }
    }, []);

    const navigate = useNavigate();

    function login(userDetails) {
        localStorage.setItem('token', userDetails.token);
        toggleAuth({
            isAuth: true,
            user: {
                email: userDetails.user.email,
                roles: userDetails.user.roles,
            },
            status: "done",
        });
        console.log("Gebruiker is ingelogd");
        navigate('/staff');
    }

    function logout() {
        localStorage.clear();
        toggleAuth({
            isAuth: false,
            user: null,
            status: "done",
        });
        console.log("Gebruiker is uitgelogd");
        navigate('/');
    }

    const data = {
        isAuth: auth.isAuth,
        userData: auth.user,
        login: login,
        logout: logout,
    }

    return (
        <AuthContext.Provider value={data}>
            {auth.status === "done" ? children : <p>loading...</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;