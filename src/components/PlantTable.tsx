import React from "react";
import PlantEditButton from "./PlantEditButton";
import PlantDeleteButton from "./PlantDeleteButton";
import PlantEditModal from "./PlantEditModal.tsx";
import PlantAddButton from "./PlantAddButton.tsx";
import PlantAddModal from "./PlantAddModal.tsx";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

interface Plant {
  plantName: string;
  growthStage: string;
  nutrientLevel: string;
}

interface PlantTableProps {
  items: Plant[];
}

const useModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return { isOpen, openModal, closeModal };
};

const PlantTable: React.FC<PlantTableProps> = ({ items }) => {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const editModal = useModal();
  const addModal = useModal();
  const deleteModal = useModal();

  const handleEditClick = (index: number) => {
    setSelectedIndex(index);
    editModal.openModal();
  };

  const handleAddClick = () => {
    addModal.openModal();
  };

  const handleDeleteClick = (index: number) => {
    setSelectedIndex(index);
    deleteModal.openModal();
  };

  const handleDeleteConfirm = () => {
    if (selectedIndex !== null) {
      // Perform deletion action here
      console.log("Deleting item:", items[selectedIndex]);
      // Close delete modal after deletion
      deleteModal.closeModal();
    }
  };

  const handleCloseModals = () => {
    setSelectedIndex(null);
    editModal.closeModal();
    addModal.closeModal();
    deleteModal.closeModal();
  };

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
          {items.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{item.plantName}</td>
              <td>{item.growthStage}</td>
              <td>{item.nutrientLevel}</td>
              <td>
                <PlantEditButton onClick={() => handleEditClick(index)}>
                  Edit
                </PlantEditButton>
                <PlantDeleteButton onClick={() => handleDeleteClick(index)}>
                  Delete
                </PlantDeleteButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PlantEditModal
        isOpen={editModal.isOpen}
        onClose={handleCloseModals}
        plantData={selectedIndex !== null ? items[selectedIndex] : null}
      />
      <PlantAddModal isOpen={addModal.isOpen} onClose={handleCloseModals} />
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={handleCloseModals}
        onConfirm={handleDeleteConfirm}
        message="Are you sure you want to delete this item?"
      />
    </>
  );
};

export default PlantTable;
