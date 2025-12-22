import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
    const { user, loading: authLoading } = useAuth();
    const { role, isUserRoleLoading } = useRole();
    const location = useLocation();

    console.log('admin route jsx: ', user, role, isUserRoleLoading);

    if (authLoading || isUserRoleLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (role !== "admin") {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default AdminRoute;
