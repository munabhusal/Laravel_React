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
import Catagory from "./assets/views/Catagory";
import Tags from "./assets/views/Tags";
import Feeds from "./assets/views/Feeds";
import MyPost from "./assets/views/MyPost";
import MyPostForm from "./assets/views/MyPostForm";
import CataForm from "./assets/views/CataForm";
import TagForm from "./assets/views/TagForm";
import ReadMore from "./assets/views/ReadMore";
import AuthorFeeds from "./assets/views/AuthorFeeds";
import CatagoryFeeds from "./assets/views/CatagoryFeeds";
import TagFeeds from "./assets/views/TagFeeds";


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

            //Catagory
            {
                path: '/catagories',
                element: <Catagory/>
            },
            {
                path: '/catagory/new',
                element: <CataForm/>
            },
            {
                path: '/catagory/:id',
                element: <CataForm/>
            },

            //Tags
            {
                path: '/tags',
                element: <Tags/>
            },
            {
                path: '/tags/new',
                element: <TagForm/>
            },
            {
                path: '/tags/:id',
                element: <TagForm/>
            },

            //Feeds
            {
                path: '/feeds',
                element: <Feeds/>
            },
            {
                path: '/authorfeeds/:id',
                element: <AuthorFeeds/>
            },
            {
                path: '/catagoryfeeds/:id',
                element: <CatagoryFeeds/>
            },
            {
                path: '/tagfeeds/:id',
                element: <TagFeeds/>
            },
            
            //my post
            {
                path: '/mypost',
                element: <MyPost/>
            },
            {
                path: '/blogs/new',
                element: <MyPostForm/>
            },
            {
                path: '/blogs/:id',
                element: <MyPostForm/>
            },
            {
                path: '/blogs/readmore/:id',
                element: <ReadMore/>
            },

            //Profile
            {
                path: '/profile',
                element: <Profile/>
            },
        
            {
                path: '/',
                // element: <Navigate to="/users" />
                element: <Welcome/>

            },
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
        path: '*',
        element: <NotFound/>
    }

])

export default router;