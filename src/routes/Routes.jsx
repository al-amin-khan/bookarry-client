import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import Books from "../pages/Books";
import PageNotFound from "../pages/PageNotFound";


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
                path: '*',
                Component: PageNotFound
            }
        ]
    }
]);

export default router;