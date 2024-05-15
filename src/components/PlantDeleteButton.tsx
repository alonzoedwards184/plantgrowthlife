import React from "react";

const PlantDeleteButton: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
}> = ({ onClick, children }) => {
  return (
    <button type="button" className="btn btn-danger" onClick={onClick}>
      {children}
    </button>
  );
};

export default PlantDeleteButton;
