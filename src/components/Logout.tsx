import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Access logout function from AuthContext

  const handleLogout = () => {
    console.log("Logout button clicked");

    // Call the logout function from AuthContext
    logout();

    // Redirect to the login page
    console.log("Navigating to login page");
    navigate("/");
  };

  return (
    <button className="btn btn-outline-danger" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
