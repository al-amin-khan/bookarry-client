import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Dashboard = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        data: books = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ['librarianBooks', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/books?email=${user.email}`);
            return res.data.data || [];
        },
    });

    const handleUnpublish = async (bookId) => {
        try {
            const res = await axiosSecure.patch(`/books/${bookId}`, {
                status: 'unpublished',
                updated_at: new Date(),
            });
            if (res.data?.success) {
                toast.success('Book unpublished successfully.');
            } else {
                toast.success('Book status updated.');
            }
            refetch();
        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
        }
    };

    if (isError) {
        return <div className="text-center text-error">Error: {error.message}</div>;
    }

    return (
        <div className="w-11/12 mx-auto py-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-semibold">Librarian Dashboard</h1>
                    <p className="text-base-content/70">Manage the books you have published.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Link to="/dashboard/add-book" className="btn btn-primary">
                        Add Book
                    </Link>
                    <a href="#librarian-books" className="btn btn-ghost">
                        View My Books
                    </a>
                </div>
            </div>

            <div className="mt-8" id="librarian-books">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">My Books</h2>
                </div>
                <div className="overflow-x-auto mt-4">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Book Name</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="text-center animate-pulse text-3xl">
                                        Loading...
                                    </td>
                                </tr>
                            ) : books.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center text-base-content/70">
                                        No books found. Publish your first one.
                                    </td>
                                </tr>
                            ) : (
                                books.map((book, index) => (
                                    <tr key={book._id}>
                                        <th>{index + 1}</th>
                                        <td>
                                            <div className="h-12 w-10 overflow-hidden rounded-md bg-base-200">
                                                <img
                                                    src={book.image}
                                                    alt={book.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="font-medium">{book.title}</td>
                                        <td>
                                            <span
                                                className={`badge ${
                                                    book.status === 'published'
                                                        ? 'badge-success'
                                                        : 'badge-ghost'
                                                }`}
                                            >
                                                {book.status || 'published'}
                                            </span>
                                        </td>
                                        <td className="flex flex-wrap gap-2">
                                            <Link
                                                to={`/dashboard/books/${book._id}/edit`}
                                                className="btn btn-xs btn-outline"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                type="button"
                                                className="btn btn-xs btn-warning"
                                                disabled={book.status === 'unpublished'}
                                                onClick={() => handleUnpublish(book._id)}
                                            >
                                                Unpublish
                                            </button>
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

export default Dashboard;
