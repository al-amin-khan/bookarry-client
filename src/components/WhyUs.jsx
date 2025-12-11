import { Book, Clock, Shield, Truck } from 'lucide-react';
import React from 'react';

const WhyUs = () => {
    const features = [
        {
            icon: <Truck className="w-12 h-12" />,
            title: 'Fast Delivery',
            description: 'Get your books delivered within 2-3 business days directly to your doorstep.'
        },
        {
            icon: <Shield className="w-12 h-12" />,
            title: 'Secure Payment',
            description: 'Your transactions are protected with industry-standard encryption and security.'
        },
        {
            icon: <Book className="w-12 h-12" />,
            title: 'Vast Collection',
            description: 'Access thousands of books across various genres, subjects, and categories.'
        },
        {
            icon: <Clock className="w-12 h-12" />,
            title: '24/7 Support',
            description: 'Our customer service team is always available to help you with any queries.'
        }
    ];

    return (
        <section className="py-20 bg-base-200 w-11/12 mx-auto">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Why Choose BookCourier?</h2>
                    <p className="text-lg text-base-content opacity-70">
                        Experience the best book delivery service in the country
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                        >
                            <div className="card-body items-center text-center">
                                <div className="text-primary mb-4">{feature.icon}</div>
                                <h3 className="card-title text-xl mb-2">{feature.title}</h3>
                                <p className="text-base-content opacity-70">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyUs;