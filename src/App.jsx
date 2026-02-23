import './App.css'
import React, {useContext} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import StaffDashboard from './pages/StaffDashboard/StaffDashboard.jsx';
import PlaceOrder1 from './pages/PlaceOrder1/PlaceOrder1.jsx';
import PlaceOrder3 from './pages/PlaceOrder3/PlaceOrder3.jsx';
import OrderDetail from './pages/OrderDetail/OrderDetail.jsx';
import Navigation from './components/navigation/Navigation.jsx';
import Footer from "./components/footer/Footer.jsx";
import {AuthContext} from "./contexts/AuthContext.jsx";
import {SubmitOrderContext} from "./contexts/SubmitOrderContext.jsx";


function App() {
    const {isAuth} = useContext(AuthContext);
    // const {newOrder} = useContext(SubmitOrderContext)

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
                    <Route path="/place-order-1" element={<PlaceOrder1 />} />
                    <Route path="place-order-3" element={<PlaceOrder3 />} />
                    {/*<Route path="/place-order-3" element={newOrder > 0 ? <PlaceOrder3/> : <Navigate to="/"/>}/>*/}
                </Routes>
            </main>
            <Footer/>
        </>
    )
}

export default App
