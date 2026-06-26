import { useEffect, useState } from 'react';

function AdminPage() {

    const [etablissements, setEtablissements] = useState([]);
    const [nom, setNom] = useState('');
    const [ville, setVille] = useState('');
    const [adresse, setAdresse] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [niveauOccupation, setNiveauOccupation] = useState('faible');
    const [editId, setEditId] = useState(null);

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

    const ajouterEtablissement = async () => {

        const response = await fetch(
            'http://127.0.0.1:8000/api/etablissements',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nom,
                    ville,
                    adresse,
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude),
                    niveauOccupation
                })
            }
        );

        if (response.ok) {

            const nouvelleListe = await fetch(
                'http://127.0.0.1:8000/api/etablissements'
            );

            const data = await nouvelleListe.json();

            setEtablissements(data);
        }
    };

    const supprimerEtablissement = async (id) => {

        const response = await fetch(
            `http://127.0.0.1:8000/api/etablissements/${id}`,
            {
                method: 'DELETE'
            }
        );

        if (response.ok) {

            setEtablissements(
                etablissements.filter(
                    e => e.id !== id
                )
            );
        }
    };

    const chargerModification = (etablissement) => {

        setEditId(etablissement.id);

        setNom(etablissement.nom);
        setVille(etablissement.ville);
        setAdresse(etablissement.adresse);
        setLatitude(etablissement.latitude);
        setLongitude(etablissement.longitude);
        setNiveauOccupation(
            etablissement.niveauOccupation
        );
    };

    const modifierEtablissement = async () => {

        const response = await fetch(
            `http://127.0.0.1:8000/api/etablissements/${editId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nom,
                    ville,
                    adresse,
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude),
                    niveauOccupation
                })
            }
        );

        if (response.ok) {

            const nouvelleListe = await fetch(
                'http://127.0.0.1:8000/api/etablissements'
            );

            const data = await nouvelleListe.json();

            setEtablissements(data);

            setEditId(null);

            setNom('');
            setVille('');
            setAdresse('');
            setLatitude('');
            setLongitude('');
            setNiveauOccupation('faible');
        }
    };

    return (
        <div style={{ padding: '20px' }}>

            <h1>
                Administration des établissements
            </h1>


            <h2>Ajouter un établissement</h2>

            <input
                type="text"
                placeholder="Nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
            />

            <br /><br />

            <input
                type="text"
                placeholder="Ville"
                value={ville}
                onChange={(e) => setVille(e.target.value)}
            />

            <br /><br />

            <input
                type="text"
                placeholder="Adresse"
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
            />

            <br /><br />

            <input
                type="number"
                placeholder="Latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
            />

            <br /><br />

            <input
                type="number"
                placeholder="Longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
            />

            <br /><br />

            <select
                value={niveauOccupation}
                onChange={(e) => setNiveauOccupation(e.target.value)}
            >
                <option value="faible">Faible</option>
                <option value="moyen">Moyen</option>
                <option value="saturation">Saturation</option>
            </select>

            <br /><br />

            {
                editId ? (
                    <button onClick={modifierEtablissement}>
                        Modifier
                    </button>
                ) : (
                    <button onClick={ajouterEtablissement}>
                        Ajouter
                    </button>
                )
            }

        <hr />

            <table
                border="1"
                cellPadding="10"
                style={{
                    width: '100%',
                    borderCollapse: 'collapse'
                }}
            >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Ville</th>
                        <th>Occupation</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {etablissements.map((etablissement) => (
                        <tr key={etablissement.id}>
                            <td>{etablissement.id}</td>
                            <td>{etablissement.nom}</td>
                            <td>{etablissement.ville}</td>
                            <td>{etablissement.niveauOccupation}</td>
                            <td>
                                <button
                                    onClick={() =>
                                        chargerModification(etablissement)
                                    }
                                >
                                    Modifier
                                </button>

                                {' '}

                                <button
                                    onClick={() =>
                                        supprimerEtablissement(etablissement.id)
                                    }
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default AdminPage;