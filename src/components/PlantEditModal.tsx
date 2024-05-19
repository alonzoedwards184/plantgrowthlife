import React, { useState, useEffect } from "react";
import CancelConfirmationModal from "./CancelConfirmationModal";
import CustomDatePicker from "./CustomDatePicker.tsx";

interface Plant {
  plantName: string;
  growthStage: string;
  nutrientLevel: string;
  plantDate: Date;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PlantAddModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [newPlantData, setNewPlantData] = useState<Plant>({
    plantName: "",
    growthStage: "",
    nutrientLevel: "",
    plantDate: new Date(),
  });
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      resetFormData();
    }
  }, [isOpen]);

  const resetFormData = () => {
    setNewPlantData({
      plantName: "",
      growthStage: "",
      nutrientLevel: "",
      plantDate: new Date(),
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPlantData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setNewPlantData((prevState) => ({
      ...prevState,
      plantDate: date || new Date(),
    }));
  };

  const handleCancelClick = () => {
    setIsCancelModalOpen(true);
  };

  const handleCancelConfirm = () => {
    setIsCancelModalOpen(false);
    onClose();
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch("http://localhost:3000/plants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlantData),
      });

      if (response.ok) {
        console.log("New plant data saved:", newPlantData);
        onClose();
        resetFormData();
      } else {
        console.error("Error saving plant data:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving plant data:", error);
    }
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
                <div className="form-group">
                  <label htmlFor="plantDate">Plant Date</label>
                  <CustomDatePicker
                    selectedDate={newPlantData.plantDate}
                    onChange={handleDateChange}
                  />
                </div>
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
