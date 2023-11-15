import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { login, logout } from "../features/auth/authSlice";
import {
  BrowserRouter,
  Routes,
  Route,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../pages/Home/Home";
import Register from "../pages/Signup/Register";
import Login from "../pages/Login/Login";
import AllPost from "../pages/AllPost/AllPost";
import AddPost from "../pages/AddPost/AddPost";
import EditPost from "../pages/EditPost/EditPost";
import SelectedPost from "../pages/SelectedPost/SelectedPost";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/all-posts",
          element: (
            <ProtectedRoute authentication>
              <AllPost />
            </ProtectedRoute>
          ),
        },
        {
          path: "/add-post",
          element: (
            <ProtectedRoute authentication>
              <AddPost />
            </ProtectedRoute>
          ),
        },
        {
          path: "/edit-post/:slug",
          element: (
            <ProtectedRoute authentication>
              <EditPost />
            </ProtectedRoute>
          ),
        },
        {
          path: "/post/:slug",
          element: <SelectedPost />,
        },
      ],
    },
    {
      path: "/login",
      element: (
        <ProtectedRoute authentication={false}>
          <Login />
        </ProtectedRoute>
      ),
    },

    {
      path: "/signup",
      element: (
        <ProtectedRoute authentication={false}>
          <Register />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <React.Fragment>
      <RouterProvider router={router} />
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter> */}
    </React.Fragment>
  );
};

export default AppRoutes;
