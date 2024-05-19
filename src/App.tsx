import React, { useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext.tsx";
import HomePage from "./Views/HomePage.tsx";
import LoginPage from "../src/components/LoginPage.tsx";
import Navbar from "../src/components/Navbar.tsx"; // Importing the Navbar component

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

const AppContent: React.FC = () => {
  const { isAuthenticated } = useSafeAuth();

  useEffect(() => {
    if (isAuthenticated) {
      console.log("User is authenticated. Redirecting to homepage...");
    }
  }, [isAuthenticated]);

  return isAuthenticated ? (
    <>
      <Navbar /> {/* Display the Navbar when the user is authenticated */}
      <HomePage />
    </>
  ) : (
    <LoginPage />
  );
};

const useSafeAuth = () => {
  const context = useAuth();
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default App;
