import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import Loading from '../components/Loading';
import useAxiosPublic from '../hooks/useAxios';
import { Link } from "react-router";
import { Star, BookOpen, Calendar, FileText, Tag, Hash } from "lucide-react";
import { format } from './../../node_modules/date-fns/format';

const BookDetail = () => {
    const { id } = useParams();

    const axios = useAxiosPublic();

    const { data: book, isLoading, isError, error } = useQuery({
        queryKey: ['book', id],
        queryFn: async () => {
            const res = await axios.get(`/books/${id}`);
            return res.data.data;
        }
    })

    const { title, author, published_year, genre, price, rating, image, long_description, page_count, isbn_13, created_at, updated_at } = book || {};

    const roundedRating = Math.round(rating || 0);
    const createdDate = created_at ? new Date(created_at) : null;
    const updatedDate = updated_at ? new Date(updated_at) : null;

    if (isError) {
        return <div className='text-error text-center text-lg'>Error: {error.message}</div>;
    }

    if (isLoading) {
        return <Loading message="Loading books detail" />;
    }

    return (
        <section className="max-w-5xl mx-auto px-4 py-10">
            <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-start">
                <div className="relative w-full">
                    <div className="aspect-3/4 overflow-hidden rounded-2xl shadow-xl bg-base-200">
                        <img
                            src={image}
                            alt={title}
                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                    </div>

                    <div className="absolute left-3 top-3">
                        <span className="badge badge-primary gap-1 text-[11px]">
                            <BookOpen size={14} />
                            {genre?.split(",")[0] || "Book"}
                        </span>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold leading-tight">
                            {title}
                        </h1>
                        <p className="mt-2 text-sm md:text-base text-base-content/70">
                            by{" "}
                            <span className="font-medium text-base-content">
                                {author}
                            </span>
                        </p>
                    </div>

                    <div className="flex flex-raw items-center gap-4 ">
                        <div className="flex items-center gap-2 ">
                            <div className="flex items-center">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        className={
                                            i < roundedRating
                                                ? "fill-warning text-warning"
                                                : "text-base-300"
                                        }
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-base-content/70">
                                {rating?.toFixed(1)} / 5.0
                            </span>
                        </div>
                    </div>
                    <div className="text-xl md:text-xl lg:text-2xl font-bold text-primary">
                        ${price?.toFixed(2)}
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
                        <div className="flex items-center gap-2 bg-base-200 rounded-xl px-3 py-2">
                            <Calendar size={16} className="text-base-content/70" />
                            <div>
                                <p className="text-[11px] uppercase tracking-wide text-base-content/60">
                                    Published
                                </p>
                                <p className="font-medium">{published_year}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 bg-base-200 rounded-xl px-3 py-2">
                            <FileText size={16} className="text-base-content/70" />
                            <div>
                                <p className="text-[11px] uppercase tracking-wide text-base-content/60">
                                    Pages
                                </p>
                                <p className="font-medium">{page_count}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 bg-base-200 rounded-xl px-3 py-2 col-span-2 md:col-span-1">
                            <Tag size={16} className="text-base-content/70" />
                            <div>
                                <p className="text-[11px] uppercase tracking-wide text-base-content/60">
                                    Genre
                                </p>
                                <p className="font-medium line-clamp-2">{genre}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 bg-base-200 rounded-xl px-3 py-2">
                            <Hash size={16} className="text-base-content/70" />
                            <div>
                                <p className="text-[11px] uppercase tracking-wide text-base-content/60">
                                    ISBN-13
                                </p>
                                <p className="font-mono text-[11px] md:text-xs">{isbn_13}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-base md:text-lg font-semibold">
                            About this book
                        </h2>
                        <p className="text-sm md:text-base leading-relaxed text-base-content/80">
                            {long_description}
                        </p>
                    </div>


                    <div className="flex flex-wrap gap-3 pt-2">
                        <Link to="/order" className="btn btn-primary">
                            Request from Library
                        </Link>
                        <button className="btn btn-outline btn-secondary">
                            Add to Wishlist
                        </button>
                    </div>

                    <div className="pt-0 text-[11px] text-base-content/60 space-y-1">
                        {createdDate && (
                            <p>
                                Added to catalog:{" "}
                                {format(createdDate, "MMM dd, yyyy.")}
                            </p>
                        )}
                        {updatedDate && (
                            <p>
                                Last updated:{" "}
                                {format(updatedDate, "MMM dd, yyyy.")}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookDetail;