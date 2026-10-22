// Charge les styles des bibliothèques utilisées par l'interface.
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';

import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App.jsx';

// Monte l'application dans l'élément racine de la page HTML.
createRoot(document.getElementById('root')).render(
    // Active les vérifications supplémentaires de React en développement.
    <StrictMode>
        {/* Rend le routeur disponible à tous les composants de l'application. */}
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
);