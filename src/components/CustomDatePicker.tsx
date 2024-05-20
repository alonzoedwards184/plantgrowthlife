import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CustomDatePickerProps {
  selectedDate: Date | null; // Adjusted type to Date | null
  onChange: (date: Date | null) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  selectedDate,
  onChange,
}) => {
  return (
    <div>
      <DatePicker
        selected={selectedDate instanceof Date ? selectedDate : null}
        onChange={(date) => onChange(date)}
        dateFormat="dd/MM/yyyy"
        placeholderText="Select Date"
        className="form-control"
      />
    </div>
  );
};

export default CustomDatePicker;
