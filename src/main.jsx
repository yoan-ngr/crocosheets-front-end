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

const router = createBrowserRouter([
    {
        path: "/",
        element: <div><Navbar />Hello world!<Outlet/></div>,
        children : [
            {
                path: "/",
                element: <div>Accueil</div>,
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
                element: <Dashboard />,
            },
            {
                path: "/sheet",
                element: <Sheet />,
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
