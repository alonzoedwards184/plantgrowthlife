import { useEffect, useState } from "react";
import PlantEditModal from "../components/PlantEditModal";
import PlantAddButton from "../components/PlantAddButton";
import PlantAddModal from "../components/PlantAddModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import PlantList from "../components/PlantList";

// Define the Plant interface
interface Plant {
  id: number;
  plantName: string;
  growthStage: string;
  nutrientLevel: string;
}

// Define the PlantTable component
const PlantTable = () => {
  // State variables
  const [plants, setPlants] = useState<Plant[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  // Fetch plants data from json-server endpoint on component mount
  useEffect(() => {
    fetch("http://localhost:3000/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data))
      .catch((error) => console.error("Error fetching plants:", error));
  }, []);

  // Handlers for edit, add, and delete actions
  const handleEditClick = (index: number) => {
    setSelectedIndex(index);
    setEditModalOpen(true);
  };

  const handleAddClick = () => {
    setAddModalOpen(true);
  };

  const handleDeleteClick = (index: number) => {
    setSelectedIndex(index);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedIndex !== null) {
      const idToDelete = plants[selectedIndex].id;
      fetch(`http://localhost:3000/plants/${idToDelete}`, {
        method: "DELETE",
      })
        .then(() => {
          console.log("Deleted plant with ID:", idToDelete);
          setPlants((prevPlants) =>
            prevPlants.filter((_, i) => i !== selectedIndex),
          );
        })
        .catch((error) =>
          console.error("Error deleting plant with ID:", idToDelete, error),
        )
        .finally(() => setDeleteModalOpen(false));
    }
  };

  // Close all modals
  const handleCloseModals = () => {
    setSelectedIndex(null);
    setEditModalOpen(false);
    setAddModalOpen(false);
    setDeleteModalOpen(false);
  };

  // Render the component
  return (
    <>
      <h1>Hydroponic Plant Table</h1>
      <PlantAddButton onClick={handleAddClick}>Add Plant</PlantAddButton>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Plant Name</th>
            <th scope="col">Growth Stage</th>
            <th scope="col">Nutrient Level</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Render each plant row */}
          {plants.map((plant, index) => (
            <PlantList
              key={plant.id}
              plant={plant}
              index={index}
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
            />
          ))}
        </tbody>
      </table>
      {/* Modals for editing, adding, and confirming deletion */}
      <PlantEditModal
        isOpen={editModalOpen}
        onClose={handleCloseModals}
        plantData={selectedIndex !== null ? plants[selectedIndex] : null}
      />
      <PlantAddModal isOpen={addModalOpen} onClose={handleCloseModals} />
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={handleCloseModals}
        onConfirm={handleDeleteConfirm}
        message="Are you sure you want to delete this item?"
      />
    </>
  );
};

export default PlantTable;
