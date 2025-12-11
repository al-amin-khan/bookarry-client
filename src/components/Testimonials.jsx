import { Star } from "lucide-react";

const Testimonials = () => {
    return (
        <section className="py-20 w-11/12 mx-auto">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">What Our Readers Say</h2>
                    <p className="text-lg text-base-content opacity-70">
                        Real experiences from our satisfied customers
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            name: 'Sarah Ahmed',
                            role: 'Student',
                            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
                            review: 'BookCourier has made my academic life so much easier. I can get all my textbooks delivered without the hassle of going to the library.'
                        },
                        {
                            name: 'Karim Rahman',
                            role: 'Researcher',
                            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
                            review: 'The collection is vast and the delivery is super fast. I highly recommend BookCourier to anyone who loves reading.'
                        },
                        {
                            name: 'Nadia Khan',
                            role: 'Book Enthusiast',
                            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
                            review: 'Amazing service! The books arrive in perfect condition and the customer support is top-notch.'
                        }
                    ].map((testimonial, index) => (
                        <div
                            key={index}
                            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
                        >
                            <div className="card-body items-center text-center">
                                <div className="avatar mb-4">
                                    <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={testimonial.image} alt={testimonial.name} />
                                    </div>
                                </div>
                                <div className="flex mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-base-content opacity-80 mb-4 italic">"{testimonial.review}"</p>
                                <h3 className="font-bold text-lg">{testimonial.name}</h3>
                                <p className="text-sm opacity-70">{testimonial.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;