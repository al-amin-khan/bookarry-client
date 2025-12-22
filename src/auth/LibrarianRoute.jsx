import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const LibrarianRoute = ({ children }) => {
    const { user, loading: authLoading } = useAuth();
    const { role, isUserRoleLoading } = useRole();
    const location = useLocation();

    if (authLoading || isUserRoleLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (role !== 'librarian') {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default LibrarianRoute;
