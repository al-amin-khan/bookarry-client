import { useQuery } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import React from 'react';
import useAxiosPublic from '../hooks/useAxios';
import Loading from './Loading';
import Card from './Card';

const LatestBooks = () => {
    const axios = useAxiosPublic();

    const { data: latestBooks, isLoading, isError, error } = useQuery({
        queryKey: ['latestBooks'],
        queryFn: async () => {
            const res = await axios.get('/books/latest');
            return res.data.data;
        }
    })

    if (isError) {
        return <div className='text-error text-center text-lg'>Error: {error.message}</div>;
    }


    return (
        <section className="py-20 px-4 bg-base-200 w-11/12 mx-auto">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Latest Books</h2>
                    <p className="text-lg text-base-content opacity-70">
                        Discover our newest additions to the collection
                    </p>
                </div>
                {
                    isLoading ?
                        <Loading message="Loading latest books" />
                        :
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {latestBooks.map((book) => (
                                <Card key={book._id} book={book} />
                            ))}
                        </div>
                }
            </div>
        </section>
    );
};

export default LatestBooks;