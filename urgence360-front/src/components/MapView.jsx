import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { useMap } from 'react-leaflet';


function RecenterMap({ position }) {
    const map = useMap();

    if (position) {
        map.setView(position, 12);
    }

    return null;
}

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

    const positionRecherche =
    etablissementsFiltres.length > 0
        ? [
            etablissementsFiltres[0].latitude,
            etablissementsFiltres[0].longitude
        ]
        : null;

    const getColor = (niveauOccupation) => {
        switch (niveauOccupation.toLowerCase()) {
            case 'faible':
                return 'green';

            case 'moyen':
                return 'orange';

            case 'saturation':
                return 'red';

            default:
                return 'blue';
        }
    };
    
    return (
        <MapContainer
            center={[43.611, 3.876]}
            zoom={12}
            style={{
                height: "100%",
                width: "100%" }}
        >
            <TileLayer
                attribution="&copy; OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />


            <RecenterMap position={positionRecherche} />

            {etablissementsFiltres.map((etablissement) => (
                <CircleMarker
                    key={etablissement.id}
                    center={[
                        etablissement.latitude,
                        etablissement.longitude
                ]}
                radius={12}
                weight={3}
                pathOptions={{
                    color: getColor(etablissement.niveauOccupation),
                    fillColor: getColor(etablissement.niveauOccupation),
                    fillOpacity: 0.8,
                    weight: 3
                }}
            >
                    <Popup>
                        <div style={{ minWidth: '200px' }}>
                            <h3>{etablissement.nom}</h3>

                            <p>
                                📍 {etablissement.adresse}
                            </p>

                            <p>
                                🏙️ {etablissement.ville}
                            </p>

                            <p>
                                🚑 Occupation :
                                {' '}
                                {etablissement.niveauOccupation}
                            </p>
                        </div>
                    </Popup>
                </CircleMarker>
            ))}
        </MapContainer>
    );
}

export default MapView;