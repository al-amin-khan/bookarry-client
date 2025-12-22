import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { BookOpen, ClipboardList, Settings, User, Users } from 'lucide-react';
import { FaFileInvoice } from 'react-icons/fa';
import useRole from '../hooks/useRole';

const DashboardLayout = () => {

    const { role, isUserRoleLoading } = useRole();
    const activeRole = role || 'user';

    const navLinksByRole = {
        user: [
            { to: '/dashboard/orders', label: 'My Orders', icon: ClipboardList, tip: 'Orders' },
            { to: '/dashboard/invoices', label: 'Invoices', icon: FaFileInvoice, tip: 'Invoices' },
            { to: '/dashboard/profile', label: 'My Profile', icon: User, tip: 'Profile' },
        ],
        librarian: [
            { to: '/dashboard/add-book', label: 'Add Book', icon: BookOpen, tip: 'Add Book' },
            { to: '/dashboard/my-books', label: 'My Books', icon: BookOpen, tip: 'My Books' },
            { to: '/dashboard/librarian-orders', label: 'Orders', icon: ClipboardList, tip: 'Orders' },
        ],
        admin: [
            { to: '/dashboard/all-users', label: 'All Users', icon: Users, tip: 'Users' },
            { to: '/dashboard/manage-books', label: 'Manage Books', icon: Settings, tip: 'Manage Books' },
            { to: '/dashboard/profile', label: 'My Profile', icon: User, tip: 'Profile' },
        ],
    };

    const navLinks = navLinksByRole[activeRole] || navLinksByRole.user;

    return (
        <div className='bg-base-200'>
            <main className='mx-auto bg-base-100'>
                <div className="drawer md:drawer-open lg:drawer-open">
                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Navbar */}
                        <nav className="navbar w-full bg-base-300">
                            <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                {/* Sidebar toggle icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                            </label>
                            <div className="px-4 font-semibold">Welcome to Dashboard </div>
                        </nav>
                        {/* Page content here */}
                        <Outlet />
                    </div>

                    <div className="drawer-side is-drawer-close:overflow-visible">
                        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-28 is-drawer-open:w-64">
                            {/* Sidebar content here */}
                            <ul className="menu w-full grow">
                                {/* List item */}
                                <li>
                                    <NavLink to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                        {/* Home icon */}
                                        <div className='flex flex-col items-center justify-center'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-5"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                        </div>
                                        <span className="is-drawer-close:hidden">Home</span>
                                    </NavLink>
                                </li>
                                {isUserRoleLoading ? (
                                    <li className="px-4 py-2 text-sm text-base-content/60">
                                        Loading menu...
                                    </li>
                                ) : (
                                    navLinks.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <li key={item.to}>
                                                <NavLink
                                                    to={item.to}
                                                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                                    data-tip={item.tip}
                                                >
                                                    <div className="flex flex-col items-center justify-center">
                                                        <Icon size={20} />
                                                    </div>
                                                    <span className="is-drawer-close:hidden">{item.label}</span>
                                                </NavLink>
                                            </li>
                                        );
                                    })
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
