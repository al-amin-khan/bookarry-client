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
import ProtectedRoute from './../auth/ProtectedRoute';
import Orders from './../pages/Orders';
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentCanceled from "../pages/PaymentCanceled";
import AdminRoute from "../auth/AdminRoute";
import AddBook from "../pages/AddBook";
import Invoices from "../pages/Invoices";
import Profile from "../pages/Profile";


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
                element: <ProtectedRoute><BookDetail /></ProtectedRoute>
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
        path: 'dashboard/',
        Component: DashboardLayout,
        errorElement: <PageNotFound />,
        children: [
            {
                index: true,
                element: <ProtectedRoute><Orders /></ProtectedRoute>
            },
            {
                path: 'orders',
                element: <ProtectedRoute><Orders /></ProtectedRoute>
            },
            {
                path: 'payment-success',
                Component: PaymentSuccess
            },
            {
                path: 'payment-canceled',
                Component: PaymentCanceled
            },
            {
                path: 'invoices',
                element: <ProtectedRoute><Invoices /></ProtectedRoute>
            },
            {
                path: 'profile',
                element: <ProtectedRoute><Profile /></ProtectedRoute>
            },
            {
                path: 'add-book',
                element: (
                    <ProtectedRoute>
                        <AdminRoute>
                            <AddBook />
                        </AdminRoute>
                    </ProtectedRoute>
                )
            },
            {
                path: '*',
                Component: PageNotFound
            }
        ]
    }
]);

export default router;