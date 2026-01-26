// ToDo: beveilig route login page, make 404 page

import './App.css'
import {Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import Navigation from './components/navigation/Navigation.jsx';
import Footer from "./components/footer/Footer.jsx";

function App() {
    return (
        <>
            <Navigation/>
            <main className="page-container">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </main>
            <Footer/>
        </>
    )
}

export default App
