import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';

const MyWishlist = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        data: wishlist = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['wishlist', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/wishlist?email=${user.email}`);
            return res.data?.data || res.data || [];
        },
    });

    if (isError) {
        return <div className="text-center text-error">Error: {error.message}</div>;
    }

    console.log(wishlist[0]);

    if (isLoading) {
        return (
            <div className="text-center py-3">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <p className="mt-2 text-gray-600">Loading wishlist...</p>
            </div>
        );
    }

    return (
        <div className="w-11/12 mx-auto py-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-semibold">My Wishlist</h1>
                    <p className="text-base-content/70">Books you want to read later.</p>
                </div>
            </div>

            <div className="mt-6 rounded-xl border border-base-200 bg-base-100 p-6">
                <div className="overflow-x-auto">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Book Name</th>
                                <th>Author</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="text-center animate-pulse text-3xl">
                                        Loading...
                                    </td>
                                </tr>
                            ) : wishlist.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center text-base-content/70">
                                        No wishlisted books yet.
                                    </td>
                                </tr>
                            ) : (
                                wishlist.map((book, index) => (
                                    <tr key={book._id || `${book._id}-${index}`}>
                                        <th>{index + 1}</th>
                                        <td>
                                            <div className="h-12 w-10 overflow-hidden rounded-md bg-base-200">
                                                <img
                                                    src={book.book?.image}
                                                    alt={book.book?.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="font-medium">{book.book?.title}</td>
                                        <td>{book.book?.author}</td>
                                        <td>{book.book?.price ? `$${book.book?.price}` : '--'}</td>
                                        <td>
                                            <Link
                                                to={`/books/${book.book_id || book.bookId || book._id}`}
                                                className="btn btn-xs btn-outline"
                                            >
                                                View
                                            </Link>
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

export default MyWishlist;
