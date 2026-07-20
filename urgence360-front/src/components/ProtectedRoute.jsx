import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {

    const estConnecte = localStorage.getItem('connecte');

    if (!estConnecte) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;