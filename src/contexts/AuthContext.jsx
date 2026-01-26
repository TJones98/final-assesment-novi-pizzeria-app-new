// TODO: write logout function

import {createContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [isAuth, toggleIsAuth] = useState({isAuth: false});
    const navigate = useNavigate();

    function login() {
        toggleIsAuth({isAuth: true});
        console.log("user is logged in");
        navigate('/staff');
    }

    const data = {
        isAuth: isAuth,
        login: login,
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;