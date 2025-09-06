// client/src/router/index.tsx

import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import EventsPage from "../pages/EventsPage"; // <-- Import
import CreateEventPage from "../pages/CreateEventPage"; // <-- Import

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><App /></ProtectedRoute>,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/events",
    element: <ProtectedRoute><EventsPage /></ProtectedRoute>,
  },
  {
    path: "/events/create",
    element: <ProtectedRoute><CreateEventPage /></ProtectedRoute>,
  },
]);