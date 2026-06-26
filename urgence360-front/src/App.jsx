import { useState } from 'react';
import MapView from './components/MapView';
import { Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';

function App() {
  const [ville, setVille] = useState('Montpellier');

  return (
    <Routes>

      <Route
        path="/"
        element={
          <>
            <div style={{
              position: 'absolute',
              top: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1000,
              background: 'white',
              padding: '10px',
              borderRadius: '8px'
            }}>
              <input
                type="text"
                placeholder="Rechercher une ville..."
                value={ville}
                onChange={(e) => setVille(e.target.value)}
                style={{
                  padding: '8px',
                  marginRight: '10px'
                }}
              />

              <button
                style={{
                  padding: '8px 15px',
                  cursor: 'pointer'
                }}
              >
                Rechercher
              </button>
            </div>

            <div
              style={{
                position: 'absolute',
                top: '80px',
                right: '20px',
                zIndex: 1000,
                background: 'white',
                padding: '12px',
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
              }}
            >
              <h4>Niveau d'occupation</h4>

              <p>🟢 Faible</p>
              <p>🟠 Moyen</p>
              <p>🔴 Saturation</p>
            </div>

            <MapView ville={ville} />
          </>
        }
      />

      <Route
        path="/admin"
        element={<AdminPage />}
      />

    </Routes>
  );
}

export default App;