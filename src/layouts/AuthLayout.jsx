import { Link, Outlet, useLocation } from 'react-router';
import loginSvg from '../assets/Login-amico.svg'
import signupSvg from '../assets/Signup-amico.svg'
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
                <div className="flex justify-center items-center w-11/12 mx-auto py-2">
                    <div className="flex-1 h-screen pt-10">
                        <Outlet />
                    </div>
                    <div className="flex-1 h-screen pl-20 justify-center items-center hidden md:block lg:block">
                        {
                            isLoginPage ?
                                <div className="flex justify-start items-center my-auto h-full">
                                    <img className='w-96' src={loginSvg} alt="Login" />
                                </div>
                                :
                                <div className="flex justify-start items-center my-auto h-full">
                                    <img className='w-96 flex justify-center items-center' src={signupSvg} alt="Sign Up" />
                                </div>
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