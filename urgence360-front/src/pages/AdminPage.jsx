import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminPage() {
    // Permet de rediriger l'utilisateur après vérification ou déconnexion.
    const navigate = useNavigate();

    // Conserve la liste récupérée depuis l'API et les valeurs du formulaire.
    const [etablissements, setEtablissements] = useState([]);

    // Centralise la racine des endpoints utilisés par la gestion des établissements.
    const API_URL = import.meta.env.VITE_API_URL;
    const [nom, setNom] = useState("");
    const [ville, setVille] = useState("");
    const [adresse, setAdresse] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [niveauOccupation, setNiveauOccupation] = useState("faible");

    const [editId, setEditId] = useState(null);

    // Lit l'indicateur local utilisé par l'interface pour protéger cette page.
    const estConnecte = localStorage.getItem("connecte");

    // Vérifie l'accès à la page et charge les établissements au premier affichage.
    useEffect(() => {
        if (!estConnecte) {
            navigate("/login");
            return;
        }

        chargerEtablissements();
    }, [navigate, estConnecte]);

    // Récupère la liste via la session Symfony et la stocke dans l'état React.
    const chargerEtablissements = async () => {
        const response = await fetch(
            `${API_URL}/etablissements`,
            {
                credentials: "include"
            }
        );

        const data = await response.json();

        setEtablissements(data);
    };

    // Réinitialise les champs après une création ou une modification.
    const viderFormulaire = () => {
        setNom("");
        setVille("");
        setAdresse("");
        setLatitude("");
        setLongitude("");
        setNiveauOccupation("faible");
        setEditId(null);
    };

    // Envoie les valeurs du formulaire pour créer un établissement.
    const ajouterEtablissement = async () => {

        const response = await fetch(
            `${API_URL}/etablissements`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nom,
                    ville,
                    adresse,
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude),
                    niveauOccupation,
                }),
            }
        );

        if (response.ok) {
            await chargerEtablissements();
            viderFormulaire();
        }
    };

    // Envoie les valeurs modifiées pour mettre à jour l'établissement sélectionné.
    const modifierEtablissement = async () => {

        const response = await fetch(
            `${API_URL}/etablissements/${editId}`,
            {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nom,
                    ville,
                    adresse,
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude),
                    niveauOccupation,
                }),
            }
        );

        if (response.ok) {
            await chargerEtablissements();
            viderFormulaire();
        }
    };

    // Demande confirmation avant de supprimer l'établissement indiqué.
    const supprimerEtablissement = async (id) => {

        if (!window.confirm("Supprimer cet établissement ?")) return;

        const response = await fetch(
            `${API_URL}/etablissements/${id}`,
            {
                method: "DELETE",
                credentials: "include",
            }
        );

        if (response.ok) {
            chargerEtablissements();
        }
    };

    // Préremplit le formulaire avec les données de la ligne à modifier.
    const chargerModification = (e) => {

        setEditId(e.id);

        setNom(e.nom);
        setVille(e.ville);
        setAdresse(e.adresse);
        setLatitude(e.latitude);
        setLongitude(e.longitude);
        setNiveauOccupation(e.niveauOccupation);
    };

    // Efface les informations de connexion locales et revient à l'écran de login.
    const deconnexion = () => {

        localStorage.removeItem("connecte");
        localStorage.removeItem("email");

        navigate("/login");
    };

    // Affiche le formulaire de gestion et le tableau des établissements.
    return (
    <div className="container-fluid py-4">

        <div className="d-flex justify-content-between align-items-center mb-4">
            <img
                src="/Urgence360.png"
                alt="Logo"
                width="60"
                className="me-3"
            />
            <div>
                <h2 className="fw-bold mb-0">
                    Administration
                </h2>

                <small className="text-muted">
                    Gestion des établissements
                </small>
            </div>

            <button
                className="btn btn-danger"
                onClick={deconnexion}
            >
                Déconnexion
            </button>

        </div>

        {/* Le formulaire sert à créer une entrée ou à modifier celle sélectionnée. */}
        <div className="card shadow-sm mb-4">

            <div className="card-header bg-primary text-white">

                <h5 className="mb-0">
                    {editId
                        ? "Modifier un établissement"
                        : "Ajouter un établissement"}
                </h5>

            </div>

            <div className="card-body">

                <div className="row g-3">

                    <div className="col-md-6">

                        <input
                            className="form-control"
                            placeholder="Nom"
                            value={nom}
                            onChange={(e)=>setNom(e.target.value)}
                        />

                    </div>

                    <div className="col-md-6">

                        <input
                            className="form-control"
                            placeholder="Ville"
                            value={ville}
                            onChange={(e)=>setVille(e.target.value)}
                        />

                    </div>

                    <div className="col-12">

                        <input
                            className="form-control"
                            placeholder="Adresse"
                            value={adresse}
                            onChange={(e)=>setAdresse(e.target.value)}
                        />

                    </div>

                    <div className="col-md-4">

                        <input
                            type="number"
                            className="form-control"
                            placeholder="Latitude"
                            value={latitude}
                            onChange={(e)=>setLatitude(e.target.value)}
                        />

                    </div>

                    <div className="col-md-4">

                        <input
                            type="number"
                            className="form-control"
                            placeholder="Longitude"
                            value={longitude}
                            onChange={(e)=>setLongitude(e.target.value)}
                        />

                    </div>

                    <div className="col-md-4">

                        <select
                            className="form-select"
                            value={niveauOccupation}
                            onChange={(e)=>setNiveauOccupation(e.target.value)}
                        >
                            <option value="faible">Faible</option>
                            <option value="moyen">Moyen</option>
                            <option value="saturation">Saturation</option>
                        </select>

                    </div>

                </div>

                <div className="mt-4">

                    {editId ? (

                        <button
                            className="btn btn-warning"
                            onClick={modifierEtablissement}
                        >
                            Modifier
                        </button>

                    ) : (

                        <button
                            className="btn btn-success"
                            onClick={ajouterEtablissement}
                        >
                            Ajouter
                        </button>

                    )}

                </div>

            </div>

        </div>

        {/* Le tableau présente les entrées et leurs actions disponibles. */}
        <div className="card shadow-sm">

            <div className="card-header">

                <h5 className="mb-0">
                    Liste des établissements
                </h5>

            </div>

            <div className="table-responsive">

                <table className="table table-hover align-middle mb-0">

                    <thead className="table-dark">

                        <tr>

                            <th>ID</th>
                            <th>Nom</th>
                            <th>Ville</th>
                            <th>Occupation</th>
                            <th className="text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {/* Choisit la couleur du badge selon le niveau d'occupation. */}
                        {etablissements.map((etablissement)=>{

                            let couleur="success";

                            if(etablissement.niveauOccupation==="moyen")
                                couleur="warning";

                            if(etablissement.niveauOccupation==="saturation")
                                couleur="danger";

                            return(

                            <tr key={etablissement.id}>

                                <td>{etablissement.id}</td>

                                <td>{etablissement.nom}</td>

                                <td>{etablissement.ville}</td>

                                <td>

                                    <span className={`badge bg-${couleur}`}>

                                        {etablissement.niveauOccupation}

                                    </span>

                                </td>

                                <td className="text-center">

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() =>
                                            chargerModification(etablissement)
                                        }
                                    >
                                        Modifier
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            supprimerEtablissement(etablissement.id)
                                        }
                                    >
                                        Supprimer
                                    </button>

                                </td>

                            </tr>

                            );

                        })}

                    </tbody>

                </table>

            </div>

        </div>

    </div>
    );
}

export default AdminPage;