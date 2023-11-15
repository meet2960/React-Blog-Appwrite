import React, { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
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
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoute authentication>
              <Home />,
            </ProtectedRoute>
          ),
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
          element: (
            <ProtectedRoute authentication>
              <SelectedPost />,
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
};

export default AppRoutes;
