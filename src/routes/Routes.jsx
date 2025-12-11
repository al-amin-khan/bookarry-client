import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";


const router = createBrowserRouter([
    {
        path: '/',
        HydrateFallback: true,
        Component: RootLayout,
        children: [
            {
                path: '/',
                element: <h1>Home</h1>
            }
        ]
    }
]);

export default router;