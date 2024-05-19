import React, { useState } from "react";
import CustomDatePicker from "../components/CustomDatePicker";

interface Plant {
  plantName: string;
  growthStage: string;
  nutrientLevel: string;
  plantDate: Date;
}

interface PlantFormProps {
  onSubmit: (plantData: Plant) => void;
}

const PlantEditForm: React.FC<PlantFormProps> = ({ onSubmit }) => {
  const [plantData, setPlantData] = useState<Plant>({
    plantName: "",
    growthStage: "",
    nutrientLevel: "",
    plantDate: new Date(),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPlantData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setPlantData((prevData) => ({
      ...prevData,
      plantDate: date || new Date(),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(plantData);
    setPlantData({
      plantName: "",
      growthStage: "",
      nutrientLevel: "",
      plantDate: new Date(),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="plantName">Plant Name</label>
        <input
          type="text"
          className="form-control"
          id="plantName"
          name="plantName"
          value={plantData.plantName}
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
          value={plantData.growthStage}
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
          value={plantData.nutrientLevel}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="plantDate">Plant Date</label>
        <CustomDatePicker
          selectedDate={plantData.plantDate}
          onChange={handleDateChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
};

export default PlantEditForm;
