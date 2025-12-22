import React from 'react';
import { Link } from 'react-router';
import useRole from '../hooks/useRole';

const Dashboard = () => {
    const { role, isUserRoleLoading } = useRole();

    if (isUserRoleLoading) {
        return <div className="p-6 text-center">Loading dashboard...</div>;
    }

    if (role === 'admin') {
        return (
            <div className="w-11/12 mx-auto py-6">
                <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
                <p className="text-base-content/70">Manage users and oversee all books.</p>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <Link to="/dashboard/all-users" className="card bg-base-100 shadow">
                        <div className="card-body">
                            <h2 className="card-title">All Users</h2>
                            <p className="text-sm text-base-content/70">
                                Promote users to librarian or admin.
                            </p>
                        </div>
                    </Link>
                    <Link to="/dashboard/manage-books" className="card bg-base-100 shadow">
                        <div className="card-body">
                            <h2 className="card-title">Manage Books</h2>
                            <p className="text-sm text-base-content/70">
                                Publish, unpublish, or remove books.
                            </p>
                        </div>
                    </Link>
                    <Link to="/dashboard/profile" className="card bg-base-100 shadow">
                        <div className="card-body">
                            <h2 className="card-title">My Profile</h2>
                            <p className="text-sm text-base-content/70">
                                Update your name and avatar.
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }

    if (role === 'librarian') {
        return (
            <div className="w-11/12 mx-auto py-6">
                <h1 className="text-3xl font-semibold">Librarian Dashboard</h1>
                <p className="text-base-content/70">Manage your books and orders.</p>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <Link to="/dashboard/add-book" className="card bg-base-100 shadow">
                        <div className="card-body">
                            <h2 className="card-title">Add Book</h2>
                            <p className="text-sm text-base-content/70">
                                Publish a new title for readers.
                            </p>
                        </div>
                    </Link>
                    <Link to="/dashboard/my-books" className="card bg-base-100 shadow">
                        <div className="card-body">
                            <h2 className="card-title">My Books</h2>
                            <p className="text-sm text-base-content/70">
                                Edit or unpublish your listings.
                            </p>
                        </div>
                    </Link>
                    <Link to="/dashboard/librarian-orders" className="card bg-base-100 shadow">
                        <div className="card-body">
                            <h2 className="card-title">Orders</h2>
                            <p className="text-sm text-base-content/70">
                                Update and fulfill reader orders.
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="w-11/12 mx-auto py-6">
            <h1 className="text-3xl font-semibold">User Dashboard</h1>
            <p className="text-base-content/70">Track your orders, payments, and profile.</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
                <Link to="/dashboard/orders" className="card bg-base-100 shadow">
                    <div className="card-body">
                        <h2 className="card-title">My Orders</h2>
                        <p className="text-sm text-base-content/70">
                            Pay, cancel, or track order status.
                        </p>
                    </div>
                </Link>
                <Link to="/dashboard/invoices" className="card bg-base-100 shadow">
                    <div className="card-body">
                        <h2 className="card-title">Invoices</h2>
                        <p className="text-sm text-base-content/70">
                            Review your payment history.
                        </p>
                    </div>
                </Link>
                <Link to="/dashboard/profile" className="card bg-base-100 shadow">
                    <div className="card-body">
                        <h2 className="card-title">My Profile</h2>
                        <p className="text-sm text-base-content/70">
                            Update your profile details.
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
