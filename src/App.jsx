import './App.css'
import {Route, Routes} from 'react-router-dom';

function App() {
    return (
    <>
        <main className="page-container">
            <Routes>
                <Route path="/" component={App} />
            </Routes>

        </main>
    </>
  )
}

export default App
