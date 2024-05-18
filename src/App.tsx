import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../src/components/LoginPage.tsx";
import PlantTable from "./Views/PlantTable";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignupPage from "./components/SignupPage.tsx";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />{" "}
          {/* Corrected here */}
          <Route path="/dashboard" element={<PlantTable />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
