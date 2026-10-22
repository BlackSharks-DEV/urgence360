// Importe le composant qui redirige l'utilisateur vers une autre route.
import { Navigate } from 'react-router-dom';

// Definit une route qui n'est accessible que si l'utilisateur est connecte.
function ProtectedRoute({ children }) {

    // Recupere dans le stockage local l'indicateur de connexion.
    const estConnecte = localStorage.getItem('connecte');

    // Si l'indicateur est absent, l'utilisateur n'est pas considere comme connecte.
    if (!estConnecte) {
        // Redirige vers la page de connexion et remplace la route actuelle dans l'historique.
        return <Navigate to="/login" replace />;
    }

    // Si l'utilisateur est connecte, affiche le contenu protege de la route.
    return children;
}

// Rend le composant disponible pour les autres fichiers de l'application.
export default ProtectedRoute;