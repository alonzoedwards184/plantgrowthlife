import React from "react";

interface PlantEditButtonProps {
  onClick: () => void; // Add onClick prop
}

const PlantEditButton: React.FC<PlantEditButtonProps> = ({ onClick }) => {
  return (
    <button type="button" className="btn btn-primary" onClick={onClick}>
      Add Plant
    </button>
  );
};

export default PlantEditButton;
