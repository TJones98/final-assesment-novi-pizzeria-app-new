import {createContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [isAuth, toggleIsAuth] = useState(false);
    const navigate = useNavigate();

    function login() {
        toggleIsAuth(true);
        console.log("user is logged in");
        navigate('/staff');
    }

    function logout() {
        toggleIsAuth(false);
        console.log("user is logged out");
        navigate('/');
    }

    const data = {
        isAuth: isAuth,
        login: login,
        logout: logout,
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;