import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import AuthContext from './contexts/AuthContext.jsx';
import SubmitOrderContext from "./contexts/SubmitOrderContext.jsx";


createRoot(document.getElementById('root')).render(
  // <StrictMode>
      <Router>
          <AuthContext>
              <SubmitOrderContext>
                  <App />
              </SubmitOrderContext>
          </AuthContext>
      </Router>
 // </StrictMode>
);
