import React, { useEffect } from "react";

interface SuccessPopupProps {
  message: string;
  onClose: () => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Close the popup after a certain duration (e.g., 3 seconds)
    }, 100000);

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, [onClose]);

  return (
    <div
      className="alert alert-success"
      role="alert"
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999 }}
    >
      <p>{message}</p>
      <button
        type="button"
        className="close"
        aria-label="Close"
        onClick={onClose}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default SuccessPopup;
