// DeletionModal.tsx
import React from "react";

interface DeletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleDeleteConfirm: () => void;
  message: string;
}

const DeletionModal: React.FC<DeletionModalProps> = ({
  isOpen,
  onClose,
  handleDeleteConfirm,
  message,
}) => (
  <>
    {isOpen && (
      <div
        className="modal"
        tabIndex={-1}
        role="dialog"
        style={{ display: "block" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Deletion</h5>
              <button type="button" className="close" onClick={onClose}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{message}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
);

export default DeletionModal;
