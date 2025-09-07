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
import MainLayout from "../components/layout/MainLayout";
import RideSharePage from "../pages/RideSharePage";
import CreateRidePage from "../pages/CreateRidePage";
import ForumPage from '../pages/ForumPage';
import CreatePostPage from '../pages/CreatePostPage';
import PostDetailPage from '../pages/PostDetailPage';
import ChatPage from '../pages/ChatPage';
import AboutPage from '../pages/AboutPage';
import GalleryPage from '../pages/GalleryPage';
import ContactPage from '../pages/ContactPage';

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    // Child routes will be rendered inside the MainLayout's <Outlet />
    children: [
      { index: true, element: <App /> }, // The homepage
      { path: "events", element: <EventsPage /> },
      { path: "events/create", element: <CreateEventPage /> },
      { path: "marketplace", element: <MarketplacePage /> },
      { path: "marketplace/create", element: <CreateItemPage /> },
      { path: "rides", element: <RideSharePage /> },
      { path: "rides/create", element: <CreateRidePage /> },
      { path: "forum", element: <ForumPage /> },
      { path: "forum/create", element: <CreatePostPage /> },
      { path: "forum/:id", element: <PostDetailPage /> },
      { path: "chat", element: <ChatPage /> },
    ],
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/gallery',
    element: <GalleryPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);