import './App.css'
import React, {useContext} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import StaffDashboard from './pages/StaffDashboard/StaffDashboard.jsx';
import PlaceOrderOne from './pages/PlaceOrderOne/PlaceOrderOne.jsx';
import PlaceOrder2 from './pages/PlaceOrder2/PlaceOrder2.jsx';
import PlaceOrder3 from './pages/PlaceOrder3/PlaceOrder3.jsx';
import OrderDetail from './pages/OrderDetail/OrderDetail.jsx';
import Navigation from './components/navigation/Navigation.jsx';
import Footer from "./components/footer/Footer.jsx";
import {AuthContext} from "./contexts/AuthContext.jsx";


function App() {
    const {isAuth} = useContext(AuthContext);

    return (
        <>
            <Navigation/>
            <main className="page-container">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/staff" element={isAuth ? <StaffDashboard /> : <Navigate to="/login"/>} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/orders/:id" element={isAuth ? <OrderDetail /> : <Navigate to="/login"/>} />
                    <Route path="/*" element={<PageNotFound />} />
                    <Route path="/place-order-1" element={<PlaceOrderOne />} />
                    <Route path="/place-order-2" element={<PlaceOrder2 />} />
                    <Route path="/place-order-3" element={<PlaceOrder3 /> }/>
                </Routes>
            </main>
            <Footer/>
        </>
    )
}

export default App
