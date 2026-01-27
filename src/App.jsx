import './App.css'
import {Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import Navigation from './components/navigation/Navigation.jsx';
import Footer from "./components/footer/Footer.jsx";

function App() {
    return (
        <>
            <Navigation/>
            <main className="page-container">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </main>
            <Footer/>
        </>
    )
}

export default App
