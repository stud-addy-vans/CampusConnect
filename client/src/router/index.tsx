// client/src/router/index.tsx

import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import EventsPage from "../pages/EventsPage";
import CreateEventPage from "../pages/CreateEventPage";
import MarketplacePage from "../pages/MarketplacePage";
import CreateItemPage from "../pages/CreateItemPage";

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
  {
    path: "/marketplace",
    element: <ProtectedRoute><MarketplacePage /></ProtectedRoute>,
  },
  {
    path: "/marketplace/create",
    element: <ProtectedRoute><CreateItemPage /></ProtectedRoute>,
  },
]);