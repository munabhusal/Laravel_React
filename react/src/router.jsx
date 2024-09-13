import {createBrowserRouter, Navigate} from "react-router-dom";
import Signup from "./assets/views/Signup";
import Users from "./assets/views/Users";
import NotFound from "./assets/views/NotFound";
import Login from "./assets/views/Login";
import DefaultLayout from "./assets/components/DefaultLayout";
import GuestLayout from "./assets/components/GuestLayout";
import Dashboard from "./assets/views/Dashboard";
import UserForm from "./assets/views/UserForm";
import Welcome from "./assets/views/Welcome";
import Profile from "./assets/views/profile";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children:[
            {
                path: '/dashboard',
                element: <Dashboard/>
            },

            //Users
            {
                path: '/users',
                element: <Users/>
            },
            {
                path: '/users/new',
                element: <UserForm/>
            },
            {
                path: '/users/:id',
                element: <UserForm/>
            },

            //Profile
            {
                path: '/profile',
                element: <Profile/>
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children:[
            {
                path: '/login',
                element: <Login/>
            },
        
            {
                path: '/signup',
                element: <Signup/>
            }
        ]
    },
    
    {
        path: '/',
        // element: <Navigate to="/users" />
        element: <Welcome/>

    },

    {
        path: '*',
        element: <NotFound/>
    }

])

export default router;