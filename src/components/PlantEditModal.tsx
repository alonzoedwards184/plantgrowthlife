import React, { useState, useEffect } from "react";
import CancelConfirmationModal from "./CancelConfirmationModal";
import { Plant } from "./Plant.tsx";
import DatePicker from "react-datepicker";
import SuccessPopup from "./SuccessPopup"; // Import the SuccessPopup component
import PageRefresh from "./PageRefresh"; // Import the PageRefresh component

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
  const [editedPlantData, setEditedPlantData] = useState<Plant | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false);
  const [shouldRefreshPage, setShouldRefreshPage] = useState(false);

  useEffect(() => {
    if (plantData) {
      setEditedPlantData(plantData);
    }
  }, [plantData]);

  const handleFieldChange = (
    fieldName: string,
    value: string | Date | null,
  ) => {
    if (editedPlantData) {
      setEditedPlantData((prevState: Plant | null) => ({
        ...(prevState as Plant),
        [fieldName]:
          value instanceof Date ? value : value ? new Date(value) : null,
      }));
    }
  };

  const handleCancelClick = () => {
    setIsCancelModalOpen(true);
  };

  const handleCancelConfirm = () => {
    setIsCancelModalOpen(false);
    onClose();
  };

  const handleSaveChanges = () => {
    if (!plantData || !editedPlantData) {
      // Check if plantData or editedPlantData is null
      console.error("No plant data available.");
      return;
    }

    const { plantName, growthStage, nutrientLevel } = editedPlantData;
    if (!plantName || !growthStage || !nutrientLevel) {
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
        setIsSuccessPopupVisible(true);
        setTimeout(() => {
          setShouldRefreshPage(true);
        }, 2000); // Delay for 2 seconds before refreshing the page
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (!isOpen) {
      setIsSuccessPopupVisible(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (shouldRefreshPage) {
      window.location.reload();
    }
  }, [shouldRefreshPage]);

  return (
    <>
      {isSuccessPopupVisible && (
        <>
          <SuccessPopup
            message="Changes saved successfully!"
            onClose={() => setIsSuccessPopupVisible(false)}
          />
          <PageRefresh /> {/* Include PageRefresh here */}
        </>
      )}

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
                        value={editedPlantData?.plantName || ""}
                        onChange={(e) =>
                          handleFieldChange(e.target.name, e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="growthStage">Growth Stage</label>
                      <input
                        type="text"
                        className="form-control"
                        id="growthStage"
                        name="growthStage"
                        value={editedPlantData?.growthStage || ""}
                        onChange={(e) =>
                          handleFieldChange(e.target.name, e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="nutrientLevel">Nutrient Level</label>
                      <input
                        type="text"
                        className="form-control"
                        id="nutrientLevel"
                        name="nutrientLevel"
                        value={editedPlantData?.nutrientLevel || ""}
                        onChange={(e) =>
                          handleFieldChange(e.target.name, e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="plantDate">Plant Date</label>
                      <DatePicker
                        selected={
                          editedPlantData?.plantDate
                            ? new Date(editedPlantData.plantDate)
                            : null
                        }
                        onChange={(date) =>
                          handleFieldChange("plantDate", date)
                        }
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select Date"
                        className="form-control"
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
