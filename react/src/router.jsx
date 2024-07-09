import {createBrowserRouter} from "react-router-dom";
import Signup from "./assets/views/Signup";
import User from "./assets/views/Users";
import NotFound from "./assets/views/NotFound";
import Login from "./assets/views/Login";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login/>
    },

    {
        path: '/signup',
        element: <Signup/>
    },

    {
        path: '*',
        element: <NotFound/>
    },

])

export default router;