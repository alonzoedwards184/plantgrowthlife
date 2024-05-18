import { useEffect, useState } from "react";
import PlantEditModal from "../components/PlantEditModal";
import PlantAddButton from "../components/PlantAddButton";
import PlantAddModal from "../components/PlantAddModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import PlantList from "../components/PlantList";
import Pagination from "../components/Pagination.tsx";
import { Plant } from "../components/Plant.tsx";

const PlantTable = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const itemsPerPage = 20;

  useEffect(() => {
    fetch("http://localhost:3000/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data))
      .catch((error) => console.error("Error fetching plants:", error));
  }, []);

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

  const handleCloseModals = () => {
    setSelectedIndex(null);
    setEditModalOpen(false);
    setAddModalOpen(false);
    setDeleteModalOpen(false);
  };

  const totalItems = plants.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const paginatedPlants = plants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <>
      <h1>Hydroponic Plant Table</h1>
      <PlantAddButton onClick={handleAddClick}>Add Plant</PlantAddButton>
      <div
        className="scroll-container"
        style={{ height: "400px", overflow: "auto" }}
      >
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Plant Name</th>
              <th scope="col">Growth Stage</th>
              <th scope="col">Nutrient Level</th>
              <th scope="col">Plant Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPlants.map((plant, index) => (
              <PlantList
                key={plant.id}
                plant={plant}
                index={(currentPage - 1) * itemsPerPage + index}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        data={paginatedPlants}
        itemsPerPage={itemsPerPage}
      />
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
