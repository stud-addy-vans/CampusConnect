// client/src/components/Header.tsx

import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./ui/Button";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/dashboard" className="text-2xl font-bold text-cyan-400">
          CampusConnect
        </Link>
        <nav className="flex items-center space-x-6">
          <NavLink
            to="./events"
            className={({ isActive }) =>
              isActive ? "text-cyan-400" : "hover:text-cyan-400"
            }
          >
            Events
          </NavLink>
          <NavLink
            to="./marketplace"
            className={({ isActive }) =>
              isActive ? "text-cyan-400" : "hover:text-cyan-400"
            }
          >
            Marketplace
          </NavLink>
          <NavLink
            to="./rides"
            className={({ isActive }) =>
              isActive ? "text-cyan-400" : "hover:text-cyan-400"
            }
          >
            Ride Share
          </NavLink>
          <NavLink
            to="./forum"
            className={({ isActive }) =>
              isActive ? "text-cyan-400" : "hover:text-cyan-400"
            }
          >
            Forum
          </NavLink>
          <NavLink
            to="./chat"
            className={({ isActive }) =>
              isActive ? "text-cyan-400" : "hover:text-cyan-400"
            }
          >
            Chat
          </NavLink>
        </nav>
        <div className="flex items-center space-x-4">
          <span className="font-semibold">Welcome, {user?.username}</span>
          <Button
            onClick={logout}
            
            className="bg-red-600 hover:bg-red-700 text-sm py-1 px-3"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
