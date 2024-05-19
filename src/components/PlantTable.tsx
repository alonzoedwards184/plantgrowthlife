import React, { useState, useEffect } from "react";
import PlantList from "./PlantList";
import { Plant } from "./Plant";
import Pagination from "./Pagination";

interface PlantTableProps {}

const PlantTable: React.FC<PlantTableProps> = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [plantsPerPage, setPlantsPerPage] = useState(5);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const response = await fetch("http://localhost:3000/plants");
      if (response.ok) {
        const data = await response.json();
        setPlants(data);
      } else {
        console.error("Failed to fetch plants:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to fetch plants:", error);
    }
  };

  const handleEditClick = (id: number, editedPlant: Plant) => {
    const updatedPlants = plants.map((plant) =>
      plant.id === id ? editedPlant : plant,
    );
    setPlants(updatedPlants);
  };

  const handleDeleteClick = (id: number) => {
    const updatedPlants = plants.filter((plant) => plant.id !== id);
    setPlants(updatedPlants);
  };

  const totalPages = Math.ceil(plants.length / plantsPerPage);

  const onPageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  const updatePlantsPerPage = (perPage: number) => {
    setPlantsPerPage(perPage);
    setCurrentPage(1);
  };

  const indexOfLastPlant = currentPage * plantsPerPage;
  const indexOfFirstPlant = indexOfLastPlant - plantsPerPage;
  const currentPlants = plants.slice(indexOfFirstPlant, indexOfLastPlant);

  return (
    <div className="container my-5">
      <div className="table-responsive mx-auto" style={{ maxWidth: "90%" }}>
        <table className="table table-bordered text-center">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Plant Name</th>
              <th>Growth Stage</th>
              <th>Nutrient Level</th>
              <th>Plant Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPlants.map((plant, index) => (
              <PlantList
                key={plant.id}
                plant={plant}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
                index={index}
              />
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          itemsPerPage={plantsPerPage}
          data={plants}
        />
        <div className="items-per-page-control mt-3">
          <label htmlFor="itemsPerPage">Items Per Page:</label>
          <select
            id="itemsPerPage"
            className="form-select d-inline-block w-auto ms-2"
            value={plantsPerPage}
            onChange={(e) => updatePlantsPerPage(parseInt(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PlantTable;
