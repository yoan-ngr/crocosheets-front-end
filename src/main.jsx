import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
    createBrowserRouter, Outlet,
    RouterProvider,
} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Sheet from "./pages/Sheet";
import Home from "./pages/Home.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Profile from "./pages/Profile.jsx";
import {CookiesProvider} from "react-cookie";
import LoggedRoute from "./components/LoggedRoute.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div><Navbar /><Outlet/></div>,
        errorElement: <div><Navbar /><ErrorPage/></div>,
        children : [
            {
                path: "/",
                element: <div><Home /></div>,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/dashboard",
                element: <LoggedRoute element={<Dashboard />} />,
            },
            {
                path: "/sheet",
                element: <LoggedRoute element={<Sheet/>} />,
            },
            {
                path: "/profile",
                element: <LoggedRoute element={<Profile/>} />,
            },
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
          <RouterProvider router={router} />
      </CookiesProvider>
  </React.StrictMode>,
)
