import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useAxiosSecure from '../hooks/useAxiosSecure';

const AddBook = () => {
    const axiosSecure = useAxiosSecure();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            title: '',
            author: '',
            genre: '',
            price: '',
            rating: 5,
            published_year: '',
            page_count: '',
            isbn_13: '',
            image: '',
            long_description: '',
            status: 'published',
        },
    });

    const handlePublish = async (data) => {
        const payload = {
            title: data.title.trim(),
            author: data.author.trim(),
            genre: data.genre.trim(),
            price: Number(data.price),
            rating: Number(data.rating),
            published_year: Number(data.published_year),
            page_count: Number(data.page_count),
            isbn_13: data.isbn_13.trim(),
            image: data.image.trim(),
            long_description: data.long_description.trim(),
            status: data.status,
            created_at: new Date(),
            updated_at: new Date(),
        };

        try {
            const res = await axiosSecure.post('/books', payload);
            if (res.data?.success) {
                toast.success('Book published successfully.');
            } else {
                toast.success('Book published.');
            }
            reset();
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="w-11/12 mx-auto py-8">
            <div className="w-full max-w-4xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-semibold">Publish a New Book</h1>
                    <p className="text-base-content/70">
                        Add book details so readers can discover and order it.
                    </p>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit(handlePublish)}>
                            <label className="form-control w-full">
                                <span className="label-text text-sm font-medium">Title</span>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    placeholder="Book title"
                                    {...register('title', { required: 'Title is required' })}
                                />
                                {errors.title && (
                                    <span className="mt-1 text-xs text-error">{errors.title.message}</span>
                                )}
                            </label>

                            <label className="form-control w-full">
                                <span className="label-text text-sm font-medium">Author</span>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    placeholder="Author name"
                                    {...register('author', { required: 'Author is required' })}
                                />
                                {errors.author && (
                                    <span className="mt-1 text-xs text-error">{errors.author.message}</span>
                                )}
                            </label>

                            <label className="form-control w-full">
                                <span className="label-text text-sm font-medium">Genre</span>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    placeholder="Fantasy, Mystery, ..."
                                    {...register('genre', { required: 'Genre is required' })}
                                />
                                {errors.genre && (
                                    <span className="mt-1 text-xs text-error">{errors.genre.message}</span>
                                )}
                            </label>

                            <label className="form-control w-full">
                                <span className="label-text text-sm font-medium">Price</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    className="input input-bordered w-full"
                                    placeholder="19.99"
                                    {...register('price', {
                                        required: 'Price is required',
                                        min: { value: 0, message: 'Price must be positive' },
                                    })}
                                />
                                {errors.price && (
                                    <span className="mt-1 text-xs text-error">{errors.price.message}</span>
                                )}
                            </label>

                            <label className="form-control w-full">
                                <span className="label-text text-sm font-medium">Rating (1-5)</span>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="1"
                                    max="5"
                                    className="input input-bordered w-full"
                                    placeholder="4.5"
                                    {...register('rating', {
                                        required: 'Rating is required',
                                        min: { value: 1, message: 'Minimum rating is 1' },
                                        max: { value: 5, message: 'Maximum rating is 5' },
                                    })}
                                />
                                {errors.rating && (
                                    <span className="mt-1 text-xs text-error">{errors.rating.message}</span>
                                )}
                            </label>

                            <label className="form-control w-full">
                                <span className="label-text text-sm font-medium">Published Year</span>
                                <input
                                    type="number"
                                    min="1000"
                                    max="2100"
                                    className="input input-bordered w-full"
                                    placeholder="2024"
                                    {...register('published_year', {
                                        required: 'Published year is required',
                                        min: { value: 1000, message: 'Enter a valid year' },
                                    })}
                                />
                                {errors.published_year && (
                                    <span className="mt-1 text-xs text-error">{errors.published_year.message}</span>
                                )}
                            </label>

                            <label className="form-control w-full">
                                <span className="label-text text-sm font-medium">Status</span>
                                <select
                                    className="select select-bordered w-full"
                                    {...register('status', { required: 'Status is required' })}
                                >
                                    <option value="published">Published</option>
                                    <option value="unpublished">Unpublished</option>
                                </select>
                                {errors.status && (
                                    <span className="mt-1 text-xs text-error">{errors.status.message}</span>
                                )}
                            </label>

                            <label className="form-control w-full">
                                <span className="label-text text-sm font-medium">Page Count</span>
                                <input
                                    type="number"
                                    min="1"
                                    className="input input-bordered w-full"
                                    placeholder="320"
                                    {...register('page_count', {
                                        required: 'Page count is required',
                                        min: { value: 1, message: 'Page count must be at least 1' },
                                    })}
                                />
                                {errors.page_count && (
                                    <span className="mt-1 text-xs text-error">{errors.page_count.message}</span>
                                )}
                            </label>

                            <label className="form-control w-full">
                                <span className="label-text text-sm font-medium">ISBN-13</span>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    placeholder="9781234567890"
                                    {...register('isbn_13', {
                                        required: 'ISBN-13 is required',
                                        pattern: {
                                            value: /^\d{13}$/,
                                            message: 'ISBN-13 must be 13 digits',
                                        },
                                    })}
                                />
                                {errors.isbn_13 && (
                                    <span className="mt-1 text-xs text-error">{errors.isbn_13.message}</span>
                                )}
                            </label>

                            <label className="form-control w-full md:col-span-2">
                                <span className="label-text text-sm font-medium">Cover Image URL</span>
                                <input
                                    type="url"
                                    className="input input-bordered w-full"
                                    placeholder="https://example.com/cover.jpg"
                                    {...register('image', { required: 'Image URL is required' })}
                                />
                                {errors.image && (
                                    <span className="mt-1 text-xs text-error">{errors.image.message}</span>
                                )}
                            </label>

                            <label className="form-control w-full md:col-span-2">
                                <span className="label-text text-sm font-medium">Description</span>
                                <textarea
                                    className="textarea textarea-bordered w-full min-h-32"
                                    placeholder="Write a brief summary of the book..."
                                    {...register('long_description', {
                                        required: 'Description is required',
                                        minLength: { value: 20, message: 'Description is too short' },
                                    })}
                                />
                                {errors.long_description && (
                                    <span className="mt-1 text-xs text-error">{errors.long_description.message}</span>
                                )}
                            </label>

                            <div className="flex flex-wrap gap-3 md:col-span-2">
                                <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Publishing...' : 'Publish Book'}
                                </button>
                                <button className="btn btn-ghost" type="button" onClick={() => reset()} disabled={isSubmitting}>
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBook;
