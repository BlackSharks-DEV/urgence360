import { useState } from 'react';
import MapView from './components/MapView';

function App() {
  const [ville, setVille] = useState('Montpellier');

  return (
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
        />
      </div>

      <MapView ville={ville} />
    </>
  );
}

export default App;