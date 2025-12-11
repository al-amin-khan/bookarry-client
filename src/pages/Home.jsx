import { MapPin, Clock, Shield, Truck, Star, TrendingUp, Book} from 'lucide-react';
import HeroSlider from '../components/HeroSlider';
import LatestBooks from '../components/LatestBooks';

const Home = () => {

    // Cities with delivery coverage
    const cities = [
        { name: 'Dhaka', books: '5000+' },
        { name: 'Chittagong', books: '3000+' },
        { name: 'Sylhet', books: '2000+' },
        { name: 'Khulna', books: '1500+' },
        { name: 'Rajshahi', books: '1800+' },
        { name: 'Barisal', books: '1200+' }
    ];

    // Why choose us reasons
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

    // Statistics data
    const stats = [
        { value: '10,000+', label: 'Books Available' },
        { value: '5,000+', label: 'Happy Readers' },
        { value: '15+', label: 'Cities Covered' },
        { value: '99%', label: 'Satisfaction Rate' }
    ];

    

    return (
        <div className="min-h-screen bg-base-200">

            <HeroSlider />

            <LatestBooks />

            
            

            {/* Statistics Section - Animated */}
            <section className="py-20 px-4 bg-gradient-to-r from-primary to-secondary text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="text-center animate-bounce-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="text-5xl font-bold mb-2">{stat.value}</div>
                                <div className="text-xl opacity-90">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Coverage Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Delivery Coverage</h2>
                        <p className="text-lg text-base-content opacity-70">
                            We deliver books to major cities across the country
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="bg-base-200 p-8 rounded-lg">
                            <img
                                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800"
                                alt="Map"
                                className="w-full h-96 object-cover rounded-lg"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {cities.map((city, index) => (
                                <div
                                    key={index}
                                    className="bg-base-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <MapPin className="w-8 h-8 text-primary mb-3" />
                                    <h3 className="text-2xl font-bold mb-2">{city.name}</h3>
                                    <p className="text-base-content opacity-70">{city.books} books</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose BookCourier Section */}
            <section className="py-20 px-4 bg-base-200">
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

            {/* Testimonials Section */}
            <section className="py-20 px-4">
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

            {/* Newsletter Section - Animated */}
            <section className="py-20 px-4 bg-gradient-to-r from-primary to-accent text-white">
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
        </div>
    );
};

export default Home;