import React, { useState, useEffect } from "react";
import CancelConfirmationModal from "./CancelConfirmationModal";
import { Plant } from "../Views/PlantTable.tsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    plantDate: new Date(),
  });
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  useEffect(() => {
    if (plantData) {
      setEditedPlantData(plantData);
    }
  }, [plantData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedPlantData((prevState: Plant) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setEditedPlantData((prevState: Plant) => ({
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

  const handleSaveChanges = () => {
    if (!plantData) {
      console.error("No plant data available.");
      return;
    }

    if (
      !editedPlantData.plantName ||
      !editedPlantData.growthStage ||
      !editedPlantData.nutrientLevel
    ) {
      console.error("Please fill in all fields.");
      return;
    }

    fetch(`http://localhost:3000/plants/${plantData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedPlantData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update plant data.");
        }
        console.log("Plant data updated successfully.");
        onClose();
      })
      .catch((error) => console.error(error));
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
                    <div className="form-group">
                      <label htmlFor="plantDate">Plant Date</label>
                      <DatePicker
                        selected={editedPlantData.plantDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select Date"
                        className="form-control" // Apply the same class as other inputs
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
