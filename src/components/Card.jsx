import { Star } from 'lucide-react';
import React from 'react';

const Card = ({ book }) => {
    return (
        <div>
            <div
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
                <figure className="h-45 overflow-hidden">
                    <img
                        src={book.image}
                        alt={book.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                </figure>
                <div className="card-body">
                    <h3 className="card-title text-lg">{book.title}</h3>
                    <p className="text-sm opacity-70">by {book.author}</p>
                    <div className="flex items-center gap-0 my-0">
                        <div className="flex items-center">
                            {
                                Array.from({ length: book.rating }).map((_, index) => (
                                    <Star key={index} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))
                            }
                        </div>

                    </div>
                    <div className="card-actions justify-between">
                        <span className="text-lg font-bold text-primary">${book.price}</span>
                        <button className="btn btn-primary btn-sm">Order Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;