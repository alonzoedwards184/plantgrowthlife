import React from "react";

interface PlantEditButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const PlantEditButton: React.FC<PlantEditButtonProps> = ({
  children,
  onClick,
}) => {
  const handleClick = () => {
    console.log("Button clicked"); // Add console log here
    onClick(); // Call the original onClick function
  };

  return (
    <button type="button" className="btn btn-primary" onClick={handleClick}>
      {children}
    </button>
  );
};

export default PlantEditButton;
