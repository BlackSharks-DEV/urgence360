import { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';

import MapView from './components/MapView';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';

function Home() {

    // Commence sans filtre pour afficher toute la France, puis conserve la ville saisie.
    const [ville, setVille] = useState("");

    return (
        <div className="d-flex flex-column vh-100">

            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
                <img
                  src="/Urgence360.png"
                  alt="Logo Urgence360"
                  width="45"
                  height="45"
                  className="me-2"
                />
                <div className="container-fluid">

                    <span className="navbar-brand fw-bold">
                        Urgence360
                    </span>

                    <Link
                        to="/login"
                        className="btn btn-outline-light"
                    >
                        Administration
                    </Link>

                </div>

            </nav>

            {/* Barre de recherche */}
            <div className="bg-light border-bottom py-3">

              <div className="container">

                <div className="row g-2">

                  <div className="col-12 col-md-9">

                    <input
                      className="form-control form-control-lg"
                      placeholder="Rechercher une ville..."
                      value={ville}
                      onChange={(e) => setVille(e.target.value)}
                    />

                  </div>

                  <div className="col-12 col-md-3">

                      <button
                          className="btn btn-primary btn-lg w-100"
                      >
                          Rechercher
                      </button>

                    </div>

                  </div>

              </div>

            </div>

            {/* Transmet la ville saisie à la carte pour filtrer ses marqueurs. */}
            <div className="flex-grow-1 overflow-hidden">
              <MapView ville={ville} />
            </div>

            {/* Légende */}

            <div className="bg-white border-top py-3">

              <div className="container">

                <div className="row text-center gy-2">

                  <div className="col-12 col-md">
                    <span className="badge bg-success fs-6">
                      Faible
                    </span>
                  </div>

                  <div className="col-12 col-md">
                    <span className="badge bg-warning text-dark fs-6">
                      Moyen
                    </span>
                  </div>

                  <div className="col-12 col-md">
                    <span className="badge bg-danger fs-6">
                      Saturation
                    </span>
                  </div>

                </div>

              </div>

            </div>

        </div>
    );

}

function App() {

    return (

        <Routes>

        {/* Associe chaque URL de l'application à la page à afficher. */}
            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/login"
                element={<LoginPage />}
            />

            <Route
                path="/admin"
                element={<AdminPage />}
            />

        </Routes>

    );
}

export default App;