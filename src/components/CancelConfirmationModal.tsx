import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmCancel: () => void;
}

const CancelConfirmationModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirmCancel,
}) => {
  return (
    <div
      className={`modal ${isOpen ? "fade show" : ""}`}
      tabIndex={-1}
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Are you sure?</h5>
          </div>
          <div className="modal-body">
            <p>
              If you cancel, your changes will be lost. Are you sure you want to
              cancel?
            </p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={onClose}>
              Back
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={onConfirmCancel}
            >
              Yes, Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelConfirmationModal;
