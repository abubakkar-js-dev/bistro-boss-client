import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Carts from "../pages/Dashboard/Carts/Carts";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/DashboardLayout";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import Cart from "../pages/Dashboard/Carts/Carts";
import AddItems from "../pages/Dashboard/AddItems/AddItems";
import AdminRoutes from "./AdminRoutes";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: 'menu',
          element: <Menu />
        },
        {
          path: 'order/:category',
          element: <Order />
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'register',
          element: <Register />
        },
      ]
    },
    {
      path: "/dashboard",
      element: <PrivateRoute><Dashboard /></PrivateRoute>,
      children: [
        // user routes
        {
          path: "carts",
          element: <Cart />,
        },
        // admin routes
        {
          path: 'all-users',
          element: <AdminRoutes><AllUsers /></AdminRoutes>  
        },
        {
         path: 'add-items',
         element: <AdminRoutes><AddItems /></AdminRoutes>
        },
        {
          path: 'manage-items',
          element: <AdminRoutes><ManageItems /></AdminRoutes>
        }
      ]
    }
  ]);