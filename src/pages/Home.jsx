import { MapPin, Clock, Shield, Truck, Star, TrendingUp, Book} from 'lucide-react';
import HeroSlider from '../components/HeroSlider';
import LatestBooks from '../components/LatestBooks';
import Stat from '../components/Stat';
import WhyUs from '../components/WhyUs';
import Coverage from '../components/Coverage';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';

const Home = () => {

    

    return (
        <div className="min-h-screen bg-base-200">

            <HeroSlider />

            <LatestBooks />

            <Stat />

            <Coverage />

            <WhyUs />

            <Testimonials />

            <Newsletter />
            
        </div>
    );
};

export default Home;