import React, { useState, useEffect } from "react";
import CancelConfirmationModal from "./CancelConfirmationModal";
import CustomDatePicker from "./CustomDatePicker.tsx";

interface Plant {
  plantName: string;
  growthStage: string;
  nutrientLevel: string;
  plantDate: Date; // Add plantDate property
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
    plantDate: new Date(), // Initialize plantDate with current date
  });
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Reset form data when modal opens
      resetFormData();
    }
  }, [isOpen]);

  const resetFormData = () => {
    setNewPlantData({
      plantName: "",
      growthStage: "",
      nutrientLevel: "",
      plantDate: new Date(), // Reset plantDate to current date
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(`Input Change - Name: ${name}, Value: ${value}`); // Debug log
    setNewPlantData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    console.log(`Date Change - Date: ${date}`); // Debug log
    setNewPlantData((prevState) => ({
      ...prevState,
      plantDate: date || new Date(), // Set plantDate to selected date or current date if null
    }));
  };

  const handleCancelClick = () => {
    setIsCancelModalOpen(true);
  };

  const handleCancelConfirm = () => {
    setIsCancelModalOpen(false);
    onClose(); // Close the main modal
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
        onClose(); // Close the modal after saving
        resetFormData(); // Reset form data after successful save
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
        <div className="modal show" tabIndex={-1} style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Plant</h5>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="plantName" className="form-label">
                    Plant Name
                  </label>
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
                  <label htmlFor="growthStage" className="form-label">
                    Growth Stage
                  </label>
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
                  <label htmlFor="nutrientLevel" className="form-label">
                    Nutrient Level
                  </label>
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
                  <label htmlFor="plantDate" className="form-label">
                    Plant Date
                  </label>
                  <CustomDatePicker
                    selectedDate={newPlantData.plantDate}
                    onChange={handleDateChange}
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
