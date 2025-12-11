import { Link, Outlet } from 'react-router';
import authImage from '../assets/authImage.png';
import BrandLogo from '../components/BrandLogo';

const AuthLayout = () => {
    return (
        <div>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="flex-1 bg-base-100 h-screen">
                    <nav className="navbar-start w-10/12 mx-auto py-4 pl-5">
                        <Link to="/"><BrandLogo /></Link>
                    </nav>
                    <Outlet />
                </div>
                <div className="flex-1 hidden md:block lg:block">
                    <img src={authImage} alt="Authentication Image" />
                </div>
            </div>

        </div>
    );
};

export default AuthLayout;