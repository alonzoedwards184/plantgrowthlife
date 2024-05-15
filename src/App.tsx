import PlantTable from "./components/PlantTable.tsx";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Navbar from "./components/Navbar.tsx";

function App() {
  const items = [
    { plantName: "Apple", growthStage: "Three", nutrientLevel: "High" },
    { plantName: "Banana", growthStage: "Two", nutrientLevel: "Medium" },
    { plantName: "Orange", growthStage: "Four", nutrientLevel: "Low" },
  ];

  return (
    <>
      <Navbar /> {/* Navbar component */}
      <div className="container">
        {/* Add container class for Bootstrap styling */}
        <PlantTable items={items} />
      </div>
    </>
  );
}

export default App;
