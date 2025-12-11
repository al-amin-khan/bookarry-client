import { Link, NavLink, useLocation } from 'react-router';
import BrandLogo from './BrandLogo';
import useAuth from '../hooks/useAuth';
import { LogOut, Moon, Sun, UserIcon } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import Loading from './Loading';
import { useTheme } from './../hooks/useTheme';

const Navbar = () => {
    const navItems = [
        { id: 1, name: 'Services', path: '/services', protected: false },
        { id: 2, name: 'Coverage', path: '/coverage', protected: false },
        { id: 3, name: 'About Us', path: '/about', protected: false },
        { id: 4, name: 'Pricing', path: '/pricing', protected: false },
        { id: 5, name: 'Be a Rider', path: '/be-a-rider', protected: true },
    ]

    const { theme, toggleTheme } = useTheme();

    const { user, loading, logOut } = useAuth();
    const isLoggedIn = user?.isLoggedIn;

    const location = useLocation();
    const isLoginPage = location.pathname === '/auth/login';

    if (loading) {
        return <Loading message="Authenticating" />
    }

    const handleLogOut = () => {
        logOut()
            .then(res =>
                console.log(res),
                console.log('Logged out successfully')
            )
            .catch(err =>
                console.error('Error logging out:', err)
            )
    };

    return (
        <div className="navbar bg-base-100 shadow-sm rounded-xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {
                            navItems.map(item =>
                                <li key={item.id} className='text-secondary-content'>
                                    <NavLink
                                        to={item.path}
                                        href={item.path}
                                        className={({ isActive }) => isActive ? 'active underline underline-offset-5 decoration-[#CAEB66] decoration-2' : ''}
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>)
                        }
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost text-xl">
                    <BrandLogo />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        navItems.map(item =>
                            <li key={item.id}>
                                <NavLink
                                    to={item.path}
                                    href={item.path}
                                    className={({ isActive }) => isActive ? 'active underline underline-offset-5 decoration-[#CAEB66] decoration-2' : ''}
                                >
                                    {item.name}
                                </NavLink>
                            </li>)
                    }
                </ul>
            </div>
            <div className="navbar-end">
                <p className={`text-sm text-secondary hidden lg:block mr-1 border-primary rounded-md py-2 px-2 ${user ? 'border' : 'hidden'}`}>
                    {`${user ? user.displayName : ""}`}
                </p>


                {isLoggedIn ? (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-9 rounded-full ring-2 ring-primary/40">
                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt={user.name}
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-base-200">
                                        <UserIcon size={18} />
                                    </div>
                                )}
                            </div>
                        </label>
                        <ul
                            tabIndex={0}
                            className="mt-3 w-56 menu menu-sm dropdown-content bg-base-100 rounded-box shadow-lg border border-base-200"
                        >
                            <li className="menu-title px-3 pt-3 pb-1">
                                <span className="text-xs uppercase tracking-wide text-base-content/60">
                                    Signed in as
                                </span>
                                <span className="text-sm font-semibold truncate">
                                    {user.name}
                                </span>
                                <span className="text-xs text-base-content/60 truncate">
                                    {user.email}
                                </span>
                            </li>
                            <div className="divider my-1" />
                            <li>
                                <Link to="/dashboard" className="flex items-center gap-2">
                                    <DashboardLayout size={16} />
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    className="flex items-center gap-2"
                                    onClick={handleLogOut}
                                >
                                    <LogOut size={16} />
                                    <span>Sign out</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        {
                            isLoginPage ? (
                                <Link to="/register" className="btn btn-primary">
                                    Register
                                </Link>
                            ) : (
                                <Link to="/login" className="btn btn-primary">
                                    Login
                                </Link>
                            )
                        }
                    </div>
                )}

                <button
                    className="btn btn-ghost btn-square ml-2"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                >
                    {theme === "bookarry-light" ? <Moon size={18} color='teal' /> : <Sun size={18} color='yellow' />}
                </button>
            </div>
        </div>
    );
};

export default Navbar;
