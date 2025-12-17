import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import Books from "../pages/Books";
import PageNotFound from "../pages/PageNotFound";
import BookDetail from "../pages/BookDetail";
import AuthLayout from './../layouts/AuthLayout';
import Register from "../pages/Register";
import Login from "../pages/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from './../pages/Dashboard';


const router = createBrowserRouter([
    {
        path: '/',
        HydrateFallback: true,
        errorElement: <PageNotFound />,
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/books',
                Component: Books
            },
            {
                path: '/books/:id',
                Component: BookDetail
            },
            {
                path: '*',
                Component: PageNotFound
            }
        ]
    },
    {
        path: 'auth/',
        Component: AuthLayout,
        errorElement: <PageNotFound />,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            },
            {
                path: '*',
                Component: PageNotFound
            }
        ]
    },
    {
        path: 'dashboard',
        Component: DashboardLayout,
        errorElement: <PageNotFound />,
        children: [
            {
                index: true,
                Component: Dashboard
            },
            {
                path: '*',
                Component: PageNotFound
            }
        ]
    }
]);

export default router;