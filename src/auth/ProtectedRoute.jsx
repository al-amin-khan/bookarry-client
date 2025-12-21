import { use } from "react";
import AuthContext from "./AuthContext";
import { Navigate, useLocation } from "react-router";
import Loading from "../components/Loading";


const ProtectedRoute = ({ children }) => {
    const { loading, user } = use(AuthContext);
    const location = useLocation();

    if (loading) return <Loading />;

    if (!user) {
        return <Navigate to={!user ? '/auth/login' : '/'} state={{ from: location }} replace />;
    }
    return children;
};

export default ProtectedRoute;