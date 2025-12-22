import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/Loading";


const AllUsers = () => {
    const axios = useAxiosSecure();
    const {
        data: users = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ['all-users'],
        queryFn: async () => {
            const response = await axios.get('/users');
            return response.data?.data || response.data || [];
        }
    });

    const formatDate = (value) => {
        if (!value) return 'Not available';
        const resolvedValue = typeof value === 'object' ? value?.$date : value;
        const date = new Date(resolvedValue);
        return Number.isNaN(date.getTime()) ? 'Not available' : date.toLocaleDateString();
    };

    const handleRoleChange = async (userId, role) => {
        try {
            const res = await axios.patch(`/users/${userId}/role`, {
                role,
                updated_at: new Date(),
            });
            if (res.data?.success) {
                toast.success(`Role updated to ${role}.`);
            } else {
                toast.success('User role updated.');
            }
            refetch();
        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <div className="p-6 text-center text-red-500">Error loading users: {error.message}</div>;
    }

    return (
        <div className="w-11/12 mx-auto py-6">
            <h1 className="text-3xl font-semibold">All Users</h1>
            <p className="text-base-content/70">
                Promote users to librarian or admin.
            </p>
            <div className="mt-6 rounded-xl border border-base-200 bg-base-100 p-6">
                <div className="overflow-x-auto">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>User</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Joined</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center text-base-content/70">
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user, index) => (
                                    <tr key={user._id || user.email || index}>
                                        <th>{index + 1}</th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="w-10 rounded-full bg-base-200">
                                                        {user.photoURL ? (
                                                            <img
                                                                src={user.photoURL}
                                                                alt={user.name || 'User'}
                                                                referrerPolicy="no-referrer"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center text-sm font-semibold">
                                                                {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-medium">{user.name || 'Unknown'}</div>
                                                    <div className="text-xs text-base-content/60">{user._id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className="badge badge-outline capitalize">
                                                {user.role || 'user'}
                                            </span>
                                        </td>
                                        <td>
                                            <span
                                                className={`badge ${
                                                    user.status === 'active'
                                                        ? 'badge-success'
                                                        : 'badge-ghost'
                                                }`}
                                            >
                                                {user.status || 'unknown'}
                                            </span>
                                        </td>
                                        <td>{formatDate(user.created_at)}</td>
                                        <td>
                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-xs btn-outline"
                                                    disabled={user.role === 'librarian'}
                                                    onClick={() => handleRoleChange(user._id, 'librarian')}
                                                >
                                                    Make Librarian
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-xs btn-primary"
                                                    disabled={user.role === 'admin'}
                                                    onClick={() => handleRoleChange(user._id, 'admin')}
                                                >
                                                    Make Admin
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;
