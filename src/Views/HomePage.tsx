import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.tsx";
import PlantTable from "../components/PlantTable.tsx";
import PlantAddButton from "../components/PlantAddButton.tsx"; // Import the PlantAddButton component
import PlantAddModal from "../components/PlantAddModal.tsx"; // Import the PlantAddModal component

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the visibility of the modal

  // Function to handle opening of the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to handle closing of the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      {isAuthenticated ? (
        <div>
          <h1>Welcome to the Home Page!</h1>
          {/* Render the PlantAddButton component below the heading */}
          <PlantAddButton onClick={openModal} />
          <PlantTable /> {/* Adding the PlantTable component here */}
          {/* Render the PlantAddModal component */}
          <PlantAddModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
      ) : (
        <h1>Please log in to access the Home Page.</h1>
      )}
    </div>
  );
};

export default HomePage;
