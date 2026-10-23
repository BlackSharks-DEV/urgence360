
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [erreur, setErreur] = useState("");
    // Suit la requête afin d'empêcher les envois répétés et d'indiquer sa progression.
    const [chargement, setChargement] = useState(false);

    const navigate = useNavigate();

    // Connexion à l'API Symfony
    const connexion = async () => {
        // Réinitialise l'erreur précédente et active l'état de chargement.
        setErreur("");
        setChargement(true);

        try {
            // Envoie les identifiants avec le cookie de session géré par Symfony.
            const response = await fetch(
                `${API_URL}/login`,{
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            // Affiche une erreur si la requête échoue ou si les identifiants sont refusés.
            if (!response.ok || !data.success) {
                setErreur("Email ou mot de passe incorrect");
                return;
            }

            // L'accès à l'administration nécessite explicitement le rôle administrateur.
            if (!data.roles?.includes("ROLE_ADMIN")) {
                setErreur(
                    "Ce compte ne possède pas les droits administrateur."
                );
                return;
            }

            // Indicateur utilisé par la navigation React.
            // La véritable authentification est gérée par Symfony.
            localStorage.setItem("connecte", "true");

            navigate("/admin");

        } catch (error) {
            // Informe l'utilisateur si le serveur est inaccessible ou renvoie une erreur réseau.
            console.error("Erreur de connexion :", error);
            setErreur("Impossible de contacter le serveur Symfony.");
        } finally {
            // Réactive le formulaire que la requête ait réussi ou échoué.
            setChargement(false);
        }
    };

    return (
        <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center">
            <div
                className="card shadow-lg border-0"
                style={{ maxWidth: "430px", width: "100%" }}
            >
                <div className="card-body p-5">
                    <div className="text-center mb-4">
                        <img
                            src="/Urgence360.png"
                            alt="Logo Urgence360"
                            width="100"
                            className="mb-3"
                        />

                        <h2 className="fw-bold text-primary mb-2">
                            Urgence360
                        </h2>

                        <p className="text-muted">
                            Connexion administrateur
                        </p>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Adresse email
                        </label>

                        <input
                            type="email"
                            className="form-control form-control-lg"
                            placeholder="admin@urgence360.fr"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">
                            Mot de passe
                        </label>

                        <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Bloque les nouveaux envois et adapte le libellé pendant la requête. */}
                    <button
                        type="button"
                        className="btn btn-primary btn-lg w-100 mb-3"
                        onClick={connexion}
                        disabled={chargement}
                    >
                        {chargement
                            ? "Connexion en cours..."
                            : "Se connecter"}
                    </button>

                    <Link
                        to="/"
                        className="btn btn-outline-secondary w-100"
                    >
                        ← Retour à la carte
                    </Link>

                    {erreur && (
                        <div className="alert alert-danger mt-4 mb-0">
                            {erreur}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
