import { Link, Outlet, useLocation } from 'react-router';
import loginSvg from '../assets/Login-amico.svg'
import signupSvg from '../assets/Signup-amico.svg'
import BrandLogo from '../components/BrandLogo';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AuthLayout = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/auth/login';

    return (
        <div className='bg-base-200 pt-3'>
            <nav className='w-11/12 mx-auto'>
                <Navbar />
            </nav>
            <div className='bg-base-200'>
                <div className="flex justify-center items-center w-11/12 mx-auto">
                    <div className="flex-1 h-[80vh] pt-10">
                        <Outlet />
                    </div>
                    <div className="flex-1 hidden md:block lg:block">
                        {
                            isLoginPage ?
                                <img className='w-96' src={loginSvg} alt="Login" />
                                :
                                <img className='w-96' src={signupSvg} alt="Sign Up" />
                        }
                    </div>
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default AuthLayout;