import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RootLayout = () => {
    return (
        <div className='bg-base-200'>
            <nav className='w-11/12 mx-auto pt-3'>
                <Navbar />
            </nav>

            <main>
                <Outlet />
            </main>

            <footer className='pb-2'>
                <Footer />
            </footer>
        </div>
    );
};

export default RootLayout;