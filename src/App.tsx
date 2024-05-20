import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.tsx";
import HomePage from "./Views/HomePage.tsx";
import LoginPage from "../src/components/LoginPage.tsx";
import Navbar from "../src/components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

const AppContent: React.FC = () => {
  const { isAuthenticated } = useSafeAuth();
  const navigate = useNavigate(); // Initialize useNavigate for navigation control

  useEffect(() => {
    // Function to handle browser history to prevent going back to login page
    const handlePopState = () => {
      if (!isAuthenticated && window.location.pathname !== "/login") {
        navigate("/login");
      }
    };

    // Add event listener for popstate
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      // Replace the current state with home page state
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          isAuthenticated ? <AuthenticatedApp /> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
};

const AuthenticatedApp: React.FC = () => (
  <>
    <Navbar /> {/* Display the Navbar when the user is authenticated */}
    <HomePage />
    <Footer />
  </>
);

const useSafeAuth = () => {
  const context = useAuth();
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default App;
