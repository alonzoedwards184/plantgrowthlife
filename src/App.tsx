import React, { useState } from "react";
import PlantTable from "./Views/PlantTable.tsx";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Navbar from "./components/Navbar.tsx";

function App() {
  const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false);

  return (
    <>
      <Navbar />
      <div className="container">
        {/* Add container class for Bootstrap styling */}
        <PlantTable />
      </div>
      {/* Render SuccessPopup conditionally */}
      <div
        className="alert alert-success"
        role="alert"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          display: isSuccessPopupVisible ? "block" : "none", // Adjust display based on isSuccessPopupVisible state
        }}
      >
        <p>Changes saved successfully!</p>
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={() => setIsSuccessPopupVisible(false)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </>
  );
}

export default App;
