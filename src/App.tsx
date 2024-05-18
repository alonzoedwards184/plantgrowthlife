// App.tsx

import PlantTable from "./Views/PlantTable.tsx";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Navbar from "./components/Navbar.tsx";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        {/* Add container class for Bootstrap styling */}
        <PlantTable />
      </div>
    </>
  );
}

export default App;
