// TODO: write logout function

import {useState, createContext} from 'react';
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

    const authData = {
        isAuth: isAuth,
        login: login,
    }

    return (
        <AuthContextProvider value={authData}>
            {children}
        </AuthContextProvider>
    )
}

export default AuthContextProvider;