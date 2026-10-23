import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { useMap } from 'react-leaflet';

const API_URL = import.meta.env.VITE_API_URL;

function RecenterMap({ position }) {
    // Récupère l'instance Leaflet utilisée pour déplacer la carte.
    const map = useMap();

    // Centre la carte sur le résultat ou revient à une vue de la France entière.
    useEffect(() => {
        if (position) {
            map.setView(position, 12);
        } else {
            map.setView([46.603354, 1.888334], 6);
        }
    }, [map, position?.[0], position?.[1]]);

    return null;
}


function MapView({ ville }) {

    // Conserve les établissements reçus depuis l'API.
    const [etablissements, setEtablissements] = useState([]);

    // Charge une seule fois les données nécessaires aux marqueurs de la carte.
    useEffect(() => {
        fetch(`${API_URL}/etablissements`)
            .then(response => response.json())
            .then(data => {
                setEtablissements(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    // Ne garde que les établissements dont la ville correspond à la recherche.
    const etablissementsFiltres = etablissements.filter(
        etablissement =>
            etablissement.ville &&
            etablissement.ville
                .toLowerCase()
                .includes(ville.toLowerCase())
    );

    // Ne recadre que si une ville est saisie et qu'au moins un résultat correspond.
    const positionRecherche =
    ville.trim() !== "" && etablissementsFiltres.length > 0
        ? [
            etablissementsFiltres[0].latitude,
            etablissementsFiltres[0].longitude
        ]
        : null;

    // Associe une couleur au niveau d'occupation pour différencier les marqueurs.
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
    
    // Affiche le fond cartographique et un marqueur interactif par établissement.
    return (
        <MapContainer
            center={[46.603354, 1.888334]}
            zoom={6}
            style={{
                height: "100%",
                width: "100%" }}
        >
            {/* Charge les tuiles OpenStreetMap qui forment le fond de carte. */}
            <TileLayer
                attribution="&copy; OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />


            <RecenterMap position={positionRecherche} />

            {/* Place un marqueur et une fiche d'information pour chaque résultat. */}
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