import React from "react";

interface PlantAddButtonProps {
  onClick: () => void; // Add onClick prop
}

const PlantAddButton: React.FC<PlantAddButtonProps> = ({ onClick }) => {
  const handleClick = () => {
    console.log("Add Plant button clicked"); // Log when the button is clicked
    onClick(); // Call the provided onClick function
  };

  return (
    <button type="button" className="btn btn-primary" onClick={handleClick}>
      Add Plant
    </button>
  );
};

export default PlantAddButton;
