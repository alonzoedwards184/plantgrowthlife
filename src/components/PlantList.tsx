// PlantList.tsx
import React from "react";

interface Plant {
  id: number;
  plantName: string;
  growthStage: string;
  nutrientLevel: string;
}
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
    <td>
      <button onClick={() => handleEditClick(index)}>Edit</button>
      <button onClick={() => handleDeleteClick(index)}>Delete</button>
    </td>
  </tr>
);

export default PlantList;
