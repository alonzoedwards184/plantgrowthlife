import React, { useState, useEffect } from "react";
import CancelConfirmationModal from "./CancelConfirmationModal";
import CustomDatePicker from "./CustomDatePicker.tsx";

interface Plant {
  id: number; // Add an ID field to uniquely identify each plant
  plantName: string;
  growthStage: string;
  nutrientLevel: string;
  plantDate: Date;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  plantData: Plant; // Pass the existing plant data to the modal
}

const PlantEditModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  plantData,
}) => {
  const [editedPlantData, setEditedPlantData] = useState<Plant>({
    ...plantData,
  });
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setEditedPlantData({ ...plantData }); // Initialize edited plant data with the provided plant data
    }
  }, [isOpen, plantData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedPlantData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setEditedPlantData((prevState) => ({
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
      const response = await fetch(
        `http://localhost:3000/plants/${editedPlantData.id}`,
        {
          method: "PUT", // Use PUT method to update existing data
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedPlantData),
        },
      );

      if (response.ok) {
        console.log("Plant data updated:", editedPlantData);
        onClose();
      } else {
        console.error("Error updating plant data:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating plant data:", error);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal show" tabIndex={-1} style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Plant</h5>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="plantName" className={"form-label"}>
                    Plant Name
                  </label>
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
                <div className="form-group">
                  <label htmlFor="plantDate">Plant Date</label>
                  <CustomDatePicker
                    selectedDate={editedPlantData.plantDate}
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

export default PlantEditModal;
