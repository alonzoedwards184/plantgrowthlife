import React, { useState } from "react";
import { Plant } from "./Plant.tsx";
import PlantEditButton from "./PlantEditButton.tsx";
import PlantEditModal from "./PlantEditModal.tsx";

interface PlantListProps {
  plant: Plant;
  index: number; // Add index property if needed
  handleEditClick: (id: number, editedPlant: Plant) => void;
  handleDeleteClick: (id: number) => void;
}

const PlantList: React.FC<PlantListProps> = ({
  plant,
  index,

  handleDeleteClick,
}) => {
  // State for controlling the modal visibility
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsEditModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{plant.plantName}</td>
      <td>{plant.growthStage}</td>
      <td>{plant.nutrientLevel}</td>
      <td>{plant.plantDate.toLocaleDateString()}</td>
      {/* Convert Date to string */}
      <td>
        {/* Pass the necessary props to PlantEditButton */}
        <PlantEditButton onClick={openModal}>Edit</PlantEditButton>
        {/* Render PlantEditModal conditionally based on the state */}
        {isEditModalOpen && (
          <PlantEditModal
            isOpen={isEditModalOpen}
            onClose={closeModal}
            plantData={plant}

            // Pass any other necessary props to PlantEditModal
          />
        )}
        <button
          className="btn btn-danger"
          onClick={() => handleDeleteClick(index)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default PlantList;
