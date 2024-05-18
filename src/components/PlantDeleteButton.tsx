import React, { useEffect } from "react";

interface PlantEditButtonProps {
  children: React.ReactNode;
  onClick: () => void; // Add onClick prop
  dependencies?: any[]; // Add dependencies prop
}

const PlantEditButton: React.FC<PlantEditButtonProps> = ({
  children,
  onClick,
  dependencies = [],
}) => {
  useEffect(() => {
    // Remove autoRefresh functionality
  }, dependencies); // Trigger useEffect when dependencies change

  return (
    <button type="button" className="btn btn-primary" onClick={onClick}>
      {children}
    </button>
  );
};

export default PlantEditButton;
