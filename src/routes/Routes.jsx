import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import Books from "../pages/Books";
import PageNotFound from "../pages/PageNotFound";
import BookDetail from "../pages/BookDetail";


const router = createBrowserRouter([
    {
        path: '/',
        HydrateFallback: true,
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
    }
]);

export default router;