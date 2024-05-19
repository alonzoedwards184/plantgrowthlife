import React from "react";
import { useAuth } from "../context/AuthContext.tsx";
import PlantTable from "../components/PlantTable.tsx";

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h1>Welcome to the Home Page!</h1>
          <PlantTable /> {/* Adding the PlantTable component here */}
        </div>
      ) : (
        <h1>Please log in to access the Home Page.</h1>
      )}
    </div>
  );
};

export default HomePage;
