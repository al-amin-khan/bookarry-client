import { TrendingUp } from 'lucide-react';
import React from 'react';

const Newsletter = () => {
    return (
        <section className="py-20 w-11/12 mx-auto bg-linear-to-r from-primary to-accent text-white rounded-2xl">
            <div className="max-w-4xl mx-auto text-center">
                <TrendingUp className="w-16 h-16 mx-auto mb-6 animate-pulse" />
                <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
                <p className="text-xl mb-8 opacity-90">
                    Subscribe to our newsletter and get exclusive offers on new book releases
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center max-w-2xl mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="input input-lg flex-1 text-base-content"
                    />
                    <button className="btn btn-secondary btn-lg">Subscribe Now</button>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;