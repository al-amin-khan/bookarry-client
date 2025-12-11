import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";


const router = createBrowserRouter([
    {
        path: '/',
        HydrateFallback: true,
        Component: RootLayout,
        children: [
            {
                path: '/',
                element: <Home />
            }
        ]
    }
]);

export default router;