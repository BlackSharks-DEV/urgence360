import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [erreur, setErreur] = useState("");

    const navigate = useNavigate();

    const connexion = async () => {

        setErreur("");

        const response = await fetch(
            "http://127.0.0.1:8000/api/login",
            {
                method: "POST",
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

        console.log("Réponse API :", data);

        if (data.success) {

            localStorage.setItem("connecte", "true");

            navigate("/admin");

        } else {

            setErreur("Email ou mot de passe incorrect");

        }

    };

    return (

        <div
            className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center"
        >

            <div
                className="card shadow-lg border-0"
                style={{ maxWidth: "430px", width: "100%" }}
            >

                <div className="card-body p-5">

                    <div className="text-center mb-4">
                        <img
                        src="/Urgence360.png"
                        alt="Logo"
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

                    <button
                        className="btn btn-primary btn-lg w-100 mb-3"
                        onClick={connexion}
                    >
                        Se connecter
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