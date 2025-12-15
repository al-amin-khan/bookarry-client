import { useEffect, useState } from "react";
import Card from "../components/Card";
import Loading from "../components/Loading";
import useAxiosPublic from "../hooks/useAxios";
import { useQuery } from '@tanstack/react-query';

const Books = () => {
    const axios = useAxiosPublic();

    const [filteredBooks, setFilteredBooks] = useState([]);

    const { data: books, isLoading, isError, error } = useQuery({
        queryKey: ['books'],
        queryFn: async () => {
            const res = await axios.get('/books');
            return res.data.data;
        }
    })

    useEffect(() => {
        setFilteredBooks(books);
    }, [books])

    if (isError) {
        return <div className='text-error text-center text-lg'>Error: {error.message}</div>;
    }

    if (isLoading) {
        return <Loading message="Loading books" />;
    }

    const handleBookSearch = (e) => {
        e.preventDefault();
        const rawInput = e.target.value;
        const search = rawInput.toLowerCase().trim();
        console.log(search);

        const filteredBooks = books?.filter(book => book.title.toLowerCase().includes(search.toLowerCase()));

        setFilteredBooks(filteredBooks);
    }

    return (
        <div className="w-11/12 mx-auto py-5">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Find Your Book</h2>
                <p className="text-lg text-base-content opacity-70">
                    Discover our all books and get them delivered right to your doorstep
                </p>
            </div>
            <div className="text-end py-2">
                <input type="text" placeholder="Search by title" className="input input-bordered w-full max-w-xs"
                    onChange={handleBookSearch}
                />
            </div>

            <div className="grid grid-cols-4 gap-4">
                {
                    filteredBooks?.length === 0 ?
                        (
                            <div className="text-error text-center text-lg">No books found</div>
                        )
                        :
                        (
                            filteredBooks?.map(book => <Card key={book._id} book={book} />)
                        )
                }
            </div>
        </div >
    );
};

export default Books;