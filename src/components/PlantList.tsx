import React from "react";
import { Plant } from "./Plant.tsx";

interface PlantListProps {
  plant: Plant;
  index: number;
  handleEditClick: (index: number) => void;
  handleDeleteClick: (index: number) => void;
}

const PlantList: React.FC<PlantListProps> = ({
  plant,
  index,
  handleEditClick,
  handleDeleteClick,
}) => (
  <tr>
    <th scope="row">{index + 1}</th>
    <td>{plant.plantName}</td>
    <td>{plant.growthStage}</td>
    <td>{plant.nutrientLevel}</td>
    <td>{plant.plantDate}</td> {/* Convert Date to string */}
    <td>
      <button
        className="btn btn-primary"
        onClick={() => handleEditClick(index)}
      >
        Edit
      </button>
      <button
        className="btn btn-danger"
        onClick={() => handleDeleteClick(index)}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default PlantList;
