import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/Home";
import NoteForm from "../pages/NoteForm";
import NoteDetail from "../pages/NoteDetail";
import Layout from "../layout/Layout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function index() {
  let { authReady, user } = useContext(AuthContext);
  let isAuthenticated = !!user;
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: isAuthenticated ? <Home /> : <Navigate to="/login" />,
        },
        {
          path: "/home",
          element: isAuthenticated ? <Home /> : <Navigate to="/login" />,
        },
        {
          path: "/writenote",
          element: isAuthenticated ? <NoteForm /> : <Navigate to="/login" />,
        },
        {
          path: "/editnote/:id",
          element: isAuthenticated ? <NoteForm /> : <Navigate to="/login" />,
        },
        {
          path: "/notes/:id",
          element: isAuthenticated ? <NoteDetail /> : <Navigate to="/login" />,
        },
        {
          path: "/register",
          element: !isAuthenticated ? <Register /> : <Navigate to="/" />,
        },
        {
          path: "/login",
          element: !isAuthenticated ? <Login /> : <Navigate to="/" />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return authReady && <RouterProvider router={router} />;
}
