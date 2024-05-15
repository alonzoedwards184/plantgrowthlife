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
  plantData: Plant | null;
}

const PlantEditModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  plantData,
  children,
}) => {
  const [editedPlantData, setEditedPlantData] = useState<Plant>({
    plantName: "",
    growthStage: "",
    nutrientLevel: "",
  });
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  useEffect(() => {
    if (plantData) {
      setEditedPlantData(plantData);
    }
  }, [plantData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedPlantData((prevState) => ({
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
    // Save changes logic
    console.log("Saving changes...");
    onClose();
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
                <h5 className="modal-title">Edit Plant</h5>
              </div>
              <div className="modal-body">
                {plantData ? (
                  <>
                    <div className="form-group">
                      <label htmlFor="plantName">Plant Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="plantName"
                        name="plantName"
                        value={editedPlantData.plantName}
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
                        value={editedPlantData.growthStage}
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
                        value={editedPlantData.nutrientLevel}
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                ) : (
                  <p>No plant data available.</p>
                )}
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
                  className="btn btn-success"
                  onClick={handleSaveChanges}
                >
                  Save Changes
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

export default PlantEditModal;
