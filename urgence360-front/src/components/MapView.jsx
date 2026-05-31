import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function MapView({ ville }) {

    const [etablissements, setEtablissements] = useState([]);

    

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/etablissements')
            .then(response => response.json())
            .then(data => {
                setEtablissements(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const etablissementsFiltres = etablissements.filter(
        etablissement =>
            etablissement.ville &&
            etablissement.ville
                .toLowerCase()
                .includes(ville.toLowerCase())
    );

    return (
        <MapContainer
            center={[43.611, 3.876]}
            zoom={12}
            style={{ height: '100vh', width: '100%' }}
        >
            <TileLayer
                attribution="&copy; OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {etablissementsFiltres.map((etablissement) => (
                <Marker
                    key={etablissement.id}
                    position={[
                        etablissement.latitude,
                        etablissement.longitude
                    ]}
                >
                    <Popup>
                        <h3>{etablissement.nom}</h3>
                        <p>
                            Occupation : {etablissement.niveauOccupation}
                        </p>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default MapView;