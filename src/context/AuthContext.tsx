/**
 * Developer: [Alonz0 Edwards]
 * Date: [May 19, 2024]
 * Description:
 - This file provides an authentication context using React Context API.
 - It exports an AuthProvider component to wrap around the application,
 - managing authentication state and providing login and logout functions.
 - The useAuth hook is also exported to access authentication state and functions
 - within components that are descendants of the AuthProvider.*/

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void; // Include logout property
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const defaultUsername = "user"; // Temporary default username
  const defaultPassword = "pass"; // Temporary default password

  const login = (username: string, password: string) => {
    if (username === defaultUsername && password === defaultPassword) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
