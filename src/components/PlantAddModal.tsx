import React, { useState, useEffect } from "react";
import CancelConfirmationModal from "./CancelConfirmationModal";

interface Plant {
  plantName: string;
  growthStage: string;
  nutrientLevel: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const PlantAddModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [newPlantData, setNewPlantData] = useState<Plant>({
    plantName: "",
    growthStage: "",
    nutrientLevel: "",
  });
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  useEffect(() => {
    // Reset form data when modal opens
    if (isOpen) {
      setNewPlantData({
        plantName: "",
        growthStage: "",
        nutrientLevel: "",
      });
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPlantData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCancelClick = () => {
    setIsCancelModalOpen(true);
  };

  const handleCancelConfirm = () => {
    setIsCancelModalOpen(false);
    onClose(); // Close the main modal
  };

  const handleSaveChanges = () => {
    // Add logic to save new plant data
    console.log("Saving new plant data:", newPlantData);
    onClose(); // Close the modal after saving
  };

  return (
    <>
      {isOpen && (
        <div
          className="modal fade show"
          tabIndex={-1}
          style={{ display: "block" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Plant</h5>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="plantName">Plant Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="plantName"
                    name="plantName"
                    value={newPlantData.plantName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="growthStage">Growth Stage</label>
                  <input
                    type="text"
                    className="form-control"
                    id="growthStage"
                    name="growthStage"
                    value={newPlantData.growthStage}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nutrientLevel">Nutrient Level</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nutrientLevel"
                    name="nutrientLevel"
                    value={newPlantData.nutrientLevel}
                    onChange={handleInputChange}
                  />
                </div>
                {children}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveChanges}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <CancelConfirmationModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirmCancel={handleCancelConfirm}
      />
    </>
  );
};

export default PlantAddModal;
