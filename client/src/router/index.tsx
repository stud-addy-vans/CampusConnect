// client/src/router/index.tsx

import { createBrowserRouter } from "react-router-dom";
import App from "../App";
// import Register from "../pages/Register";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import EventsPage from "../pages/EventsPage";
import CreateEventPage from "../pages/CreateEventPage";
import MarketplacePage from "../pages/MarketplacePage";
import CreateItemPage from "../pages/CreateItemPage";
import MainLayout from "../components/layout/MainLayout";
import RideSharePage from "../pages/RideSharePage";
import CreateRidePage from "../pages/CreateRidePage";
import ForumPage from "../pages/ForumPage";
import CreatePostPage from "../pages/CreatePostPage";
import PostDetailPage from "../pages/PostDetailPage";
import ChatPage from "../pages/ChatPage";
import AboutPage from "../pages/AboutPage";
import GalleryPage from "../pages/GalleryPage";
import ContactPage from "../pages/ContactPage";
import LandingPage from "../pages/LandingPage";
import AdminRegisterPage from "../pages/AdminRegisterPage";
import StudentRegisterPage from "../pages/StudentRegisterPage";
import PublicLayout from "../components/layout/PublicLayout";
import { AuthProvider } from "../context/AuthContext";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />, // New homepage
  },
  {
    path: "/dashboard", // The protected area for logged-in users
    element: (
      <AuthProvider>
        {" "}
        {/* Apply the provider ONLY to this section */}
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      </AuthProvider>
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
    path: "/home", // This is the guest homepage
    element: <PublicLayout />,
    children: [
      { index: true, element: <EventsPage /> }, // Guests land on the events page
      { path: "marketplace", element: <MarketplacePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "gallery", element: <GalleryPage /> },
      { path: "contact", element: <ContactPage /> },
    ],
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/gallery",
    element: <GalleryPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/register/student",
    element: <StudentRegisterPage />,
  },
  {
    path: "/register/admin",
    element: <AdminRegisterPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
