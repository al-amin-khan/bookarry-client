import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        data: role = null,
        isLoading: isUserRoleLoading,
        isError: isUserRoleError,
        error: userRoleError,
    } = useQuery({
        queryKey: ["userRole", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role?email=${user.email}`);
            return res.data.data.role;
        },
    });

    return { role, isUserRoleLoading, isUserRoleError, userRoleError };
};

export default useRole;
