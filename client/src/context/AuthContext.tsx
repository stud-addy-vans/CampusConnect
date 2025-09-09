import { createContext, useState, useEffect, useContext, type ReactNode } from "react";
import { io, type Socket } from "socket.io-client";
import { loginUser, registerStudent, registerAdmin } from "../api/auth";
import { type AuthData, type AuthResponse } from "../api/auth";

interface AuthContextType {
  token: string | null;
  user: AuthResponse["user"] | null;
  isAuthenticated: boolean;
  socket: Socket | null;
  login: (userData: AuthData) => Promise<void>;
  registerStudent: (userData: AuthData) => Promise<any>;
  registerAdmin: (userData: AuthData) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<AuthResponse["user"] | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (token && user) {
      const newSocket = io("http://localhost:5000", {
        auth: { token: token },
      });
      setSocket(newSocket);
      return () => { newSocket.disconnect(); };
    } else if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  }, [token, user]);

  const login = async (userData: AuthData) => {
    const data = await loginUser(userData);
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        socket,
        login,
        registerStudent,
        registerAdmin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    return {
      token: null,
      user: null,
      isAuthenticated: false,
      socket: null,
      login: async () => {},
      registerStudent: async () => {},
      registerAdmin: async () => {},
      logout: () => {},
    };
  }

  return context;
};







// // client/src/context/AuthContext.tsx

// import {
//   createContext,
//   useState,
//   useEffect,
//   useContext,
//   type ReactNode,
// } from "react";
// import { io, type Socket } from "socket.io-client"; // Import socket.io-client
// import { loginUser, registerUser } from "../api/auth";
// import { type AuthData, type AuthResponse } from "../api/auth";

// interface AuthContextType {
//   token: string | null;
//   user: AuthResponse["user"] | null;
//   isAuthenticated: boolean;
//   socket: Socket | null; // Add socket to the context type
//   login: (userData: AuthData) => Promise<void>;
//   register: (userData: AuthData) => Promise<void>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<AuthResponse["user"] | null>(
//     JSON.parse(localStorage.getItem("user") || "null")
//   );
//   const [token, setToken] = useState<string | null>(
//     localStorage.getItem("token")
//   );
//   const [socket, setSocket] = useState<Socket | null>(null);

//   // This effect handles the socket connection lifecycle
//   useEffect(() => {
//     // If there's a token and a user, create and connect the socket
//     if (token && user) {
//       const newSocket = io("http://localhost:5000", {
//         auth: {
//           token: token,
//         },
//       });
//       setSocket(newSocket);

//       // Cleanup function: disconnect the socket when the user logs out or the app closes
//       return () => {
//         newSocket.disconnect();
//       };
//     } else {
//       // If no token, ensure any existing socket is disconnected
//       if (socket) {
//         socket.disconnect();
//         setSocket(null);
//       }
//     }
//   }, [token, user]);

//   const login = async (userData: AuthData) => {
//     const data = await loginUser(userData);
//     setToken(data.token);
//     setUser(data.user);
//     localStorage.setItem("token", data.token);
//     localStorage.setItem("user", JSON.stringify(data.user));
//   };

//   const register = async (userData: AuthData) => {
//     await registerUser(userData);
//   };

//   const logout = () => {
//     setToken(null);
//     setUser(null);
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         token,
//         user,
//         isAuthenticated: !!token,
//         login,
//         register,
//         logout,
//         socket,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);

//   // If the hook is used outside of a provider, return a default "guest" state
//   if (context === undefined) {
//     return {
//       token: null,
//       user: null,
//       isAuthenticated: false,
//       socket: null,
//       // Provide dummy functions to prevent crashes
//       login: async () => {},
//       register: async () => {},
//       logout: () => {},
      
//     };
//   }

//   return context;
// };




// client/src/context/AuthContext.tsx
